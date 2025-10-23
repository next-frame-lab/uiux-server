import { authedJSON } from "../lib/apiClient.ts";
import { selectSeatsData } from "../types/ApiDataTypes.ts";

const apiUrl = process.env.BACKEND_SRT_API;

const fetchSeats = async (id: string): Promise<selectSeatsData> => {
	return authedJSON(`${apiUrl}/api/v1/stadiums/${id}/seat-definitions`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			accept: "application/json",
		},
	});
};

export default fetchSeats;
