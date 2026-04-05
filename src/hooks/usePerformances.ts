import { useInfiniteQuery } from "@tanstack/react-query";
import fetchPerformances from "../api/performance/performance.ts";
import { PerformanceData } from "../types/ApiDataTypes.ts";
import { ApiError } from "../lib/apiClient.ts";
import { performanceKeys } from "../api/queryKeys.ts";

export default function usePerformances(size = 32, genre?: string) {
	return useInfiniteQuery<PerformanceData, ApiError>({
		queryKey: performanceKeys.list(size, genre),
		queryFn: ({ pageParam = 0 }) => fetchPerformances(pageParam, size, genre),
		getNextPageParam: (lastPage) => {
			const { pagination } = lastPage;
			return pagination?.hasNext ? pagination.page + 1 : undefined;
		},
	});
}
