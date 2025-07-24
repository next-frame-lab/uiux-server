import { renderHook, act } from "@testing-library/react";
import useElapsedTime from "../useElapsedTime.ts";

describe("useElapsedTime 훅", () => {
	beforeEach(() => {
		jest.useFakeTimers();
		jest.setSystemTime(new Date("2025-01-01T00:00:00.000Z"));
	});

	afterEach(() => {
		jest.clearAllTimers();
		jest.useRealTimers();
	});

	it("초기 elapsedTime은 0이다", () => {
		const { result } = renderHook(() => useElapsedTime());
		expect(result.current).toBe(0);
	});

	it("1초마다 elapsedTime이 증가한다", () => {
		const { result } = renderHook(() => useElapsedTime());

		act(() => {
			jest.advanceTimersByTime(1000);
		});
		expect(result.current).toBe(1);

		act(() => {
			jest.advanceTimersByTime(1000);
		});
		expect(result.current).toBe(2);
	});

	it("언마운트 시, clearInterval이 호출된다", () => {
		const clearSpy = jest.spyOn(window, "clearInterval");

		const { unmount } = renderHook(() => useElapsedTime());
		unmount();

		expect(clearSpy).toHaveBeenCalled();
	});
});
