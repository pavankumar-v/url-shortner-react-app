import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { Button } from "../button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  pageSize?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  isLoading = false,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.max(1, totalPages),
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 font-medium">No URLs found</p>
                    <p className="text-gray-400 mt-1">Start shortening URLs to see them here!</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4 border-t mt-4">
        <div className="text-sm text-muted-foreground">
          Showing page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="h-8 px-3"
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {/* First page */}
            {totalPages > 0 && (
              <Button
                key={0}
                variant={currentPage === 1 ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0 font-medium"
                onClick={() => onPageChange?.(1)}
                disabled={isLoading}
              >
                1
              </Button>
            )}

            {/* Ellipsis after first page */}
            {currentPage > 3 && (
              <span className="mx-1 px-2 text-muted-foreground">•••</span>
            )}

            {/* Show pages around current page */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              // Only show pages near the current page
              if (
                pageNumber !== 1 &&
                pageNumber !== totalPages &&
                pageNumber >= currentPage - 1 &&
                pageNumber <= currentPage + 1
              ) {
                return (
                  <Button
                    key={i}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0 font-medium"
                    onClick={() => onPageChange?.(pageNumber)}
                    disabled={isLoading}
                  >
                    {pageNumber}
                  </Button>
                );
              }
              return null;
            })}

            {/* Ellipsis before last page */}
            {currentPage < totalPages - 2 && (
              <span className="mx-1 px-2 text-muted-foreground">•••</span>
            )}

            {/* Last page */}
            {totalPages > 1 && (
              <Button
                key={totalPages - 1}
                variant={currentPage === totalPages ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0 font-medium"
                onClick={() => onPageChange?.(totalPages)}
                disabled={isLoading}
              >
                {totalPages}
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage >= totalPages || isLoading}
            className="h-8 px-3"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
