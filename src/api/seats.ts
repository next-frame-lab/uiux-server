import { authedJSON } from "../lib/apiClient.ts";
import { selectSeatsData } from "../types/ApiDataTypes.ts";
import getEnvVar from "../utils/env.ts";
const VITE_BACKEND_SRT_API = getEnvVar("VITE_BACKEND_SRT_API");

const { VITE_BACKEND_SRT_API } = import.meta.env;

const fetchSeats = async (id: string): Promise<selectSeatsData> => {
	return authedJSON(
		`${VITE_BACKEND_SRT_API}/api/v1/stadiums/${id}/seat-definitions`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
};

export default fetchSeats;
