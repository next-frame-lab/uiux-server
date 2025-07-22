import { render, screen } from "@testing-library/react";
import selectSeatsAllData from "../../__mocks__/selectSeatsAllData.ts";
import Seat from "../../reservation/Seat.tsx";
import "@testing-library/jest-dom";

describe("Seat 컴포넌트", () => {
	const mockSeat = selectSeatsAllData;
	const mockClick = jest.fn();
	beforeEach(() => {
		render(
			<>
				{mockSeat.seatList.map((seat) => (
					<Seat
						key={seat.id}
						seat={seat}
						isSelected={false}
						onClick={mockClick}
					/>
				))}
			</>
		);
	});

	it("좌석 수가 정확히 렌더링된다.", () => {
		const buttons = screen.getAllByRole("button", { name: "seat" });
		expect(buttons).toHaveLength(mockSeat.seatList.length);
	});

	it("좌석 위치가 row, column에 따라 렌더링된다.", () => {
		const buttons = screen.getAllByRole("button", { name: "seat" });

		mockSeat.seatList.forEach((seat, index) => {
			const button = buttons[index];
			expect(button).toHaveStyle({
				left: `${seat.column * 2.5}rem`,
				top: `${seat.row * 2.5}rem`,
			});
		});
	});

	it("잠긴 좌석은 비활성화, bg-gray-300 스타일이 적용된다.", () => {
		const buttons = screen.getAllByRole("button", { name: "seat" });

		mockSeat.seatList.forEach((seat, index) => {
			if (seat.isLocked) {
				const button = buttons[index];
				expect(button).toBeDisabled();
				expect(button.className).toContain("bg-gray-300");
			}
		});
	});

	it("열린 좌석은 활성화, bg-gray-100 스타일이 적용된다.", () => {
		const buttons = screen.getAllByRole("button", { name: "seat" });

		mockSeat.seatList.forEach((seat, index) => {
			if (!seat.isLocked) {
				const button = buttons[index];
				expect(button).not.toBeDisabled();
				expect(button.className).toContain("bg-gray-100");
			}
		});
	});
});
