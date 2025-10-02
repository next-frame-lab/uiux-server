import { PerformanceData } from "../../types/ApiDataTypes.ts";
import perfImage from "../../assets/images/Performance1.gif";

const performanceData: PerformanceData = {
	code: "SUCCESS",
	data: {
		performances: Array.from({ length: 100 }).map((_, index) => ({
			id: `mock-${index + 1}`,
			name: `공연 이름-${index + 1}`,
			imageUrl: perfImage,
			type: "액션",
			genre: "대중음악",
			stadiumName: "올림픽공원",
			startDate: "20250228",
			endDate: "20250302",
			adultOnly: true,
		})),
	},
	pagination: {
		page: 0,
		size: 32,
		totalItems: 100,
		totalPages: 4,
		hasNext: true,
		hasPrevious: false,
	},
};

export default performanceData;
