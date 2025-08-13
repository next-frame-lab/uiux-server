import { useQuery } from "@tanstack/react-query";
import fetchPerformanceReview from "../api/performanceReview.ts";
import { reviewData } from "../types/ApiDataTypes.ts";

export default function useReviews(id: string) {
	const { data, isLoading, isError } = useQuery<reviewData>({
		queryKey: ["performanceReviews", id],
		queryFn: () => fetchPerformanceReview(id!),
		enabled: !!id,
	});

	const handleSubmitReview = async (content: string, star: number) => {
		{
			const res = await fetch(`/performance/${id}/reviews`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content, star }),
			});
			if (!res.ok) {
				throw new Error("리뷰 작성 실패");
			}
			return res.json();
		}
	};

	const handleEditReview = async (reviewId: string, content: string) => {
		const res = await fetch(`/reviews/${reviewId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ content }),
		});

		return res.json();
	};

	const handleDeleteReview = async (reviewId: string) => {
		const res = await fetch(`/reviews/${reviewId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return res.json();
	};

	return {
		reviews: data?.reviewList ?? [],
		isLoading,
		isError,
		onSubmit: handleSubmitReview,
		onEdit: handleEditReview,
		onDelete: handleDeleteReview,
	};
}
