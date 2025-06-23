import { injectable } from 'inversify';
import {
  ProductCouponApplicationRepository,
  FilterPaginate,
  ProductCouponApplication,
  ResultPaginate,
  FilterProductCouponApplication,
} from '../core';
import { prisma } from '../external/db/prisma';
import { ProductCouponApplicationConverter } from './converters/ProductCouponApplicationConverter';
import type { Prisma } from '../generated/prisma';

@injectable()
export class ProductCouponApplicationPrismaRepository
  implements ProductCouponApplicationRepository
{
  async findAll(
    filter?: FilterProductCouponApplication,
  ): Promise<ProductCouponApplication[]> {
    const where = this.buildFilter(filter ?? {});

    const applications = await prisma.productCouponApplication.findMany({
      where,
    });
    return applications.map(ProductCouponApplicationConverter.fromDb);
  }

  async paginate(
    filter: FilterPaginate<FilterProductCouponApplication>,
  ): Promise<ResultPaginate<ProductCouponApplication>> {
    const where = this.buildFilter(filter.filter ?? {});
    const [count, items] = await prisma.$transaction([
      prisma.productCouponApplication.count({ where }),
      prisma.productCouponApplication.findMany({
        where,
        take: filter.limit,
        skip: filter.limit * (filter.page - 1),
      }),
    ]);

    return new ResultPaginate(
      filter.page,
      filter.limit,
      count,
      items.map(ProductCouponApplicationConverter.fromDb),
    );
  }

  async findById(id: number): Promise<ProductCouponApplication | null> {
    const coupon = await prisma.productCouponApplication.findUnique({
      where: { id: id },
    });
    return coupon ? ProductCouponApplicationConverter.fromDb(coupon) : null;
  }

  async create(
    coupon: ProductCouponApplication,
  ): Promise<ProductCouponApplication> {
    const data = ProductCouponApplicationConverter.toDb(coupon);
    const created = await prisma.productCouponApplication.create({ data });
    return ProductCouponApplicationConverter.fromDb(created);
  }

  async update(coupon: ProductCouponApplication): Promise<void> {
    const data = ProductCouponApplicationConverter.toDb(coupon);
    await prisma.productCouponApplication.update({
      where: { id: Number(coupon.id) },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.productCouponApplication.update({
      where: { id: id },
      data: {
        removed_at: new Date(),
      },
    });
  }

  async findOneByFilter(
    filter: FilterProductCouponApplication,
  ): Promise<ProductCouponApplication | null> {
    const where = this.buildFilter(filter);
    const result = await prisma.productCouponApplication.findFirst({ where });
    return result ? ProductCouponApplicationConverter.fromDb(result) : null;
  }

  async exists(filter: FilterProductCouponApplication): Promise<boolean> {
    const where = this.buildFilter(filter);
    const count = await prisma.productCouponApplication.count({ where });
    return count > 0;
  }

  private buildFilter(filter: FilterProductCouponApplication) {
    const where: Prisma.ProductCouponApplicationWhereInput = {
      AND: [],
    };
    const andConditions =
      where.AND as Prisma.ProductCouponApplicationWhereInput[];

    if (filter.id) {
      andConditions.push({
        id: filter.id,
      });
    }

    if (filter.productId) {
      andConditions.push({
        product_id: filter.productId,
      });
    }

    if (filter.couponId) {
      andConditions.push({
        coupon_id: filter.couponId,
      });
    }

    if (filter.hasRemovedAt === true) {
      andConditions.push({
        NOT: {
          removed_at: null,
        },
      });
    } else {
      andConditions.push({
        removed_at: null,
      });
    }

    return where;
  }
}
