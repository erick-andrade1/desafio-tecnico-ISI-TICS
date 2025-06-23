/* eslint-disable @typescript-eslint/no-explicit-any */
import { useController, type Control } from 'react-hook-form';
import { formatToCurrency } from '@/utils';
import { cn } from '@/lib/utils';

interface CurrencyInputProps {
  name: string;
  control: Control<any>;
}

export const CurrencyInput = ({ name, control }: CurrencyInputProps) => {
  const {
    field: { onChange, value, ...rest },
  } = useController({ name, control });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const numeric = Number(raw) / 100;
    onChange(numeric);
  };

  return (
    <input
      {...rest}
      value={formatToCurrency(value ?? 0)}
      onChange={handleChange}
      inputMode='numeric'
      className={cn(
        'selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      )}
    />
  );
};
