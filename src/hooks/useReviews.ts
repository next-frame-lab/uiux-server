import { useQuery } from "@tanstack/react-query";
import { reviewData } from "../types/ApiDataTypes.ts";
import {
	fetchDeleteReview,
	fetchGetReview,
	fetchPatchReview,
	fetchPostReview,
} from "../api/performanceReview.ts";
import { ApiError } from "../lib/apiClient.ts";

export default function useReviews(id: string) {
	const { data, status, error } = useQuery<reviewData, ApiError>({
		queryKey: ["performanceReviews", id],
		queryFn: () => fetchGetReview(id!),
		enabled: !!id,
		useErrorBoundary: true,
	});

	return {
		reviews: data?.data.reviews ?? [],
		status,
		error,
		onSubmit: (content: string, star: number) =>
			fetchPostReview(id, content, star),
		onEdit: fetchPatchReview,
		onDelete: fetchDeleteReview,
	};
}
