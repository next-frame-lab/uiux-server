import { PerformanceDetailData } from "../types/ApiDataTypes.ts";
import { authedJSON } from "../lib/apiClient.ts";

const apiUrl = process.env.BACKEND_SRT_API;

const fetchPerformanceDetail = async (
	id: string
): Promise<PerformanceDetailData> => {
	return authedJSON(`${apiUrl}/api/v1/performances/${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			accept: "application/json",
		},
	});
};

export default fetchPerformanceDetail;
