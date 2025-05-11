import { api } from "@/lib/api"

type Response = {
  short_code: string;
}

export const shortenUrl = async (body: { full_url: string }): Promise<Response> => {
  const response = await api.post<Response>('/short_urls', body)
  return response.data
}
