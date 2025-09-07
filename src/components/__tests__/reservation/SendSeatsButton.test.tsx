import { render, screen, fireEvent } from "@testing-library/react";
import sendSeatsData from "../../__mocks__/sendSeatsData.ts";
import SendSeatsButton from "../../reservation/SendSeatsButton.tsx";
import useElapsedTime from "../../../hooks/useElapsedTime.ts";
import "@testing-library/jest-dom";

jest.mock("../../../hooks/useElapsedTime.ts", () => ({
	__esModule: true,
	default: jest.fn(),
}));

const mockedUseElapsedTime = useElapsedTime as jest.Mock;

describe("SendSeatsButton 컴포넌트", () => {
	const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("elapsedTime가 600초 이하일 때, 정상 동작한다", () => {
		const data = sendSeatsData;
		mockedUseElapsedTime.mockReturnValue(data.elapsedTime);

		render(
			<SendSeatsButton
				performanceId={data.performanceId}
				scheduleId={data.scheduleId}
				seatIds={data.seatIds}
				totalAmount={300000}
			/>
		);

		fireEvent.click(screen.getByTestId("send-seats-button"));
		expect(logSpy).toHaveBeenCalled();
	});

	it("elapsedTime가 600초 초과일 때, 넘어가지 않는다", () => {
		const data = sendSeatsData;
		mockedUseElapsedTime.mockReturnValue(data.elapsedTime);

		render(
			<SendSeatsButton
				performanceId={data.performanceId}
				scheduleId={data.scheduleId}
				seatIds={data.seatIds}
				totalAmount={300000}
			/>
		);

		fireEvent.click(screen.getByTestId("send-seats-button"));
		expect(logSpy).not.toHaveBeenCalled();
	});
});
