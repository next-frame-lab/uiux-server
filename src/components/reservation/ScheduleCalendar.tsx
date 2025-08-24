import { getDaysInMonth, parseYMD } from "../../utils/SeparateDateAndTime.ts";
import { scheduleList } from "../../types/ApiDataTypes.ts";

interface ScheduleCalendarProps {
	selectedSchedule: scheduleList;
}

export default function ScheduleCalendar({
	selectedSchedule,
}: ScheduleCalendarProps) {
	const { y, m, d: selectedDay } = parseYMD(selectedSchedule.date);

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
	);
}
