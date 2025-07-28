import { AfterPaymentInfoData } from "../../types/ApiDataTypes.ts";

const afterPaymentInfoData: AfterPaymentInfoData = {
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
};

export default afterPaymentInfoData;
