import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type TableBodySkeletonProps = {
  rows?: number;
  columns?: number;
  columnWidths?: string[]; 
};

export function TableBodySkeleton({
  rows = 3,
  columns = 3,
  columnWidths = [],
}: TableBodySkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton
                className={`h-4 ${columnWidths[colIndex] || "w-24"}`}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
