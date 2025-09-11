import { useLocation } from "react-router-dom";
import { scheduleList } from "../../types/ApiDataTypes.ts";
import performanceDetail from "../__mocks__/performanceDetailData.ts";
import ScheduleCalendar from "./ScheduleCalendar.tsx";

type StateProps = {
	performanceId: string;
	scheduleId: string;
	seatPrices: { section: string; price: number }[];
};

export default function ReservationInfo() {
	const location = useLocation();
	const state = (location.state ?? {}) as Partial<StateProps>;

	if (performanceDetail.data.id !== state.performanceId) {
		return <p>공연 ID가 일치하지 않습니다. 잘못된 접근입니다.</p>;
	}

	const schedule: scheduleList | undefined =
		performanceDetail.data.performanceSchedules.find(
			(s) => s.id === state.scheduleId
		);

	if (!schedule) {
		return <p>스케줄 ID가 일치하지 않습니다. 잘못된 접근입니다.</p>;
	}

	const selected =
		performanceDetail.data.performanceSchedules.find(
			(s) => s.id === state.scheduleId
		) ?? performanceDetail.data.performanceSchedules[0];

	return (
		<>
			<section>
				<h3 className="text-lg font-bold">공연 일정</h3>
				<ScheduleCalendar selectedSchedule={selected} />
			</section>
			<section className="mt-8 border-t border-gray-200 pt-6">
				<h3 className="text-lg font-bold">관람 선택 시간</h3>
				<div className="mt-4">
					<div className="flex w-full items-center gap-x-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-left">
						<div className="flex h-4 w-4 items-center justify-center rounded-full border border-blue-600">
							<div className="h-2 w-2 rounded-full bg-blue-600" />
						</div>
						<span className="font-semibold text-blue-800">{selected.time}</span>
					</div>
				</div>
			</section>
			<section className="mt-8 border-t border-gray-200 pt-6">
				<h3 className="text-lg font-bold">좌석 가격 안내</h3>
				<div className="mt-4 grid grid-cols-2 gap-4">
					{performanceDetail.data.seatSectionPrices.map((seat) => (
						<div key={seat.section}>
							<p className="text-sm text-gray-500">{seat.section}석</p>
							<p className="font-semibold">{seat.price.toLocaleString()}원</p>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
