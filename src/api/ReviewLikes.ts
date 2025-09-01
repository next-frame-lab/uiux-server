import requestJSON from "../lib/apiClient.ts";

const fetchReviewLikes = async (id: string, like: boolean) => {
	return requestJSON(`/api/v1/reviews/${id}/likes`, {
		method: "POST",
		body: JSON.stringify({ like }),
	});
};

export default fetchReviewLikes;
