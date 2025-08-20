import { useMemo } from "react";
import { seatData } from "../../types/ApiDataTypes.ts";

interface SelectedSeatsInfoProps {
	seatList: seatData[];
	selectedSeatIds: string[];
}

export default function SelectedSeatsInfo({
	seatList,
	selectedSeatIds,
}: SelectedSeatsInfoProps) {
	const selectedSeats = useMemo(
		() => seatList.filter((s) => selectedSeatIds.includes(s.id)),
		[seatList, selectedSeatIds]
	);

	const formatSeat = (s: seatData) => `${s.section}-${s.row}-${s.column}`;

	return (
		<div className="mt-4">
			<div className="text-sm text-gray-700 font-medium mb-2">
				선택 좌석 ({selectedSeats.length})
			</div>

			{selectedSeats.length === 0 ? (
				<div className="text-sm text-gray-500">선택된 좌석이 없습니다.</div>
			) : (
				<div className="flex flex-wrap gap-2">
					{selectedSeats.map((s) => (
						<span
							key={s.id}
							className="inline-flex items-center rounded-full border px-3 py-1 text-sm"
							title={formatSeat(s)}>
							{formatSeat(s)}
						</span>
					))}
				</div>
			)}
		</div>
	);
}
