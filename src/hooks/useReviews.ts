import { useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewData } from "../types/ApiDataTypes.ts";
import {
	fetchDeleteReview,
	fetchGetReview,
	fetchPatchReview,
	fetchPostReview,
} from "../api/performance/performanceReview.ts";
import { ApiError } from "../lib/apiClient.ts";
import { reviewKeys } from "../api/queryKeys.ts";

export default function useReviews(id: string) {
	const queryClient = useQueryClient();

	const { data, status, error } = useQuery<reviewData, ApiError>({
		queryKey: reviewKeys.list(id),
		queryFn: () => fetchGetReview(id!),
		enabled: !!id,
		useErrorBoundary: false,
	});

	return {
		reviews: data?.data.reviews ?? [],
		status,
		error,
		onSubmit: async (content: string, star: number) => {
			try {
				await fetchPostReview(id, content, star);
				queryClient.invalidateQueries({ queryKey: reviewKeys.list(id) });
			} catch (err) {
				if (err && typeof err === "object" && "status" in err) {
					const apiError = err as { status: number };
					if (apiError.status === 409) {
						alert("이미 이 공연에 대한 리뷰를 작성하셨습니다.");
						throw new Error("이미 이 공연에 대한 리뷰를 작성하셨습니다.");
					}
					if (apiError.status === 403) {
						alert("리뷰를 작성하려면 해당 공연을 예매해야 합니다.");
						throw new Error("리뷰를 작성하려면 해당 공연을 예매해야 합니다.");
					}
				}
				throw new Error("리뷰 작성 중 오류가 발생했습니다.");
			}
		},
		onEdit: async (reviewId: string, content: string, star: number) => {
			try {
				await fetchPatchReview(reviewId, content, star);
				queryClient.invalidateQueries({ queryKey: reviewKeys.list(id) });
			} catch {
				throw new Error("리뷰 수정 중 오류가 발생했습니다.");
			}
		},
		onDelete: async (reviewId: string) => {
			try {
				await fetchDeleteReview(reviewId);
				queryClient.invalidateQueries({ queryKey: reviewKeys.list(id) });
			} catch {
				throw new Error("리뷰 삭제 중 오류가 발생했습니다.");
			}
		},
		onLikeToggle: () => {
			queryClient.invalidateQueries({ queryKey: reviewKeys.list(id) });
		},
	};
}
