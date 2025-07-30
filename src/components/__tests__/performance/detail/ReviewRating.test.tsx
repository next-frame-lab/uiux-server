import { fireEvent, render, screen } from "@testing-library/react";
import ReviewRating from "../../../performance/detail/review/ReviewRating.tsx";
import "@testing-library/jest-dom";
import { getStarValueFromClick } from "../../../../utils/StarRating.ts";

// getStarValueFromClick 유틸 모킹
jest.mock("../../../../utils/StarRating.ts", () => ({
	__esModule: true,
	getStarValueFromClick: jest.fn(),
}));

describe("공연 목록 상세 페이지 - 별점", () => {
	it("별점 버튼으로 5개가 렌더링된다.", () => {
		render(<ReviewRating onChange={() => {}} />);

		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(5);
	});

	it("별점 버튼 클릭 시, onChange가 발생한다.", () => {
		(getStarValueFromClick as jest.Mock).mockReturnValue(2.5);

		const handleChange = jest.fn();
		render(<ReviewRating onChange={handleChange} />);

		const buttons = screen.getAllByRole("button");
		fireEvent.click(buttons[0]);
		expect(handleChange).toHaveBeenCalledWith(2.5);
	});

	it("여러 번 클릭하면 마지막 클릭 값이 onChange로 전달된다.", () => {
		(getStarValueFromClick as jest.Mock)
			.mockReturnValueOnce(1.5)
			.mockReturnValueOnce(4.5)
			.mockReturnValueOnce(3);

		const handleChange = jest.fn();

		render(<ReviewRating onChange={handleChange} />);

		const [b0, b1, b2] = screen.getAllByRole("button");
		fireEvent.click(b0);
		fireEvent.click(b1);
		fireEvent.click(b2);

		expect(handleChange).toHaveBeenNthCalledWith(1, 1.5);
		expect(handleChange).toHaveBeenNthCalledWith(2, 4.5);
		expect(handleChange).toHaveBeenNthCalledWith(3, 3);
	});
});
