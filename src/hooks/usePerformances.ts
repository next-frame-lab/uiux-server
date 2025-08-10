import { useInfiniteQuery } from "@tanstack/react-query";
import fetchPerformances from "../api/performance.ts";

export default function usePerformances() {
	return useInfiniteQuery({
		queryKey: ["performances"],
		queryFn: ({ pageParam = 1 }) => fetchPerformances(pageParam),
		getNextPageParam: (lastPage) =>
			lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined,
	});
}
