import { seatStateData } from "../types/ApiDataTypes.ts";

type Raw = { code: string; data: { seats: seatStateData[] } };

const fetchSeatsStates = async (id: string) => {
	const res = await fetch(`/schedules/${id}/seat-states`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) throw new Error("좌석 상태를 불러오지 못했습니다.");

	const json: Raw = await res.json();
	return json.data.seats;
};

export default fetchSeatsStates;
