import type { IGetCoupon } from '@/types';

import { Button } from '@/components/ui';

interface IProps {
  coupons: IGetCoupon[];
  handleCouponSelection: (value: string) => void;
  currentCoupon: string;
}

export function CouponsAvailableList({
  coupons,
  handleCouponSelection,
  currentCoupon,
}: IProps) {
  return (
    <div className='grid grid-cols-3 gap-2 py-2'>
      {coupons.map((coupon) => (
        <Button
          className='transform transition-transform'
          key={coupon.code}
          type='button'
          variant={
            currentCoupon.toLowerCase() === coupon.code ? 'default' : 'outline'
          }
          onClick={() => handleCouponSelection(coupon.code.toUpperCase())}
        >
          {coupon.code.toUpperCase()} ({coupon.value}%)
        </Button>
      ))}
    </div>
  );
}
