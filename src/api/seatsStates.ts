import { seatStateData } from "../types/ApiDataTypes.ts";
import { authedJSON } from "../lib/apiClient.ts";
import getEnvVar from "../utils/env.ts";

type Raw = { code: string; data: { seats: seatStateData[] } };
const VITE_BACKEND_SRT_API = getEnvVar("VITE_BACKEND_SRT_API");

const fetchSeatsStates = async (id: string) => {
	const json = await authedJSON<Raw>(
		`${VITE_BACKEND_SRT_API}/api/v1/schedules/${id}/seat-states`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	return json.data.seats;
};

export default fetchSeatsStates;
