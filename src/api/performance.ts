import { publicJSON } from "../lib/apiClient.ts";
import { PerformanceData } from "../types/ApiDataTypes.ts";
import getEnvVar from "../utils/env.ts";
const VITE_BACKEND_SRT_API = getEnvVar("VITE_BACKEND_SRT_API");

const { VITE_BACKEND_SRT_API } = import.meta.env;

const fetchPerformances = async (
	page: number,
	size = 10
): Promise<PerformanceData> => {
	const url = `${VITE_BACKEND_SRT_API}/api/v1/performances?${new URLSearchParams(
		{
			page: String(page),
			size: String(size),
		}
	)}`;

	return publicJSON(url, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
};

export default fetchPerformances;
