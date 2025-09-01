import requestJSON from "../lib/apiClient.ts";
import { reviewData } from "../types/ApiDataTypes.ts";

const fetchGetReview = async (id: string) => {
	return requestJSON<reviewData>(`/api/v1/performances/${id}/reviews`, {
		method: "GET",
	});
};

const fetchPostReview = async (id: string, content: string, star: number) => {
	return requestJSON(`/api/v1/performances/${id}/reviews`, {
		method: "POST",
		body: JSON.stringify({ content, star }),
	});
};

const fetchPatchReview = async (reviewId: string, content: string) => {
	return requestJSON(`/api/v1/reviews/${reviewId}`, {
		method: "PATCH",
		body: JSON.stringify({ content }),
	});
};

const fetchDeleteReview = async (reviewId: string) => {
	return requestJSON(`/api/v1/reviews/${reviewId}`, {
		method: "DELETE",
	});
};

export { fetchGetReview, fetchPostReview, fetchPatchReview, fetchDeleteReview };
