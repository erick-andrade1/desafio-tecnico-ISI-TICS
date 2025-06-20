import { Input, Label, Button } from '@/components';

export function ProductsFilter() {
  return (
    <div className='flex xs:flex-col md:flex-row justify-between align-bottom gap-4'>
      <div className='flex gap-6 align-bottom items-end'>
        <div className='grid  items-center gap-4'>
          <Label className='text-[16px]' htmlFor='min_price'>
            Preço mínimo
          </Label>
          <Input
            className='max-w-[150px] h-11'
            type='number'
            id='min_price'
            placeholder='R$ 200,00'
          />
        </div>
        <div className='grid items-center gap-4'>
          <Label className='text-[16px]' htmlFor='min_price'>
            Preço máximo
          </Label>
          <Input
            className='max-w-[150px] h-11'
            type='number'
            id='min_price'
            placeholder='R$ 2000,00'
          />
        </div>
        <Button className='h-11'>Filtrar</Button>
      </div>
      <div className='flex gap-6 align-bottom items-end'>
        <Input
          className='min-w-[100px] max-w-[300px] h-11'
          type='text'
          id='min_price'
          placeholder='Buscar produto'
        />

        <Button className='h-11'>
          <span className='material-symbols-outlined'>add</span>
          Criar produto
        </Button>
      </div>
    </div>
  );
}
