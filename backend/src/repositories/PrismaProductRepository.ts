import { injectable } from 'inversify';
import {
  ProductRepository,
  FilterPaginate,
  Product,
  ResultPaginate,
  FilterProduct,
  ProductCouponApplication,
  Coupon,
} from '../core';
import { prisma } from '../external/db/prisma';
import {
  ProductConverter,
  ProductCouponApplicationConverter,
  CouponConverter,
} from './converters';
import type { Prisma } from '../generated/prisma';

@injectable()
export class ProductPrismaRepository implements ProductRepository {
  async findAll(filter?: FilterProduct): Promise<Product[]> {
    const where = this.buildFilter(filter ?? {});
    const orderBy = this.buildOrderBy(filter ?? {});

    const products = await prisma.product.findMany({ where, orderBy });
    return products.map(ProductConverter.fromDb);
  }

  async paginate(
    filter: FilterPaginate<FilterProduct>,
  ): Promise<ResultPaginate<Product>> {
    const where = this.buildFilter(filter.filter ?? {});
    const orderBy = this.buildOrderBy(filter.filter ?? {});

    const [count, items] = await prisma.$transaction([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        take: filter.limit,
        skip: filter.limit * (filter.page - 1),
        orderBy: orderBy,
      }),
    ]);

    return new ResultPaginate(
      filter.page,
      filter.limit,
      count,
      items.map(ProductConverter.fromDb),
    );
  }

  async removeProductDiscountWithCoupon(id: number): Promise<Product> {
    const [updatedProduct] = await prisma.$transaction([
      prisma.product.update({
        where: { id: id },
        data: {
          discount_applied_at: null,
          discount_type: null,
          discount_value: null,
          hasCouponApplied: false,
        },
      }),
      prisma.productCouponApplication.updateMany({
        where: { product_id: id },
        data: { removed_at: new Date() },
      }),
    ]);
    return ProductConverter.fromDb(updatedProduct);
  }

  async removeProductDiscount(id: number): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        discount_applied_at: null,
        discount_type: null,
        discount_value: null,
      },
    });

    return ProductConverter.fromDb(updatedProduct);
  }

  async addCouponToProduct(
    product: Product,
    application: ProductCouponApplication,
    coupon: Coupon,
  ): Promise<Product> {
    const newProduct = ProductConverter.toDb(product);
    const newApplication = ProductCouponApplicationConverter.toDb(application);
    const newCoupon = CouponConverter.toDb(coupon);

    const [updatedProduct] = await prisma.$transaction([
      prisma.product.update({
        where: { id: product.id! },
        data: newProduct,
      }),
      prisma.coupon.update({
        where: { id: newCoupon.id! },
        data: newCoupon,
      }),
      prisma.productCouponApplication.create({
        data: newApplication,
      }),
    ]);

    return ProductConverter.fromDb(updatedProduct);
  }

  async findById(id: number): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    return product ? ProductConverter.fromDb(product) : null;
  }

  async create(product: Product): Promise<Product> {
    const data = ProductConverter.toDb(product);
    const created = await prisma.product.create({ data });
    return ProductConverter.fromDb(created);
  }

  async update(product: Product): Promise<Product> {
    const data = ProductConverter.toDb(product);
    const updated = await prisma.product.update({
      where: { id: Number(product.id) },
      data,
    });

    return ProductConverter.fromDb(updated);
  }

  async deactivate(id: number): Promise<Product> {
    const deactivated = await prisma.product.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });

    return ProductConverter.fromDb(deactivated);
  }

  async activate(id: number): Promise<Product> {
    const activated = await prisma.product.update({
      where: { id },
      data: {
        deleted_at: null,
      },
    });

    return ProductConverter.fromDb(activated);
  }

  async findOneByFilter(filter: FilterProduct): Promise<Product | null> {
    const where = this.buildFilter(filter);
    const result = await prisma.product.findFirst({ where });
    return result ? ProductConverter.fromDb(result) : null;
  }

  async exists(filter: FilterProduct): Promise<boolean> {
    const where = this.buildFilter(filter);
    const count = await prisma.product.count({ where });
    return count > 0;
  }

  private buildOrderBy(
    filter: FilterProduct,
  ): Prisma.ProductOrderByWithRelationInput {
    const allowedFields = ['name', 'price', 'created_at', 'stock'] as const;

    const field = filter.sortBy ?? 'created_at';
    const direction = filter.sortOrder ?? 'desc';

    if (!allowedFields.includes(field as any)) {
      return { created_at: 'desc' };
    }

    return {
      [field]: direction,
    } as Prisma.ProductOrderByWithRelationInput;
  }

  private buildFilter(filter: FilterProduct) {
    const where: Prisma.ProductWhereInput = {
      AND: [],
    };
    const andConditions = where.AND as Prisma.ProductWhereInput[];

    if (filter.name) {
      andConditions.push({
        name: {
          contains: filter.name.trim(),
        },
      });
    }

    if (filter.search) {
      const normalized = filter.search
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      andConditions.push({
        OR: [
          {
            name: {
              contains: normalized,
            },
          },
          {
            description: {
              contains: normalized,
            },
          },
        ],
      });
    }

    if (filter.minPrice !== undefined && filter.minPrice !== null) {
      andConditions.push({
        price: {
          gte: filter.minPrice,
        },
      });
    }

    if (filter.maxPrice !== undefined && filter.maxPrice !== null) {
      andConditions.push({
        price: {
          lte: filter.maxPrice,
        },
      });
    }

    if (filter.hasDiscount === true) {
      andConditions.push({
        discount_type: {
          not: null,
        },
      });
    } else if (filter.hasDiscount === false) {
      andConditions.push({
        discount_type: null,
      });
    }

    if (filter.onlyOutOfStock === true) {
      andConditions.push({
        stock: 0,
      });
    }

    if (filter.withCouponApplied === true) {
      andConditions.push({
        couponApplications: {
          some: {},
        },
      });
    } else if (filter.withCouponApplied === false) {
      andConditions.push({
        couponApplications: {
          none: {},
        },
      });
    }

    if (filter.idNotEquals) {
      andConditions.push({
        id: {
          not: filter.idNotEquals,
        },
      });
    }

    if (filter.includeDeleted === true) {
      andConditions.push({
        NOT: {
          deleted_at: null,
        },
      });
    } else {
      andConditions.push({
        deleted_at: null,
      });
    }

    return where;
  }
}
