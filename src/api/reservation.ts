import {
	ReservationRequest,
	ReservationResponse,
} from "../types/ApiDataTypes.ts";
import { authedJSON } from "../lib/apiClient.ts";

const { BACKEND_SRT_API } = import.meta.env;

const fetchPostReservation = async (
	body: ReservationRequest
): Promise<ReservationResponse> => {
	return authedJSON(`${BACKEND_SRT_API}/api/v1/reservation`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
};

export default fetchPostReservation;
