import { render, screen, fireEvent } from "@testing-library/react";
import * as elapsedTimeHook from "../../../hooks/useElapsedTime.ts";
import beforePaymentInfoData from "../../__mocks__/BeforePaymentInfoData.ts";
import ReservationInfo from "../../reservation/ReservationInfo.tsx";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
}));

jest.mock("../../../hooks/useElapsedTime.ts", () => ({
	__esModule: true,
	default: jest.fn(),
}));

describe("BeforePaymentInfo", () => {
	beforeEach(() => {
		(elapsedTimeHook.default as jest.Mock).mockReturnValue(1);
	});

	it("공연 및 결제 정보가 정상적으로 렌더링된다.", () => {
		render(<ReservationInfo />);

		expect(screen.getByText("결제 정보")).toBeInTheDocument();
		expect(
			screen.getByText(`공연명: ${beforePaymentInfoData.performance.name}`)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				`공연 선택 일정: ${beforePaymentInfoData.performance.scheduleDate}`
			)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				`공연 선택 시간: ${beforePaymentInfoData.performance.scheduleTime}`
			)
		).toBeInTheDocument();
		expect(
			screen.getByText(`총 결제 금액: ${beforePaymentInfoData.totalAmount}`)
		).toBeInTheDocument();
	});

	it("좌석 정보가 정확히 렌더링된다.", () => {
		render(<ReservationInfo />);

		beforePaymentInfoData.seats.forEach((seat) => {
			expect(
				screen.getByText(`${seat.row}열 - ${seat.column}번`)
			).toBeInTheDocument();
		});
	});

	it("결제하기 버튼이 렌더링된다.", () => {
		render(<ReservationInfo />);

		expect(
			screen.getByRole("button", { name: "결제하기" })
		).toBeInTheDocument();
	});

	it("결제 방식 선택 없이, 결제 시도하면, 경고가 출력된다.", () => {
		const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
		render(<ReservationInfo />);

		const button = screen.getByRole("button", { name: "결제하기" });

		fireEvent.click(button);

		expect(alertMock).toHaveBeenCalledWith("결제 방식을 선택해주세요.");

		alertMock.mockRestore();
	});
});
