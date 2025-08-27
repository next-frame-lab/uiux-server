import { BeforePaymentInfoData } from "../../types/ApiDataTypes.ts";

const beforePaymentInfoData: BeforePaymentInfoData = {
	performance: {
		name: "오페라 유령",
		scheduleDate: "2025-02-28",
		scheduleTime: "19:00",
	},
	seats: [
		{ section: "A", row: 1, column: 12 },
		{ section: "A", row: 1, column: 13 },
	],
	totalAmount: 240000,
};

export default beforePaymentInfoData;
