import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@app/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  className?: string;
}

const JobPagination: React.FC<Props> = ({ currentPage, totalPages, className }) => {
  
  const getPrevious = () => {
    return Math.max(currentPage - 1, 1);
  }

  const getNext = () => {
    return Math.min(currentPage + 1, totalPages);
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
      <PaginationPrevious href={`?page=${getPrevious()}`} />
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}><PaginationLink href={`?page=${index + 1}`}>{index + 1}</PaginationLink></PaginationItem>
        ))}
        <PaginationNext href={`?page=${getNext()}`} />
      </PaginationContent>  
    </Pagination>
  );
};

export default JobPagination;
