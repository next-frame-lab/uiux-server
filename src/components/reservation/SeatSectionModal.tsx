import { seatData } from "../../types/ApiDataTypes.ts";
import Seat from "./Seat.tsx";

interface SeatSectionModalProps {
	open: boolean;
	section: "A" | "B" | "C" | "D" | "E" | "F" | null;
	seats: seatData[];
	selectedSeatIds: string[];
	onSelect: (seatId: string) => void;
	onClose: () => void;
}

export default function SeatSectionModal({
	open,
	section,
	seats,
	selectedSeatIds,
	onSelect,
	onClose,
}: SeatSectionModalProps) {
	if (!open || !section) return null;

	return (
		<div
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Escape") onClose();
			}}
			className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
			onMouseDown={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}>
			<div className="w-full max-w-4xl rounded-2xl bg-white p-4 shadow-2xl">
				<div className="flex items-center justify-between border-b pb-3">
					<h2 className="text-lg">Section {section}</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-md border px-3 py-1 text-sm">
						닫기
					</button>
				</div>

				<div className="mt-4 justify-center inline-grid gap-1 [grid-template-columns:repeat(20,2rem)] [grid-auto-rows:2rem]">
					{seats.map((seat) => (
						<Seat
							key={seat.id}
							seat={seat}
							isSelected={selectedSeatIds.includes(seat.id)}
							onClick={onSelect}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
