import { useNavigate } from 'react-router';

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
  Table,
  Button,
} from '@/components';
import type { IGetProduct } from '@/types';
import {
  RemoveProductDialog,
  ApplyDiscountDialog,
  ProductPrice,
} from './components';
import { PATHS } from '@/utils';

interface IProps {
  data?: IGetProduct[];
}

export function ProductsList({ data }: IProps) {
  const navigate = useNavigate();

  return (
    <Table className='bg-white overflow-y-hidden'>
      {(!data || !data.length) && (
        <TableCaption>
          <div className='pt-5'>
            Nenhum produto encontrado. Clique no botão abaixo e cadastre um
            produto!
          </div>
          <div className='flex justify-center py-6'>
            <Button
              type='button'
              variant={'secondary'}
              onClick={() => navigate(PATHS.PRODUCTS.CREATE_PRODUCTS)}
              className='whitespace-nowrap flex items-center gap-1'
            >
              Criar produto
            </Button>
          </div>
        </TableCaption>
      )}
      <TableHeader>
        <TableRow className='p-20'>
          <TableHead>Nome</TableHead>
          <TableHead className='hidden md:flex'>Descrição</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead className='text-center'>Estoque</TableHead>
          <TableHead className='text-center'>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map((data) => (
            <TableRow key={data.id}>
              <TableCell className='font-medium'>{data.name}</TableCell>
              <TableCell className='hidden md:inline'>
                <div className='text-[#64748b] w-[120px] truncate'>
                  {data.description ? data.description : 'N/A'}
                </div>
              </TableCell>
              <TableCell>
                <ProductPrice
                  price={data.price}
                  finalPrice={data.finalPrice}
                  discount={data.discount}
                  hasCouponApplied={data.hasCouponApplied}
                />
              </TableCell>
              <TableCell className='text-center'>
                {data.is_out_of_stock ? (
                  <span className='bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium'>
                    Esgotado
                  </span>
                ) : (
                  data.stock
                )}
              </TableCell>
              <TableCell>
                <div className='flex gap-2 justify-center'>
                  <span
                    className='material-symbols-outlined cursor-pointer text-[#64748b]'
                    onClick={() => navigate(`/produtos/editar/${data.id}`)}
                  >
                    edit_square
                  </span>

                  <ApplyDiscountDialog productId={data.id} />

                  <RemoveProductDialog productId={data.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
