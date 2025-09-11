import { render, screen, fireEvent } from "@testing-library/react";
import selectSeatsAllData from "../../__mocks__/selectSeatsAllData.ts";
import SeatSelector from "../../reservation/SeatSelector.tsx";
import "@testing-library/jest-dom";
import { SeatWithState } from "../../../types/ApiDataTypes.ts";

describe("SeatSelector 컴포넌트", () => {
	const mockSeatList = selectSeatsAllData.data.seats;
	const seatListWithState: SeatWithState[] = mockSeatList.map((s) => ({
		...s,
		isLocked: false,
	}));
	it("섹션 카드가 렌더링, 섹션 별 사용 가능한 좌석 수가 표시된다. ", () => {
		render(
			<SeatSelector
				seatList={seatListWithState}
				selectedSeatIds={[]}
				onSelect={() => {}}
			/>
		);

		["A", "B", "C", "D", "E", "F"].forEach((sec) => {
			expect(
				screen.getByRole("button", {
					name: new RegExp(`SECTION\\s*${sec}`, "i"),
				})
			).toHaveTextContent(/100 seats/i);
		});
	});

	it("섹션 클릭 시, 모달이 열리고 해당 섹션 좌석이 렌더링, 사용 가능 좌석 클릭 시 onSelect가 호출된다.", () => {
		const onSelect = jest.fn();
		const customSeatList = seatListWithState.map((s) =>
			s.section === "A" && s.row === 1 && s.column === 2
				? { ...s, isLocked: true }
				: s
		);
		render(
			<SeatSelector
				seatList={customSeatList}
				selectedSeatIds={[]}
				onSelect={onSelect}
			/>
		);

		fireEvent.click(screen.getByRole("button", { name: /SECTION\s*A/i }));
		expect(screen.getByText("Section A")).toBeInTheDocument();

		const seatsInModal = screen.getAllByRole("button", { name: /^seat A$/i });
		expect(seatsInModal).toHaveLength(100);

		fireEvent.click(seatsInModal[0]);
		expect(onSelect).toHaveBeenCalledWith("A-1-1");

		onSelect.mockClear();
		fireEvent.click(seatsInModal[1]);
		expect(onSelect).not.toHaveBeenCalled();
	});

	it("선택한 좌석의 스타일이 변경된다.", () => {
		render(
			<SeatSelector
				seatList={seatListWithState}
				selectedSeatIds={["A-1-3"]}
				onSelect={() => {}}
			/>
		);

		fireEvent.click(screen.getByRole("button", { name: /SECTION\s*A/i }));
		expect(screen.getByText("Section A")).toBeInTheDocument();

		const seatsInModal = screen.getAllByRole("button", { name: /^seat A$/i });

		const btn = seatsInModal[2];
		expect(btn).toHaveClass("bg-gray-600");
		expect(btn).toHaveClass("text-white");
	});
});
