import { reservationData } from "../../types/ApiDataTypes.ts";

const reservationData: reservationData = {
	id: "acbd1234-5678-9abc-def0-112233445566",
	performance: {
		name: "햄릿",
		scheduleDate: "2025-07-15",
		scheduleTime: "19:30",
	},
	stadium: {
		name: "대전월드컵경기장",
		address: "대전광역시 유성구",
	},
	seatList: [
		{
			section: "A",
			row: 1,
			column: 1,
		},
		{
			section: "A",
			row: 1,
			column: 12,
		},
	],
};

export default reservationData;
