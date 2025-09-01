import { PerformanceDetailData } from "../types/ApiDataTypes.ts";
import requestJSON from "../lib/apiClient.ts";

const fetchPerformanceDetail = async (
	id: string
): Promise<PerformanceDetailData> => {
	return requestJSON(`/api/v1/performances/${id}`, { method: "GET" });
};

export default fetchPerformanceDetail;
