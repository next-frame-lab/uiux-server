import { fireEvent, render, screen } from "@testing-library/react";
import PaymentMethod from "../../payment/PaymentMethod.tsx";

describe("PaymentMethod", () => {
	const mockSetSelectedMethod = jest.fn();

	beforeEach(() => {
		mockSetSelectedMethod.mockClear();
	});

	it("모든 결제 방식 버튼이 렌더링된다.", () => {
		render(
			<PaymentMethod
				selectedMethod=""
				setSelectedMethod={mockSetSelectedMethod}
			/>
		);

		expect(screen.getByText("KAKAO PAY")).toBeInTheDocument();
		expect(screen.getByText("NAVER PAY")).toBeInTheDocument();
		expect(screen.getByText("TOSS PAY")).toBeInTheDocument();
	});

	it("결제 방식 버튼 클릭 시, setSelectedMethod가 호출된다.", () => {
		render(
			<PaymentMethod
				selectedMethod=""
				setSelectedMethod={mockSetSelectedMethod}
			/>
		);

		const kakaoButton = screen.getByText("KAKAO PAY");
		fireEvent.click(kakaoButton);

		expect(mockSetSelectedMethod).toHaveBeenCalledWith("kakao");
	});

	it("선택된 결제 방식 버튼에 강조 클래스가 적용된다.", () => {
		render(
			<PaymentMethod
				selectedMethod="toss"
				setSelectedMethod={mockSetSelectedMethod}
			/>
		);

		const tossButton = screen.getByText("TOSS PAY");
		expect(tossButton).toHaveClass("bg-gray-200");
		expect(tossButton).not.toHaveClass("bg-white");
	});
});
