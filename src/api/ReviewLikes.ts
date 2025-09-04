import { authedJSON } from "../lib/apiClient.ts";

const fetchReviewLikes = async (id: string, like: boolean) => {
	return authedJSON(`/api/v1/reviews/${id}/likes`, {
		method: "POST",
		headers: { "Content-Type": "Application/json" },
		body: JSON.stringify({ like }),
	});
};

export default fetchReviewLikes;
