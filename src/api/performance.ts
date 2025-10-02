import { publicJSON } from "../lib/apiClient.ts";
import { PerformanceData } from "../types/ApiDataTypes.ts";

const apiUrl = process.env.BACKEND_SRT_API;

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
		headers: { "Content-Type": "application/json" },
	});
};

export default fetchPerformances;
