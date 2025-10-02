import { authedJSON } from "../lib/apiClient.ts";

const apiUrl = process.env.BACKEND_SRT_API;

const fetchReviewLikes = async (id: string, like: boolean) => {
	return authedJSON(`${apiUrl}/api/v1/reviews/${id}/likes`, {
		method: "POST",
		headers: { "Content-Type": "Application/json" },
		body: JSON.stringify({ like }),
	});
};

export default fetchReviewLikes;
