import { PopularPerformanceData } from "../types/ApiDataTypes.ts";
import { publicJSON } from "../lib/apiClient.ts";

const apiUrl = process.env.BACKEND_SRT_API;

const fetchPopularPerformances = async (): Promise<PopularPerformanceData> => {
	const url = `${apiUrl}/api/v1/performances/top10`;

	return publicJSON(url, {
		method: "GET",
		credentials: "include",
		headers: {
			accept: "application/json",
		},
	});
};

export default fetchPopularPerformances;
