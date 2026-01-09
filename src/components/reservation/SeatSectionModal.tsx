import { SeatWithState } from "../../types/ApiDataTypes.ts";
import Seat from "./Seat.tsx";

interface SeatSectionModalProps {
	open: boolean;
	section: "A" | "B" | "C" | "D" | "E" | "F" | null;
	seats: SeatWithState[];
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

	const renderSeat = (seat: SeatWithState) => {
		const locked = seat.isLocked;
		const selected = selectedSeatIds.includes(seat.id);

		const handleClick = () => {
			if (locked) return;
			onSelect(seat.id);
		};

		return (
			<Seat
				key={seat.id}
				seat={seat}
				isSelected={selected}
				onClick={handleClick}
				disabled={locked}
			/>
		);
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Escape") onClose();
			}}
			className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
			onMouseDown={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}>
			<div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
				{/* 헤더 */}
				<div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
							<span className="text-2xl font-bold">{section}</span>
						</div>
						<div>
							<h2 className="text-xl font-bold">Section {section}</h2>
							<p className="text-sm text-blue-100">
								원하시는 좌석을 선택해주세요
							</p>
						</div>
					</div>
					<button
						type="button"
						aria-label="닫기"
						onClick={onClose}
						className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* 범례 */}
				<div className="flex items-center justify-center gap-6 px-6 py-4 bg-gray-50 border-b border-gray-200">
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-gray-300 rounded" />
						<span className="text-sm text-gray-700 font-medium">선택 가능</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-red-600 rounded" />
						<span className="text-sm text-gray-700 font-medium">선택 불가</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-green-600 rounded" />
						<span className="text-sm text-gray-700 font-medium">선택됨</span>
					</div>
				</div>

				{/* 좌석 그리드 */}
				<div className="p-6 overflow-auto max-h-[60vh]">
					<div className="flex justify-center">
						<div className="inline-grid gap-2 [grid-template-columns:repeat(20,2.5rem)] [grid-auto-rows:2.5rem]">
							{seats.map(renderSeat)}
						</div>
					</div>
				</div>

				{/* 푸터 */}
				<div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
					<p className="text-sm text-gray-600">
						<span className="font-semibold text-gray-900">
							{selectedSeatIds.length}석
						</span>{" "}
						선택됨
					</p>
					<button
						type="button"
						onClick={onClose}
						className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
						확인
					</button>
				</div>
			</div>
		</div>
	);
}
