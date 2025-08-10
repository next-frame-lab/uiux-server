import { PerformanceData } from "../../types/ApiDataTypes.ts";
import perfImage from "../../assets/images/Performance1.gif";

const performanceData: PerformanceData = {
	performanceList: Array.from({ length: 40 }).map((_, index) => ({
		id: `mock-${index + 1}`,
		name: `공연 이름-${index + 1}`,
		image: perfImage,
		type: "액션",
		genre: "대중음악",
		startDate: "20250228",
		endDate: "20250302",
		stadiumName: "올림픽공원",
		averageStar: 4.1,
		adultOnly: false,
	})),
	pagination: {
		page: 1,
		size: 10,
		totalItems: 40,
		totalPages: 4,
		hasNext: true,
		hasPrevious: false,
	},
};

export default performanceData;
