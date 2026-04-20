import useSWR from "swr";
import { SavedAnalysis } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
});

export function useHistory(page: number, limit: number, grade?: string, search?: string) {
  let url = `/api/history?page=${page}&limit=${limit}`;
  if (grade && grade !== "all") {
    url += `&grade=${grade}`;
  }
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const { data, error, isLoading, mutate } = useSWR<{ analyses: SavedAnalysis[], total: number, totalPages: number }>(url, fetcher);

  return {
    analyses: data?.analyses || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 0,
    isLoading,
    isError: error,
    mutate,
  };
}
