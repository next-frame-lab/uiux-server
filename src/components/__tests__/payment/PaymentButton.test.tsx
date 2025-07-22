import { useNavigate } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentButton from "../../payment/PaymentButton.tsx";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
}));

describe("PaymentButton 컴포넌트", () => {
	const navigateMock = jest.fn();

	beforeEach(() => {
		(navigateMock as jest.Mock).mockClear();
		(useNavigate as jest.Mock).mockReturnValue(navigateMock);
	});

	it("결제 시간 초과 시, 경고를 출력하고, /reservation으로 이동한다.", () => {
		const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

		render(<PaymentButton paymentMethod="kakao" elapsedTime={601} />);

		const button = screen.getByRole("button", { name: "결제하기" });
		fireEvent.click(button);

		expect(alertMock).toHaveBeenCalledWith(
			"결제 시간이 초과되었습니다. 처음부터 다시 시도해주세요."
		);
		expect(navigateMock).toHaveBeenCalledWith("/reservation");

		alertMock.mockRestore();
	});

	it("결제 방식이 없으면, 경고를 출력한다.", () => {
		const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

		render(<PaymentButton paymentMethod="" elapsedTime={100} />);

		const button = screen.getByRole("button", { name: "결제하기" });
		fireEvent.click(button);

		expect(alertMock).toHaveBeenCalledWith("결제 방식을 선택해주세요.");
		expect(navigateMock).not.toHaveBeenCalled();

		alertMock.mockRestore();
	});

	it("정상적으로 결제 시, /mypage/success로 이동한다.", () => {
		const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

		render(<PaymentButton paymentMethod="naver" elapsedTime={100} />);

		const button = screen.getByRole("button", { name: "결제하기" });
		fireEvent.click(button);

		expect(alertMock).toHaveBeenCalledWith(
			"naver 결제가 성공적으로 완료되었습니다."
		);
		expect(navigateMock).toHaveBeenCalledWith("/payment/success");

		alertMock.mockRestore();
	});

	it("중복 클릭 시, 처리되지 않는다.", () => {
		const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

		render(<PaymentButton paymentMethod="naver" elapsedTime={100} />);

		const button = screen.getByRole("button", { name: "결제하기" });

		fireEvent.click(button);
		fireEvent.click(button);

		expect(alertMock).toHaveBeenCalledTimes(1);
		expect(navigateMock).toHaveBeenCalledTimes(1);

		alertMock.mockRestore();
	});
});
