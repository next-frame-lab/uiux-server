import {
	ReservationRequest,
	ReservationResponse,
} from "../types/ApiDataTypes.ts";
import { authedJSON } from "../lib/apiClient.ts";
import getEnvVar from "../utils/env.ts";

const VITE_BACKEND_SRT_API = getEnvVar("VITE_BACKEND_SRT_API");

const { VITE_BACKEND_SRT_API } = import.meta.env;

const fetchPostReservation = async (
	body: ReservationRequest
): Promise<ReservationResponse> => {
	return authedJSON(`${VITE_BACKEND_SRT_API}/api/v1/reservation`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
};

export default fetchPostReservation;
