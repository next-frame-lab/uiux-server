import requestJSON from "../lib/apiClient.ts";
import { PerformanceData } from "../types/ApiDataTypes.ts";

const fetchPerformances = async (
	page: number,
	size = 10
): Promise<PerformanceData> => {
	const url = `/api/v1/performances?${new URLSearchParams({
		page: String(page),
		size: String(size),
	})}`;

	return requestJSON(url, { method: "GET" });
};

export default fetchPerformances;
