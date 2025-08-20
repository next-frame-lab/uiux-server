import { scheduleList } from "../../types/ApiDataTypes.ts";
import performanceDetail from "../__mocks__/performanceDetailData.ts";
import { getDaysInMonth, parseYMD } from "../../utils/SperateDateAndTime.ts";

export default function ReservationPerformanceInfo() {
	// TODO: 지금은 고정 값을 사용, 추후 PerformanceDetail의 예매하기 버튼을 통해 peformanceId, scheduleId 넘겨주기
	const performanceId = "mock-1";
	const scheduleId = "1a2b3c4d-5e6f-7890-abcd-1234567890ef";

	if (performanceDetail.id !== performanceId) {
		return <p>공연 ID가 일치하지 않습니다. 잘못된 접근입니다.</p>;
	}

	const schedule: scheduleList | undefined =
		performanceDetail.scheduleList.find((s) => s.id === scheduleId);

	if (!schedule) {
		return <p>스케줄 ID가 일치하지 않습니다. 잘못된 접근입니다.</p>;
	}

	const selected =
		performanceDetail.scheduleList.find((s) => s.id === scheduleId) ??
		performanceDetail.scheduleList[0];

	const { y, m, d: selectedDay } = parseYMD(selected.date);

	const firstWeekDay = new Date(y, m - 1, 1).getDay();
	const dim = getDaysInMonth(y, m);

	const dayCells: React.ReactElement[] = [];
	const prevM = m === 1 ? 12 : m - 1;
	const prevY = m === 1 ? y - 1 : y;
	const prevDim = getDaysInMonth(prevY, prevM);

	const leadingDays = Array.from(
		{ length: firstWeekDay },
		(_, i) => prevDim - firstWeekDay + 1 + i
	);
	leadingDays.forEach((day) => {
		dayCells.push(
			<p key={`empty-${prevY}-${prevM}-${day}`} className="my-1" />
		);
	});

	const dateItems = Array.from({ length: dim }).map((_, i) => {
		const day = i + 1;
		const isSelected = day === selectedDay;

		return (
			<p key={`d-${y}-${m}-${day}`} className="py-1">
				{isSelected ? (
					<span
						className={
							isSelected
								? `mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-white`
								: `mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-white`
						}>
						{day}
					</span>
				) : (
					day
				)}
			</p>
		);
	});

	dayCells.push(...dateItems);

	return (
		<>
			<section>
				<h3 className="text-lg font-bold">공연 일정</h3>
				<div className="mt-4">
					<div className="flex items-center justify-between">
						<span className="rounded-full p-1 hover:bg-gray-200">
							{/* 왼쪽 화살표 아이콘 */}
							<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" />
							</svg>
						</span>
						<p className="font-semibold">
							{m}월 {y}
						</p>
						<span className="rounded-full p-1 hover:bg-gray-200">
							{/* 오른쪽 화살표 아이콘 */}
							<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
							</svg>
						</span>
					</div>
					{/* 요일 */}
					<div className="mt-4 grid grid-cols-7 text-center text-sm font-medium text-gray-500">
						<p>S</p>
						<p>M</p>
						<p>T</p>
						<p>W</p>
						<p>T</p>
						<p>F</p>
						<p>S</p>
					</div>
					{/* 날짜 */}
					<div className="mt-2 grid grid-cols-7 text-center text-sm">
						{dayCells}
					</div>
				</div>
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
					{performanceDetail.seatPrices.map((seat) => (
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
