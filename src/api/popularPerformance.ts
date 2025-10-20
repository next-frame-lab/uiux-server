import { PopularPerformanceData } from "../types/ApiDataTypes.ts";
import { publicJSON } from "../lib/apiClient.ts";

const apiUrl =
	process.env.MODE === "development"
		? process.env.BACKEND_DEVELOPMENT_SRT_API
		: process.env.BACKEND_SRT_API;

const fetchPopularPerformances = async (): Promise<PopularPerformanceData> => {
	const url = `${apiUrl}/api/v1/performances/top10`;

	return publicJSON(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			accept: "application/json",
		},
	});
};

export default fetchPopularPerformances;
