import {
	ReservationRequest,
	ReservationResponse,
} from "../types/ApiDataTypes.ts";

const fetchPostReservation = async (
	body: ReservationRequest
): Promise<ReservationResponse> => {
	const res = await fetch("/reservation", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		throw new Error("좌석 정보를 불러오지 못했습니다.");
	}
	return res.json();
};

export default fetchPostReservation;
