import { useInfiniteQuery } from "@tanstack/react-query";
import fetchPerformances from "../api/performance.ts";
import { PerformanceData } from "../types/ApiDataTypes.ts";
import { ApiError } from "../lib/apiClient.ts";

export default function usePerformances(size = 32) {
	return useInfiniteQuery<PerformanceData, ApiError>({
		queryKey: ["performances", size],
		queryFn: ({ pageParam = 0 }) => fetchPerformances(pageParam, size),
		getNextPageParam: (lastPage) =>
			lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined,
	});
}
