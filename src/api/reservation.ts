import {
	ReservationRequest,
	ReservationResponse,
} from "../types/ApiDataTypes.ts";
import { authedJSON } from "../lib/apiClient.ts";

const fetchPostReservation = async (
	body: ReservationRequest
): Promise<ReservationResponse> => {
	return authedJSON(`/api/v1/reservation`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
};

export default fetchPostReservation;
