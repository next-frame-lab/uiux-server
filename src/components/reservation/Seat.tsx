import { seatData } from "../../types/ApiDataTypes.ts";

interface SeatProps {
	seat: seatData;
	isSelected: boolean;
	onClick: (seatId: string) => void;
	disabled: boolean;
}

export default function Seat({
	seat,
	isSelected,
	onClick,
	disabled = false,
}: SeatProps) {
	const { id, row, column, section } = seat;
	const handleClick = () => {
		if (disabled) return;
		onClick(seat.id);
	};

	const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (disabled) return;
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick(id);
		}
	};

	let seatColor = "bg-gray-300 hover:bg-gray-400 cursor-pointer";
	if (disabled) {
		seatColor = "bg-red-600 cursor-not-allowed";
	} else if (isSelected) {
		seatColor = "bg-green-600 hover:bg-green-700 cursor-pointer";
	}

	return (
		<div
			role="button"
			tabIndex={disabled ? -1 : 0}
			onKeyDown={handleKeyDown}
			onClick={handleClick}
			className={`w-8 h-8 rounded transition-colors ${seatColor}`}
			style={{
				left: `${(column - 1) * 2.5}rem`,
				top: `${(row - 1) * 2.5}rem`,
			}}
			aria-label={`seat ${section}`}
		/>
	);
}
