import { seatData } from "../../types/ApiDataTypes.ts";

interface SeatProps {
	seat: seatData;
	isSelected: boolean;
	onClick: (seatId: string) => void;
}

export default function Seat({ seat, isSelected, onClick }: SeatProps) {
	const { id, row, column, section } = seat;
	const handleClick = () => {
		onClick(seat.id);
	};

	const seatColor = isSelected ? "bg-gray-600" : "bg-gray-100";

	return (
		<div
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleClick();
				}
			}}
			onClick={handleClick}
			className={` w-8 h-8 rounded ${seatColor} `}
			style={{
				left: `${(column - 1) * 2.5}rem`,
				top: `${(row - 1) * 2.5}rem`,
			}}
			aria-label={`seat ${section}`}
			aria-pressed={isSelected}
			title={section}
			data-seat-id={id}
		/>
	);
}
