import { seatData } from "../../types/ApiDataTypes.ts";

interface SeatProps {
	seat: seatData;
	isSelected: boolean;
	onClick: (seatId: string) => void;
}

export default function Seat({ seat, isSelected, onClick }: SeatProps) {
	const { row, column, isLocked } = seat;
	const handleClick = () => {
		if (!isLocked) {
			onClick(seat.id);
		}
	};

	let seatColor = "bg-gray-100";
	if (isLocked) seatColor = "bg-gray-300";
	else if (isSelected) seatColor = "bg-gray-600";

	return (
		<button
			type="button"
			disabled={isLocked}
			onClick={handleClick}
			className={` w-8 h-8 rounded ${seatColor}`}
			style={{
				left: `${column * 2.5}rem`,
				top: `${row * 2.5}rem`,
			}}
			aria-label="seat"
		/>
	);
}
