import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components';
import type { IGetProduct } from '@/types';

interface IProps {
  data: IGetProduct[];
}

export function ProductsList({ data }: IProps) {
  return (
    <Table className='bg-white'>
      <TableHeader>
        <TableRow className='p-20'>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Estoque</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((data) => (
          <TableRow key={data.id}>
            <TableCell className='font-medium'>{data.name}</TableCell>
            <TableCell className='max-w-[50px]'>
              <p className='text-[#64748b] truncate whitespace-nowrap overflow-hidden text-ellipsis'>
                {data.description}
              </p>
            </TableCell>
            <TableCell>{data.category}</TableCell>
            <TableCell>{data.price}</TableCell>
            <TableCell>{data.stock}</TableCell>
            <TableCell>
              <div className='flex gap-2 justify-center'>
                <span className='material-symbols-outlined cursor-pointer text-[#64748b] '>
                  edit_square
                </span>
                <span className='material-symbols-outlined cursor-pointer text-[#64748b] '>
                  attach_money
                </span>
                <span className='material-symbols-outlined cursor-pointer text-[#64748b] '>
                  delete
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
