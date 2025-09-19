import { PerformanceDetailData } from "../types/ApiDataTypes.ts";
import { authedJSON } from "../lib/apiClient.ts";
import getEnvVar from "../utils/env.ts";
const VITE_BACKEND_SRT_API = getEnvVar("VITE_BACKEND_SRT_API");

const fetchPerformanceDetail = async (
	id: string
): Promise<PerformanceDetailData> => {
	return authedJSON(`${VITE_BACKEND_SRT_API}/api/v1/performances/${id}`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
};

export default fetchPerformanceDetail;
