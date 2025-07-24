import { useState } from "react";
import { seatData } from "../types/ApiDataTypes.ts";

export default function useSeatReservation() {
	const [selectedSeats, setSelectedSeats] = useState<seatData[]>([]);

	// 좌석 추가 & 제거
	const toggleSeat = (seat: seatData) => {
		const isSelected = selectedSeats.some((s) => s.id === seat.id);

		if (isSelected) {
			setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
		} else {
			if (selectedSeats.length >= 4) {
				alert("최대 4개 좌석까지만 선택할 수 있습니다.");
				return;
			}
			setSelectedSeats((prev) => [...prev, seat]);
		}
	};

	const selectedSeatIds = selectedSeats.map((s) => s.id);

	const resetSelection = () => {
		setSelectedSeats([]);
	};

	return {
		selectedSeats,
		selectedSeatIds,
		toggleSeat,
		resetSelection,
	};
}
