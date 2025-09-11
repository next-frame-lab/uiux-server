import { act, renderHook } from "@testing-library/react";
import useSeatReservation from "../useSeatReservation.ts";
import selectSeatsAllData from "../../components/__mocks__/selectSeatsAllData.ts";

describe("useSeatReservation", () => {
	const mockSeat = selectSeatsAllData;

	it("좌석 선택 및 해제를 정상적으로 수행한다", () => {
		const { result } = renderHook(() => useSeatReservation());
		const seat = mockSeat.data.seats[1];

		// 선택
		act(() => {
			result.current.toggleSeat(seat);
		});
		expect(result.current.selectedSeats).toHaveLength(1);
		expect(result.current.selectedSeatIds).toContain("A-1-2");

		// 해제
		act(() => {
			result.current.toggleSeat(seat);
		});
		expect(result.current.selectedSeats).toHaveLength(0);
	});

	it("최대 4개까지만 선택 가능하고 초과 시 alert 호출", () => {
		const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
		const { result } = renderHook(() => useSeatReservation());

		act(() => result.current.toggleSeat(mockSeat.data.seats[1]));
		act(() => result.current.toggleSeat(mockSeat.data.seats[2]));
		act(() => result.current.toggleSeat(mockSeat.data.seats[4]));
		act(() => result.current.toggleSeat(mockSeat.data.seats[5]));
		act(() => result.current.toggleSeat(mockSeat.data.seats[6]));

		expect(result.current.selectedSeats).toHaveLength(4);
		expect(alertSpy).toHaveBeenCalledWith(
			"최대 4개 좌석까지만 선택할 수 있습니다."
		);

		alertSpy.mockRestore();
	});

	it("resetSelection 호출 시 선택된 좌석이 초기화된다", () => {
		const { result } = renderHook(() => useSeatReservation());

		act(() => {
			result.current.toggleSeat(mockSeat.data.seats[1]);
			result.current.toggleSeat(mockSeat.data.seats[3]);
			result.current.resetSelection();
		});

		expect(result.current.selectedSeats).toHaveLength(0);
		expect(result.current.selectedSeatIds).toHaveLength(0);
	});
});
