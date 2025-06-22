import type { IProductDiscount } from '@/types';

interface IProps {
  price: number;
  finalPrice: number;
  discount?: IProductDiscount;
  hasCouponApplied: boolean;
}

export function ProductPrice({
  price,
  finalPrice,
  discount,
  hasCouponApplied,
}: IProps) {
  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  const hasDiscount = finalPrice < price;
  const isPercentDiscount = discount?.type === 'percent' && !hasCouponApplied;

  return (
    <div className='flex items-center gap-1'>
      <div className='flex flex-col items-start gap-1'>
        {hasDiscount && (
          <div className='flex gap-2'>
            <span className='line-through text-gray-500 '>
              {formatPrice(price)}
            </span>
          </div>
        )}
        <span className='text-black  font-semibold'>
          {formatPrice(finalPrice)}
        </span>
      </div>

      {isPercentDiscount && (
        <span className='bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium'>
          {discount.value}%
        </span>
      )}
    </div>
  );
}
