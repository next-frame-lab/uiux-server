import { authedJSON } from "../lib/apiClient.ts";
import { selectSeatsData } from "../types/ApiDataTypes.ts";

const fetchSeats = async (id: string): Promise<selectSeatsData> => {
	return authedJSON(`/api/v1/stadiums/${id}/seat-definitions`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export default fetchSeats;
