import { ListProductDTO, Product } from '../../../core';

export function createProductList(product: Product): ListProductDTO {
  return {
    id: product.id!,
    name: product.name.getName(),
    description: product.description,
    stock: product.stock,
    is_out_of_stock: product.stock === 0,
    price: product.price.getPrice(),
    finalPrice: product.calculateDiscount(),
    discount: product.discount,
    hasCouponApplied: product.hasCouponApplied,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    deletedAt: product.deletedAt,
  };
}
