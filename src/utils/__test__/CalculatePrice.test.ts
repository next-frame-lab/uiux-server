import selectSeatsAllData from "../../components/__mocks__/selectSeatsAllData.ts";
import calculateTotalPrice from "../CalculatePrice.ts";
import performanceDetail from "../../components/__mocks__/performanceDetailData.ts";
import "@testing-library/jest-dom";

describe("TotalDisplay 유틸 함수", () => {
	it("선택된 좌석들의 가격을 정확히 계산하여 렌더링한다.", () => {
		const selectedSeats = selectSeatsAllData.seats.filter((seat) =>
			[
				"3fa85f64-5717-4562-b3fc-2c963f66afa4",
				"3fa85f64-5717-4562-b3fc-2c963f66afa5",
				"3fa85f64-5717-4562-b3fc-2c963f66afa1",
				"3fa85f64-5717-4562-b3fc-2c963f66afa7",
			].includes(seat.id)
		);

		const total = calculateTotalPrice(
			selectedSeats,
			performanceDetail.seatPrices
		);
		expect(total).toBe(420000);
	});

	it("선택된 좌석이 없으면, 총 0원을 렌더링한다.", () => {
		const selectedSeats = selectSeatsAllData.seats.filter(() => false);

		const total = calculateTotalPrice(
			selectedSeats,
			performanceDetail.seatPrices
		);
		expect(total).toBe(0);
	});
});
