import { authedJSON } from "../lib/apiClient.ts";

const apiUrl =
	process.env.MODE === "development"
		? process.env.BACKEND_DEVELOPMENT_SRT_API
		: process.env.BACKEND_SRT_API;

const fetchReviewLikes = async (id: string, like: boolean) => {
	return authedJSON(`${apiUrl}/api/v1/reviews/${id}/likes`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			accept: "application/json",
		},
		body: JSON.stringify({ like }),
	});
};

export default fetchReviewLikes;
