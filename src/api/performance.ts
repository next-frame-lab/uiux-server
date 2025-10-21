import { publicJSON } from "../lib/apiClient.ts";
import { PerformanceData } from "../types/ApiDataTypes.ts";

const apiUrl =
	process.env.MODE === "development"
		? process.env.BACKEND_DEVELOPMENT_SRT_API
		: process.env.BACKEND_SRT_API;

const fetchPerformances = async (
	page: number,
	size = 32
): Promise<PerformanceData> => {
	const url = `${apiUrl}/api/v1/performances?${new URLSearchParams({
		page: String(page),
		size: String(size),
	})}`;

	return publicJSON(url, {
		method: "GET",
		credentials: "include",
		headers: {
			accept: "application/json",
		},
	});
};

export default fetchPerformances;
