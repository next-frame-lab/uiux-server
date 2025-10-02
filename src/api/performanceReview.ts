import { authedJSON } from "../lib/apiClient.ts";
import { reviewData } from "../types/ApiDataTypes.ts";

const apiUrl = process.env.BACKEND_SRT_API;

const fetchGetReview = async (id: string) => {
	return authedJSON<reviewData>(`${apiUrl}/api/v1/performances/${id}/reviews`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
};

const fetchPostReview = async (id: string, content: string, star: number) => {
	return authedJSON(`${apiUrl}/api/v1/performances/${id}/reviews`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ content, star }),
	});
};

const fetchPatchReview = async (reviewId: string, content: string) => {
	return authedJSON(`${apiUrl}/api/v1/reviews/${reviewId}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ content }),
	});
};

const fetchDeleteReview = async (reviewId: string) => {
	return authedJSON(`${apiUrl}/api/v1/reviews/${reviewId}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	});
};

export { fetchGetReview, fetchPostReview, fetchPatchReview, fetchDeleteReview };
