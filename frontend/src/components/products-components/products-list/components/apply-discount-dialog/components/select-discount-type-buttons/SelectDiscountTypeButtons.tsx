import { Button } from '@/components';
import { VIEW_TYPES } from '@/utils';

interface IProps {
  clickedButton: string;
  setClickedButton: (value: string) => void;
}

export function SelectDiscountTypeButtons({
  clickedButton,
  setClickedButton,
}: IProps) {
  return (
    <div className='pt-1 pb-4 border-b-2 border-b-[#f1f5f9]'>
      <div className='flex justify-between gap-4'>
        <div className='w-full'>
          <Button
            className='w-full transform  transition-transform'
            variant={
              clickedButton === VIEW_TYPES.COUPON ? 'default' : 'outline'
            }
            onClick={() => setClickedButton(VIEW_TYPES.COUPON)}
          >
            <span className='material-symbols-outlined'>sell</span> Código Cupom
          </Button>
        </div>
        <div className='w-full'>
          <Button
            className='w-full transform  transition-transform'
            variant={
              clickedButton === VIEW_TYPES.PERCENT ? 'default' : 'outline'
            }
            onClick={() => setClickedButton(VIEW_TYPES.PERCENT)}
          >
            <span className='material-symbols-outlined'>percent</span>{' '}
            Percentual Direto
          </Button>
        </div>
      </div>
    </div>
  );
}
