import { publicJSON } from "../../lib/apiClient.ts";
import { PerformanceData } from "../../types/ApiDataTypes.ts";

const apiUrl = process.env.BACKEND_SRT_API;

const fetchPerformances = async (
	page: number,
	size = 32,
	genre?: string
): Promise<PerformanceData> => {
	const params: Record<string, string> = {
		page: String(page),
		size: String(size),
	};
	if (genre) {
		params.genre = genre;
	}

	const url = `${apiUrl}/api/v1/performances?${new URLSearchParams(params)}`;

	return publicJSON(url, {
		method: "GET",
		credentials: "include",
		headers: {
			accept: "application/json",
		},
	});
};

export default fetchPerformances;
