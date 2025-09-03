import { publicJSON } from "../lib/apiClient.ts";
import { PerformanceData } from "../types/ApiDataTypes.ts";

const fetchPerformances = async (
	page: number,
	size = 10
): Promise<PerformanceData> => {
	const url = `/api/v1/performances?${new URLSearchParams({
		page: String(page),
		size: String(size),
	})}`;

	return publicJSON(url, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
};

export default fetchPerformances;
