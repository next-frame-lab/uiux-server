import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ReviewForm from "../../../performance/detail/review/ReviewForm.tsx";
import "@testing-library/jest-dom";

jest.mock("../../../performance/detail/review/ReviewRating.tsx", () => ({
	__esModule: true,
	default: function MockReviewRating({
		onChange,
	}: {
		onChange: (n: number) => void;
	}) {
		return (
			<button type="button" data-testid="set-star" onClick={() => onChange(3)}>
				별점 주기
			</button>
		);
	},
}));

describe("ReviewForm 컴포넌트(후기 작성 컴포넌트)", () => {
	it("textarea에 입력 & 별점까지 선택하면, 버튼이 활성화된다.", () => {
		render(<ReviewForm onSubmit={jest.fn()} />);
		const textarea = screen.getByPlaceholderText(
			/이 공연에 대한 솔직한 후기를 남겨주세요/i // ✅ placeholder 텍스트 변경
		);
		const submitBtn = screen.getByRole("button", { name: /리뷰 등록하기/i }); // ✅ 버튼 텍스트 변경

		fireEvent.change(textarea, { target: { value: "멋진 공연이였어요." } });
		expect(textarea).toHaveValue("멋진 공연이였어요.");
		expect(submitBtn).toBeDisabled();

		fireEvent.click(screen.getByTestId("set-star"));
		expect(submitBtn).toBeEnabled();
	});

	it("공백 입력 또는 빈 값일 시, onSubmit이 호출되지 않음(버튼도 비활성화).", () => {
		const handleSubmit = jest.fn();
		render(<ReviewForm onSubmit={handleSubmit} />);

		const textarea = screen.getByPlaceholderText(
			/이 공연에 대한 솔직한 후기를 남겨주세요/i // ✅ placeholder 텍스트 변경
		);
		const submitBtn = screen.getByRole("button", { name: /리뷰 등록하기/i }); // ✅ 버튼 텍스트 변경

		fireEvent.click(screen.getByTestId("set-star"));
		fireEvent.change(textarea, { target: { value: "   " } });
		expect(submitBtn).toBeDisabled();
	});

	it("유효한 내용 + 별점 선택 시, onSubmit이 호출되고, textarea는 비워지며 버튼은 비활성화된다.", async () => {
		const handleSubmit = jest.fn().mockResolvedValue(undefined); // ✅ async 함수로 mock
		render(<ReviewForm onSubmit={handleSubmit} />);

		const textarea = screen.getByPlaceholderText(
			/이 공연에 대한 솔직한 후기를 남겨주세요/i // ✅ placeholder 텍스트 변경
		);
		const submitBtn = screen.getByRole("button", { name: /리뷰 등록하기/i }); // ✅ 버튼 텍스트 변경

		fireEvent.click(screen.getByTestId("set-star"));
		fireEvent.change(textarea, { target: { value: "멋진 공연이였어요." } });

		expect(submitBtn).toBeEnabled();

		fireEvent.click(submitBtn);

		expect(handleSubmit).toHaveBeenCalledWith("멋진 공연이였어요.", 3);

		await waitFor(() => {
			expect(textarea).toHaveValue("");
			expect(submitBtn).toBeDisabled();
		});
	});
});
