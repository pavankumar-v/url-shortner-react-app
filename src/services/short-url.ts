import { api } from "@/lib/api"

type ShortenResponse = {
  short_code: string;
}

type UrlData = {
  short_code: string;
  full_url: string;
  visit_count?: number;
  created_at?: string;
}

type PaginatedUrlsResponse = {
  urls: UrlData[];
  metadata: {
    total_records: number,
    total_pages: number,
    current_page: number,
    per_page: number
  }
}

export const shortenUrl = async (body: { full_url: string }): Promise<ShortenResponse> => {
  const response = await api.post<ShortenResponse>('/short_urls', body)
  return response.data
}

export const getTop100Urls = async (page: number = 1): Promise<PaginatedUrlsResponse> => {
  const response = await api.get<PaginatedUrlsResponse>(`/short_urls?page=${page}`);
  return response.data;
}
