import { render, screen, fireEvent } from "@testing-library/react";
import selectSeatsAllData from "../../__mocks__/selectSeatsAllData.ts";
import SeatSelector from "../../reservation/SeatSelector.tsx";
import "@testing-library/jest-dom";
import { SeatWithState } from "../../../types/ApiDataTypes.ts";

describe("SeatSelector 컴포넌트", () => {
	const mockSeatList = selectSeatsAllData;
	const seatListWithState: SeatWithState[] = mockSeatList.data.seats.map(
		(s) => ({
			...s,
			isLocked: false, // 초기값. 필요 시 서버/비즈 규칙으로 세팅
		})
	);

	it("seatList만큼 Seat 컴포넌트를 렌더링한다.", () => {
		render(
			<SeatSelector
				seatList={seatListWithState}
				selectedSeatIds={[]}
				onSelect={() => {}}
			/>
		);

		const buttons = screen.getAllByRole("button", { name: "seat" });
		expect(buttons).toHaveLength(mockSeatList.data.seats.length);
	});

	it("selectedSeatIds에 포함된 좌석만 isSelected 상태로 렌더링된다.", () => {
		render(
			<SeatSelector
				seatList={seatListWithState}
				selectedSeatIds={["3fa85f64-5717-4562-b3fc-2c963f66afa2"]}
				onSelect={() => {}}
			/>
		);
		const buttons = screen.getAllByRole("button", { name: "seat" });

		expect(buttons[0].className).toContain("bg-gray-300");
		expect(buttons[1].className).toContain("bg-gray-100");
		expect(buttons[2].className).toContain("bg-gray-600");
	});

	it("좌석 클릭 시, onSelect 콜백이 seat.id로 호출된다.", () => {
		const mockSelect = jest.fn();

		render(
			<SeatSelector
				seatList={seatListWithState}
				selectedSeatIds={[]}
				onSelect={mockSelect}
			/>
		);

		const buttons = screen.getAllByRole("button", { name: "seat" });

		// 잠기지 않은 좌석을 클릭
		fireEvent.click(buttons[2]);
		expect(mockSelect).toHaveBeenCalledWith(
			"3fa85f64-5717-4562-b3fc-2c963f66afa2"
		);

		// 잠긴 좌석 클릭
		fireEvent.click(buttons[0]);
		expect(mockSelect).not.toHaveBeenCalledWith(
			"3fa85f64-5717-4562-b3fc-2c963f66afa0"
		);
	});
});
