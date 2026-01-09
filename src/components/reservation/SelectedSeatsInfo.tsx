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
		<div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
			<div className="flex items-center gap-2 mb-3">
				<svg
					className="w-5 h-5 text-blue-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M5 13l4 4L19 7"
					/>
				</svg>
				<span className="text-sm font-semibold text-gray-900">선택 좌석</span>
				<span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 text-xs font-bold text-white bg-blue-600 rounded-full">
					{selectedSeats.length}
				</span>
			</div>

			{selectedSeats.length === 0 ? (
				<div className="flex flex-col items-center justify-center text-center">
					<svg
						className="w-12 h-12 text-gray-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
						/>
					</svg>
					<p className="text-sm font-medium text-gray-600">
						선택된 좌석이 없습니다
					</p>
					<p className="text-xs text-gray-400 mt-1">
						원하시는 좌석을 선택해주세요
					</p>
				</div>
			) : (
				<div className="flex flex-wrap gap-4 py-[26px]">
					{selectedSeats.map((s) => (
						<span
							key={s.id}
							className="inline-flex items-center gap-2 bg-white rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm"
							title={formatSeat(s)}>
							<div className="w-2 h-2 bg-blue-600 rounded-full" />
							{formatSeat(s)}
						</span>
					))}
				</div>
			)}
		</div>
	);
}
