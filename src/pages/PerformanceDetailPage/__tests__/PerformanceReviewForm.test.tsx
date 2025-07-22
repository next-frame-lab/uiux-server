import { render, fireEvent, screen } from "@testing-library/react";
import ReviewForm from "../PerformanceReviewForm.tsx";
import "@testing-library/jest-dom";

describe("ReviewForm 컴포넌트(후기 작성 컴포넌트)", () => {
	it("textarea에 입력 시, 내용이 정상적으로 반영되며, 버튼이 활성화된다.", () => {
		render(<ReviewForm onSubmit={jest.fn()} />);
		const textarea = screen.getByPlaceholderText("후기를 작성해주세요.");
		const button = screen.getByRole("button");
		fireEvent.change(textarea, { target: { value: "멋진 공연이였어요." } });

		expect(textarea).toHaveValue("멋진 공연이였어요.");
		expect(button).toBeEnabled();
	});

	it("공백 입력 또는 빈 값일 시, onSubmit이 호출되지 않음(버튼도 비활성화).", () => {
		const handleSubmit = jest.fn();
		render(<ReviewForm onSubmit={handleSubmit} />);

		const textarea = screen.getByPlaceholderText("후기를 작성해주세요.");
		const button = screen.getByRole("button");

		fireEvent.change(textarea, { target: { value: "" } });

		expect(handleSubmit).not.toHaveBeenCalled();
		expect(button).toBeDisabled();
	});

	it("유효한 문자열 입력 후, onSubmit이 호출되고, textarea는 비워진다.", () => {
		const handleSubmit = jest.fn();
		render(<ReviewForm onSubmit={handleSubmit} />);

		const textarea = screen.getByPlaceholderText("후기를 작성해주세요.");
		const button = screen.getByRole("button");

		fireEvent.change(textarea, { target: { value: "멋진 공연이었어요!" } });
		fireEvent.click(button);

		expect(handleSubmit).toHaveBeenCalledWith("멋진 공연이었어요!");
		expect(textarea).toHaveValue("");
		expect(button).toBeDisabled();
	});
});
