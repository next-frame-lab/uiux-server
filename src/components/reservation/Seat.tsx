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

	let seatColor = "bg-gray-100 hover:bg-gray-200";
	if (disabled) {
		seatColor =
			"bg-gray-300 text-gray-400 cursor-not-allowed opacity-60 pointer-events-none";
	} else if (isSelected) {
		seatColor = "bg-gray-600 text-white";
	}
	return (
		<div
			role="button"
			tabIndex={disabled ? -1 : 0}
			onKeyDown={handleKeyDown}
			onClick={handleClick}
			className={` w-8 h-8 rounded ${seatColor} `}
			style={{
				left: `${(column - 1) * 2.5}rem`,
				top: `${(row - 1) * 2.5}rem`,
			}}
			aria-label={`seat ${section}`}
		/>
	);
}
