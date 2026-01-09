import { scheduleList } from "../types/ApiDataTypes.ts";

const scheduleRange = (schedules: scheduleList[]): string => {
	const dates = schedules.map((s) => s.date).sort();

	if (dates.length === 0) return "";
	if (dates.length === 1) return dates[0];

	return `${dates[0]} ~ ${dates[dates.length - 1]}`;
};

export default scheduleRange;
