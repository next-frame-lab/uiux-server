import ScheduleCalendar from "./ScheduleCalendar.tsx";
import {
	scheduleList,
	seatPrices as SeatPricesTypes,
} from "../../types/ApiDataTypes.ts";

interface ReservationInfoProps {
	performanceSchedules: scheduleList[];
	scheduleId: string;
	seatPrices: SeatPricesTypes[];
}

export default function ReservationInfo({
	performanceSchedules,
	scheduleId,
	seatPrices,
}: ReservationInfoProps) {
	const schedule = performanceSchedules.find((s) => s.id === scheduleId);

	if (!schedule) {
		return <p>스케줄 ID가 일치하지 않습니다. 잘못된 접근입니다.</p>;
	}

	if (!schedule) {
		return <p>스케줄 ID가 일치하지 않습니다. 잘못된 접근입니다.</p>;
	}

	return (
		<>
			<section>
				<h3 className="text-lg font-bold">공연 일정</h3>
				<ScheduleCalendar selectedSchedule={schedule} />
			</section>
			<section className="mt-8 border-t border-gray-200 pt-6">
				<h3 className="text-lg font-bold">관람 선택 시간</h3>
				<div className="mt-4">
					<div className="flex w-full items-center gap-x-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-left">
						<div className="flex h-4 w-4 items-center justify-center rounded-full border border-blue-600">
							<div className="h-2 w-2 rounded-full bg-blue-600" />
						</div>
						<span className="font-semibold text-blue-800">
							{schedule.date} {schedule.time}
						</span>
					</div>
				</div>
			</section>
			<section className="mt-8 border-t border-gray-200 pt-6">
				<h3 className="text-lg font-bold">좌석 가격 안내</h3>
				<div className="mt-4 grid grid-cols-2 gap-4">
					{seatPrices?.map((seat) => (
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
