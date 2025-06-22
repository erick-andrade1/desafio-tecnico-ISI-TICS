import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components';
import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  setPage: (page: number) => void;
}

export function ProductsPagination({
  currentPage = 1,
  totalPages = 1,
  setPage,
}: PaginationProps) {
  const pagesItems = Array.from({ length: totalPages }, (_, i) => ({
    label: i + 1,
    page: i + 1,
    isActive: i + 1 === currentPage,
  })).filter(
    (item) => item.page >= currentPage - 3 && item.page <= currentPage + 3,
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={currentPage > 1 ? 'cursor-pointer' : 'hidden'}
        >
          <PaginationLink
            onClick={() => setPage(currentPage - 1)}
            className='min-w-0 p-0'
          >
            <ChevronsLeftIcon size={16} />
          </PaginationLink>
        </PaginationItem>
        {pagesItems.map((item) => (
          <PaginationItem key={item.label} className='cursor-pointer'>
            <PaginationLink
              isActive={item.isActive}
              onClick={() => setPage(item.page)}
            >
              {item.label}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem
          className={currentPage < totalPages ? 'cursor-pointer' : 'hidden'}
        >
          <PaginationLink
            onClick={() => setPage(currentPage + 1)}
            className='min-w-0 p-0'
          >
            <ChevronsRightIcon size={16} />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
