import { injectable } from 'inversify';
import {
  ProductRepository,
  FilterPaginate,
  Product,
  ResultPaginate,
  FilterProduct,
} from '../core';
import { prisma } from '../shared/prisma';
import { ProductConverter } from './converters/ProductConverter';
import type { Prisma } from '../generated/prisma';

@injectable()
export class ProductPrismaRepository implements ProductRepository {
  async findAll(filter?: FilterProduct): Promise<Product[]> {
    const where = this.buildFilter(filter ?? {});
    const products = await prisma.product.findMany({ where });
    return products.map(ProductConverter.fromDb);
  }

  async paginate(
    filter: FilterPaginate<FilterProduct>,
  ): Promise<ResultPaginate<Product>> {
    const where = this.buildFilter(filter.filter);
    const [count, items] = await prisma.$transaction([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        take: filter.limit,
        skip: filter.limit * filter.page,
        orderBy: { id: 'desc' },
      }),
    ]);

    return new ResultPaginate(
      filter.page,
      filter.limit,
      count,
      items.map(ProductConverter.fromDb),
    );
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

  async update(product: Product): Promise<void> {
    const data = ProductConverter.toDb(product);
    await prisma.product.update({
      where: { id: Number(product.id) },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.product.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
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

  private buildFilter(filter: FilterProduct) {
    const where: Prisma.ProductWhereInput = {
      AND: [],
    };
    const andConditions = where.AND as Prisma.ProductWhereInput[];

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

    const ALLOWED_SORT_FIELDS = [
      'name',
      'price',
      'stock',
      'createdAt',
      'updatedAt',
      'id',
    ] as const;

    type SortField = (typeof ALLOWED_SORT_FIELDS)[number];
    const sortField: SortField = ALLOWED_SORT_FIELDS.includes(
      filter.sortBy as SortField,
    )
      ? (filter.sortBy as SortField)
      : 'id';

    const sortOrder: Prisma.SortOrder =
      filter.sortOrder === 'asc' ? 'asc' : 'desc';

    const orderBy: Prisma.ProductOrderByWithRelationInput = {
      [sortField]: sortOrder,
    };

    return { where, orderBy };
  }
}
