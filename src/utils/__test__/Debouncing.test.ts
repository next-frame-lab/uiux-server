import Debouncing from "../Debouncing.ts";
import "@testing-library/jest-dom";

jest.useFakeTimers();

describe("Debouncing", () => {
	it("첫 호출은 실행된다.", () => {
		const mockFn = jest.fn();
		const debounced = Debouncing(mockFn, 1000);

		debounced("first call");
		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith("first call");
	});

	it("여러 번 호출 시, 마지막 호출만 실행된다", () => {
		const mockFn = jest.fn();
		const debounced = Debouncing(mockFn, 1000);

		debounced("first call"); // 0ms
		jest.advanceTimersByTime(500);
		debounced("second call"); // 500ms
		jest.advanceTimersByTime(500); // 1000ms -> 타이머 초기화
		debounced("third call"); // 1000ms

		expect(mockFn).toHaveBeenCalledTimes(1);

		jest.advanceTimersByTime(1100);

		debounced("forth call");
		expect(mockFn).toHaveBeenCalledTimes(2);
		expect(mockFn).toHaveBeenCalledWith("forth call");
	});
});
