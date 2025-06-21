import { Product } from '../../core/product/model/Product';
import { Product as ProductDb } from '../../generated/prisma';

export class ProductConverter {
  static fromDb(product: ProductDb): Product {
    return new Product({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      hasCouponApplied: product.hasCouponApplied,
      discount: product.discount_type
        ? {
            type: product.discount_type,
            value: product.discount_value!,
            applied_at: new Date(product.discount_applied_at!),
          }
        : undefined,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      deletedAt: product.deleted_at,
    });
  }

  static toDb(product: Product): Omit<ProductDb, 'id'> & { id?: number } {
    return {
      id: product.id ? Number(product.id) : undefined,
      name: product.name.getName(),
      description: product.description,
      price: product.price.getPrice(),
      stock: product.stock,
      hasCouponApplied: product.hasCouponApplied,
      discount_type: product.discount?.type ?? null,
      discount_value: product.discount?.value ?? null,
      discount_applied_at: product.discount
        ? new Date(product.discount.applied_at)
        : null,
      created_at: product.createdAt,
      updated_at: product.updatedAt ? new Date(product.updatedAt) : new Date(),
      deleted_at: product.deletedAt ? new Date(product.deletedAt) : null,
    };
  }
}
