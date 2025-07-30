import { render, screen } from "@testing-library/react";
import selectSeatsAllData from "../../__mocks__/selectSeatsAllData.ts";
import Seat from "../../reservation/Seat.tsx";
import "@testing-library/jest-dom";

describe("Seat 컴포넌트", () => {
	const mockSeat = selectSeatsAllData.data.seats;
	const mockClick = jest.fn();

	it("좌석 수가 정확히 렌더링된다.", () => {
		render(
			<>
				{mockSeat.map((seat) => (
					<Seat
						key={seat.id}
						seat={seat}
						isSelected={false}
						onClick={mockClick}
						disabled={false}
					/>
				))}
			</>
		);

		const buttons = screen.getAllByRole("button", { name: /seat/i });
		expect(buttons).toHaveLength(mockSeat.length);
	});

	it("좌석 위치가 row, column에 따라 렌더링된다.", () => {
		render(
			<>
				{mockSeat.map((seat) => (
					<Seat
						key={seat.id}
						seat={seat}
						isSelected={false}
						onClick={mockClick}
						disabled={false}
					/>
				))}
			</>
		);
		const buttons = screen.getAllByRole("button", { name: /seat/i });

		mockSeat.forEach((seat, index) => {
			const button = buttons[index];
			expect(button).toHaveStyle({
				left: `${(seat.column - 1) * 2.5}rem`,
				top: `${(seat.row - 1) * 2.5}rem`,
			});
		});
	});
});
