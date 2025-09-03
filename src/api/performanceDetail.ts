import { PerformanceDetailData } from "../types/ApiDataTypes.ts";
import { authedJSON } from "../lib/apiClient.ts";

const fetchPerformanceDetail = async (
	id: string
): Promise<PerformanceDetailData> => {
	return authedJSON(`/api/v1/performances/${id}`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
};

export default fetchPerformanceDetail;
