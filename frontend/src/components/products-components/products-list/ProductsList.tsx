import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components';
import { ProductPrice } from './components';
import type { IGetProduct } from '@/types';

import { RemoveProductDialog } from './components';
import { useNavigate } from 'react-router';
interface IProps {
  data: IGetProduct[];
}

export function ProductsList({ data }: IProps) {
  const navigate = useNavigate();

  return (
    <Table className='bg-white'>
      <TableHeader>
        <TableRow className='p-20'>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead className='text-center'>Estoque</TableHead>
          <TableHead className='text-center'>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((data) => (
          <TableRow key={data.id}>
            <TableCell className='font-medium'>{data.name}</TableCell>
            <TableCell>
              <p className='text-[#64748b] w-[200px] truncate'>
                {data.description ? data.description : 'N/A'}
              </p>
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
                <span className='material-symbols-outlined cursor-pointer text-[#64748b]'>
                  attach_money
                </span>
                <RemoveProductDialog productId={data.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
