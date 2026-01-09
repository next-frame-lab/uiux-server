import { useMemo, useState } from "react";
import { SeatWithState } from "../../types/ApiDataTypes.ts";
import SeatSectionModal from "./SeatSectionModal.tsx";
import SelectedSeatsInfo from "./SelectedSeatsInfo.tsx";

interface SeatSelectorProps {
	seatList: SeatWithState[];
	selectedSeatIds: string[];
	onSelect: (seatId: string) => void;
}

const SECTIONS = ["A", "B", "C", "D", "E", "F"] as const;
type Section = (typeof SECTIONS)[number];

export default function SeatSelector({
	seatList,
	selectedSeatIds,
	onSelect,
}: SeatSelectorProps) {
	const [openSection, setOpenSection] = useState<Section | null>(null);

	const availableBySection = useMemo(() => {
		return SECTIONS.reduce<Record<Section, number>>(
			(acc, sec) => {
				acc[sec] = seatList.filter(
					(s) => s.section === sec && !s.isLocked
				).length;
				return acc;
			},
			{} as Record<Section, number>
		);
	}, [seatList]);

	const currentSeats = openSection
		? seatList.filter((s) => s.section === openSection)
		: [];

	return (
		<div className="space-y-6 mt-4">
			{/* 섹션 선택 */}
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{SECTIONS.map((sec) => (
					<button
						key={sec}
						type="button"
						onClick={() => setOpenSection(sec)}
						className="group relative bg-white rounded-2xl border-2 border-gray-200 p-6 h-40 shadow-md hover:shadow-xl hover:border-blue-500 transition-all duration-300 hover:-translate-y-1">
						{/* 섹션 라벨 */}
						<div className="flex flex-col h-full justify-between">
							<div>
								<div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
									SECTION
								</div>
								<div className="text-5xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
									{sec}
								</div>
							</div>

							{/* 잔여 좌석 */}
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<svg
										className="w-5 h-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
									<span className="text-sm font-medium text-gray-600">
										{availableBySection[sec] ?? 0}석 남음
									</span>
								</div>

								{/* 화살표 아이콘 */}
								<svg
									className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</div>
						</div>

						{/* 선택 불가능 표시 */}
						{(availableBySection[sec] ?? 0) === 0 && (
							<div className="absolute inset-0 bg-gray-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
								<span className="text-gray-500 font-semibold">매진</span>
							</div>
						)}
					</button>
				))}
			</div>

			{/* 선택된 좌석 정보 */}
			<SelectedSeatsInfo
				selectedSeatIds={selectedSeatIds}
				seatList={seatList}
			/>

			{/* 좌석 상세 선택 모달 */}
			<SeatSectionModal
				open={openSection !== null}
				section={openSection}
				seats={currentSeats}
				selectedSeatIds={selectedSeatIds}
				onSelect={onSelect}
				onClose={() => setOpenSection(null)}
			/>
		</div>
	);
}
