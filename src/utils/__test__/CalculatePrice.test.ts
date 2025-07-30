import selectSeatsAllData from "../../components/__mocks__/selectSeatsAllData.ts";
import calculateTotalPrice from "../CalculatePrice.ts";
import performanceDetail from "../../components/__mocks__/performanceDetailData.ts";
import "@testing-library/jest-dom";

describe("TotalDisplay 유틸 함수", () => {
	it("선택된 좌석들의 가격을 정확히 계산하여 렌더링한다.", () => {
		const selectedSeats = selectSeatsAllData.data.seats.filter((seat) =>
			["A-1-1", "A-1-2", "A-1-3", "A-1-4"].includes(seat.id)
		);

		const total = calculateTotalPrice(
			selectedSeats,
			performanceDetail.data.seatSectionPrices
		);
		expect(total).toBe(480000);
	});

	it("선택된 좌석이 없으면, 총 0원을 렌더링한다.", () => {
		const selectedSeats = selectSeatsAllData.data.seats.filter(() => false);

		const total = calculateTotalPrice(
			selectedSeats,
			performanceDetail.data.seatSectionPrices
		);
		expect(total).toBe(0);
	});
});
