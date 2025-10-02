import { authedJSON } from "../lib/apiClient.ts";
import getEnvVar from "../utils/env.ts";

const VITE_BACKEND_SRT_API = getEnvVar("VITE_BACKEND_SRT_API");

const { VITE_BACKEND_SRT_API } = import.meta.env;

const fetchReviewLikes = async (id: string, like: boolean) => {
	return authedJSON(`${VITE_BACKEND_SRT_API}/api/v1/reviews/${id}/likes`, {
		method: "POST",
		headers: { "Content-Type": "Application/json" },
		body: JSON.stringify({ like }),
	});
};

export default fetchReviewLikes;
