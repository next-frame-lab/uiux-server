import { seatStateData } from "../types/ApiDataTypes.ts";
import { authedJSON } from "../lib/apiClient.ts";

type Raw = { code: string; data: { seats: seatStateData[] } };

const apiUrl =
	process.env.MODE === "development"
		? process.env.BACKEND_DEVELOPMENT_SRT_API
		: process.env.BACKEND_SRT_API;

const fetchSeatsStates = async (id: string) => {
	const json = await authedJSON<Raw>(
		`${apiUrl}/api/v1/schedules/${id}/seat-states`,
		{
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json",
			},
		}
	);

	return json.data.seats;
};

export default fetchSeatsStates;
