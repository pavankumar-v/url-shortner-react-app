import type { ColumnDef } from "@tanstack/react-table";
import type { UrlData } from "./UrlsDataTable";
import { getShortUrl } from "@/lib/utils";
import CopyButton from "../ui/copy-button";

const truncateUrl = (url: string, maxLength: number = 50) => {
  return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
};

type Columns = {
  currentPage: number;
}

export const columns = ({ currentPage }: Columns): ColumnDef<UrlData>[] => [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => <div className="font-medium">{row.index + 1 + (currentPage - 1) * 10}</div>,
  },
  {
    accessorKey: "short_code",
    header: "Short URL",
    cell: ({ row }) => (
      <a
        href={`http://localhost:3000/${row.original.short_code}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {getShortUrl(row.original.short_code)}
      </a>
    ),
  },
  {
    accessorKey: "full_url",
    header: "Original URL",
    cell: ({ row }) => (
      <span title={row.original.full_url} className="block max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
        {truncateUrl(row.original.full_url)}
      </span>
    ),
  },
  {
    accessorKey: "click_count",
    header: "Visits",
    cell: ({ row }) => <div>{row.original.click_count || 0}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <CopyButton text={getShortUrl(row.original.short_code)} />
    ),
  },
];
