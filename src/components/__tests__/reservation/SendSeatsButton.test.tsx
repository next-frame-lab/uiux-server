import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import sendSeatsData from "../../__mocks__/sendSeatsData.ts";
import SendSeatsButton from "../../reservation/SendSeatsButton.tsx";
import useElapsedTime from "../../../hooks/useElapsedTime.ts";
import "@testing-library/jest-dom";
import fetchPostReservation from "../../../api/reservation.ts";

// useNavigate mocking
const navigateMock = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => navigateMock,
}));

jest.mock("../../../hooks/useElapsedTime.ts", () => ({
	__esModule: true,
	default: jest.fn(),
}));

const mockedUseElapsedTime = useElapsedTime as jest.Mock;

jest.mock("../../../api/reservation.ts", () => ({
	__esModule: true,
	default: jest.fn().mockReturnValue({ id: "reservation-1" }),
}));

describe("SendSeatsButton 컴포넌트", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("elapsedTime가 600초 이하일 때, 정상 동작한다", async () => {
		const data = sendSeatsData;
		mockedUseElapsedTime.mockReturnValue(data.elapsedTime);

		render(
			<MemoryRouter>
				<SendSeatsButton
					performanceId={data.performanceId}
					scheduleId={data.scheduleId}
					seatIds={data.seatIds}
					totalAmount={300000}
				/>
			</MemoryRouter>
		);

		fireEvent.click(screen.getByTestId("send-seats-button"));

		await waitFor(() => expect(fetchPostReservation).toHaveBeenCalledTimes(1));
		expect(navigateMock).toHaveBeenCalledWith(
			"/payments",
			expect.objectContaining({
				state: { reservation: expect.any(Object) },
			})
		);
	});

	it("elapsedTime가 600초 초과일 때, 넘어가지 않는다", () => {
		const data = sendSeatsData;
		mockedUseElapsedTime.mockReturnValue(601);

		render(
			<MemoryRouter>
				<SendSeatsButton
					performanceId={data.performanceId}
					scheduleId={data.scheduleId}
					seatIds={data.seatIds}
					totalAmount={300000}
				/>
			</MemoryRouter>
		);

		fireEvent.click(screen.getByTestId("send-seats-button"));
		expect(fetchPostReservation).not.toHaveBeenCalled();
		expect(navigateMock).not.toHaveBeenCalled();
	});
});
