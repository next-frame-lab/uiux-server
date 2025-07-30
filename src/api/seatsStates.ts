import { seatStateData } from "../types/ApiDataTypes.ts";
import { authedJSON } from "../lib/apiClient.ts";

type Raw = { code: string; data: { seats: seatStateData[] } };
const { BACKEND_SRT_API } = import.meta.env;

const fetchSeatsStates = async (id: string) => {
	const json = await authedJSON<Raw>(
		`${BACKEND_SRT_API}/api/v1/schedules/${id}/seat-states`,
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
