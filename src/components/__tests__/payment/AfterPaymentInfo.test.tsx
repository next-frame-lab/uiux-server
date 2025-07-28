import { useNavigate } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AfterPaymentInfo from "../../payment/AfterPaymentInfo.tsx";
import afterPaymentInfoData from "../../__mocks__/AfterPaymentInfoData.ts";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
}));

describe("AfterPaymentInfo", () => {
	const mockNavigate = jest.fn();

	beforeEach(() => {
		(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("결제 정보가 올바르게 렌더링된다.", () => {
		render(<AfterPaymentInfo />);

		expect(screen.getByText("결제 성공!")).toBeInTheDocument();
		expect(
			screen.getByText(`공연명: ${afterPaymentInfoData.performance.name}`)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				`공연 선택 일정: ${afterPaymentInfoData.performance.scheduleDate}`
			)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				`공연 선택 시간: ${afterPaymentInfoData.performance.scheduleTime}`
			)
		).toBeInTheDocument();
	});

	it("좌석 정보가 정확힌 렌더링되어야 한다.", () => {
		render(<AfterPaymentInfo />);

		afterPaymentInfoData.seats.forEach((seat) => {
			expect(
				screen.getByText(`${seat.row}열 - ${seat.column}번`)
			).toBeInTheDocument();
		});
	});

	it("확인하기 버튼을 클릭하면, /mypage/reservations 경로로 이동해야 한다.", () => {
		render(<AfterPaymentInfo />);

		const button = screen.getByRole("button", { name: "확인하기" });
		fireEvent.click(button);

		expect(mockNavigate).toHaveBeenCalledWith("/mypage/reservation");
	});
});
