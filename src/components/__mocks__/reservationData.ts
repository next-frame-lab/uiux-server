import { reservationData } from "../../types/ApiDataTypes.ts";

const reservationData: reservationData = {
	code: "SUCCESS",
	reservationId: "21c9b168-8575-487b-add2-67db7365ef78",
	performance: {
		name: "햄릿",
		scheduleDate: "2025-07-15",
		scheduleTime: "19:30",
	},
	seats: [
		{
			section: "A",
			row: 1,
			column: 12,
		},
		{
			section: "A",
			row: 1,
			column: 13,
		},
	],
	totalAmount: 480000,
};

export default reservationData;
