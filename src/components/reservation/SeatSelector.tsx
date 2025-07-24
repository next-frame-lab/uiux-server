import { seatData } from "../../types/ApiDataTypes.ts";
import Seat from "./Seat.tsx";

interface SeatSelectorProps {
	seatList: seatData[];
	selectedSeatIds: string[];
	onSelect: (seatId: string) => void;
}

export default function SeatSelector({
	seatList,
	selectedSeatIds,
	onSelect,
}: SeatSelectorProps) {
	return (
		<div>
			{seatList.map((seat) => (
				<Seat
					key={seat.id}
					seat={seat}
					isSelected={selectedSeatIds.includes(seat.id)}
					onClick={onSelect}
				/>
			))}
		</div>
	);
}
