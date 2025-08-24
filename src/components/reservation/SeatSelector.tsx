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
		<>
			<div className="grid grid-cols-3 gap-6 mt-10">
				{SECTIONS.map((sec) => (
					<div
						key={sec}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								setOpenSection(sec);
							}
						}}
						onClick={() => setOpenSection(sec)}
						aria-haspopup="dialog"
						aria-expanded={openSection === sec}
						className="rounded-xl border p-2 h-48 shadow-sm hover:shadow transition flex items-center justify-between">
						<div>
							<div className="text-xs text-gray-600">
								SECTION <span className="text-2xl font-semibold">{sec}</span>
							</div>
						</div>
						<div className="text-xs text-gray-500">
							{availableBySection[sec] ?? 0} seats
						</div>
					</div>
				))}
			</div>

			<SelectedSeatsInfo
				selectedSeatIds={selectedSeatIds}
				seatList={seatList}
			/>

			<SeatSectionModal
				open={openSection !== null}
				section={openSection}
				seats={currentSeats}
				selectedSeatIds={selectedSeatIds}
				onSelect={onSelect}
				onClose={() => setOpenSection(null)}
			/>
		</>
	);
}
