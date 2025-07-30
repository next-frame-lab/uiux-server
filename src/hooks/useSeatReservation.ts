import { useCallback, useMemo, useState } from "react";
import { seatData } from "../types/ApiDataTypes.ts";

export default function useSeatReservation() {
	const [selectedSeats, setSelectedSeats] = useState<seatData[]>([]);

	// 좌석 추가 & 제거
	const toggleSeat = useCallback((seat: seatData) => {
		setSelectedSeats((prev) => {
			const isSelected = prev.some((s) => s.id === seat.id);

			if (isSelected) {
				return prev.filter((s) => s.id !== seat.id);
			}
			if (prev.length >= 4) {
				alert("최대 4개 좌석까지만 선택할 수 있습니다.");
				return prev;
			}
			return [...prev, seat];
		});
	}, []);

	const selectedSeatIds = useMemo(
		() => selectedSeats.map((s) => s.id),
		[selectedSeats]
	);

	const resetSelection = useCallback(() => {
		setSelectedSeats([]);
	}, []);

	return {
		selectedSeats,
		selectedSeatIds,
		toggleSeat,
		resetSelection,
	};
}
