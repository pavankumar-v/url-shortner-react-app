import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { getTop100Urls } from "@/services/short-url";
import { columns } from "./Columns";
import useToggle from "@/hooks/useToggle";

export interface UrlData {
  short_code: string;
  full_url: string;
  click_count?: number;
  created_at?: string;
}

export type TableProps = {
  data: UrlData[];
  pagination: { currentPage: number; totalPages: number }
}

const UrlsDataTable: React.FC = () => {
  const [loading, setLoading] = useToggle(true);
  const [error, setError] = useState<string | null>(null);
  const [table, setTable] = useState<TableProps>({ data: [], pagination: { currentPage: 1, totalPages: 0 } });

  const fetchUrls = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const data = await getTop100Urls(page);

      setTable({
        data: data.urls || [],
        pagination: {
          currentPage: data.metadata.current_page,
          totalPages: data.metadata.total_pages
        }
      });
    } catch {
      setError("Failed to load URLs. Please try again later.");

      setTable({
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 0
        }
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUrls(table.pagination.currentPage);
  }, [table.pagination.currentPage, fetchUrls]);

  const handlePageChange = (page: number) => {
    setTable({
      ...table,
      pagination: {
        ...table.pagination,
        currentPage: page
      }
    });
  };

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <p className="text-red-700">{error}</p>
          <button
            className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
            onClick={() => fetchUrls(table.pagination.currentPage)}
          >
            Try Again
          </button>
        </div>
      )}

      <DataTable
        columns={columns({ currentPage: table.pagination.currentPage })}
        data={table.data}
        currentPage={table.pagination.currentPage}
        totalPages={table.pagination.totalPages}
        onPageChange={handlePageChange}
        isLoading={loading}
        pageSize={10}
      />
    </>
  );
};

export default UrlsDataTable;
