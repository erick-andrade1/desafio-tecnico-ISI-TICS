import { injectable } from 'inversify';
import {
  CouponRepository,
  FilterPaginate,
  Coupon,
  ResultPaginate,
  FilterCoupon,
} from '../core';
import { prisma } from '../external/db/prisma';
import { CouponConverter } from './converters/CouponConverter';
import type { Prisma } from '../generated/prisma';

@injectable()
export class CouponPrismaRepository implements CouponRepository {
  async findAll(filter?: FilterCoupon): Promise<Coupon[]> {
    const where = this.buildFilter(filter ?? {});

    const coupons = await prisma.coupon.findMany({ where });
    return coupons.map(CouponConverter.fromDb);
  }

  async paginate(
    filter: FilterPaginate<FilterCoupon>,
  ): Promise<ResultPaginate<Coupon>> {
    const where = this.buildFilter(filter.filter ?? {});
    const [count, items] = await prisma.$transaction([
      prisma.coupon.count({ where }),
      prisma.coupon.findMany({
        where,
        take: filter.limit,
        skip: filter.limit * filter.page,
      }),
    ]);

    return new ResultPaginate(
      filter.page,
      filter.limit,
      count,
      items.map(CouponConverter.fromDb),
    );
  }

  async findByCode(code: string): Promise<Coupon | null> {
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toLowerCase().trim() },
    });
    return coupon ? CouponConverter.fromDb(coupon) : null;
  }

  async create(coupon: Coupon): Promise<Coupon> {
    const data = CouponConverter.toDb(coupon);
    const created = await prisma.coupon.create({ data });
    return CouponConverter.fromDb(created);
  }

  async update(coupon: Coupon): Promise<void> {
    const data = CouponConverter.toDb(coupon);
    await prisma.coupon.update({
      where: { id: Number(coupon.id) },
      data,
    });
  }

  async delete(code: string): Promise<void> {
    await prisma.coupon.update({
      where: { code: code.toLowerCase().trim() },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async findOneByFilter(filter: FilterCoupon): Promise<Coupon | null> {
    const where = this.buildFilter(filter);
    const result = await prisma.coupon.findFirst({ where });
    return result ? CouponConverter.fromDb(result) : null;
  }

  async exists(filter: FilterCoupon): Promise<boolean> {
    const where = this.buildFilter(filter);
    const count = await prisma.coupon.count({ where });
    return count > 0;
  }

  private buildFilter(filter: FilterCoupon) {
    const where: Prisma.CouponWhereInput = {
      AND: [],
    };
    const andConditions = where.AND as Prisma.CouponWhereInput[];

    if (filter.code) {
      andConditions.push({
        code: filter.code.toLowerCase().trim(),
      });
    }

    if (filter.type) {
      andConditions.push({
        type: filter.type.toLowerCase().trim(),
      });
    }

    return where;
  }
}
