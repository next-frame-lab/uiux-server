import { PerformanceDetailData } from "../types/ApiDataTypes.ts";
import { authedJSON } from "../lib/apiClient.ts";

const { BACKEND_SRT_API } = import.meta.env;

const fetchPerformanceDetail = async (
	id: string
): Promise<PerformanceDetailData> => {
	return authedJSON(`${BACKEND_SRT_API}/api/v1/performances/${id}`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
};

export default fetchPerformanceDetail;
