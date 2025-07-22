import { PerformanceData } from "../../types/ApiDataTypes.ts";

const performanceData: PerformanceData = {
	performanceList: [
		{
			id: "c8d1e2a7-4a5b-437b-9d90-7b1a2c3f1231",
			name: "j-hope Tour: HOPE ON THE STAGE [서울]",
			image: "/image/Performance_1.gif",
			type: "액션",
			genre: "대중음악",
			startDate: "20250228",
			endDate: "20250302",
			stadiumName: "올림픽공원",
			averageStar: 4.1,
			adultOnly: false,
		},
		{
			id: "c8d1e2a7-4a5b-437b-9d90-7b1a2c3f1232",
			name: "오페라 유령",
			image: "/image/Performance_2.gif",
			type: "호러",
			genre: "뮤지컬",
			startDate: "20250228",
			endDate: "20250302",
			stadiumName: "올림픽공원",
			averageStar: 4.3,
			adultOnly: true,
		},
	],
	pagination: {
		page: 0,
		size: 32,
		totalItems: 88,
		totalPages: 3,
		hasNext: true,
		hasPrevious: true,
	},
};

export default performanceData;
