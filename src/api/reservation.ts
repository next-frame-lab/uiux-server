import {
	ReservationRequest,
	ReservationResponse,
} from "../types/ApiDataTypes.ts";
import { authedJSON } from "../lib/apiClient.ts";

const apiUrl = process.env.BACKEND_SRT_API;

const fetchPostReservation = async (
	body: ReservationRequest
): Promise<ReservationResponse> => {
	return authedJSON(`${apiUrl}/api/v1/reservation`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			accept: "application/json",
		},
		body: JSON.stringify(body),
	});
};

export default fetchPostReservation;
