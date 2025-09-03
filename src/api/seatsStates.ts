import { seatStateData } from "../types/ApiDataTypes.ts";
import { authedJSON } from "../lib/apiClient.ts";

type Raw = { code: string; data: { seats: seatStateData[] } };

const fetchSeatsStates = async (id: string) => {
	const json = await authedJSON<Raw>(`/api/v1/schedules/${id}/seat-states`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	return json.data.seats;
};

export default fetchSeatsStates;
