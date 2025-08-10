import { fireEvent, render, screen } from "@testing-library/react";
import ReviewRating from "../../../performance/detail/ReviewRating.tsx";
import "@testing-library/jest-dom";

describe("공연 목록 상세 페이지 - 별점", () => {
	it("초기 별점은 0점으로 표시된다.", () => {
		render(<ReviewRating onChange={() => {}} />);
		expect(screen.getByText("0점")).toBeInTheDocument();
	});

	/* 추후, React-icons를 통해 5개의 별점으로 나타낼 예정. 현재는 *를 사용하여 표시. */
	it("총 10개의 별점 버튼이 렌더링된다.", () => {
		render(<ReviewRating onChange={() => {}} />);
		const buttons = screen.getAllByRole("button");
		expect(buttons.length).toBe(10);
	});

	it("별점 버튼 클릭 시, 해당 점수로 표시된다.", () => {
		render(<ReviewRating onChange={() => {}} />);
		const thirdButton = screen.getAllByRole("button")[2];
		fireEvent.click(thirdButton);
		expect(screen.getByText("1.5점")).toBeInTheDocument();
	});

	it("별점 클릭 시, onChange 콜백이 호출된다.", () => {
		const handleChange = jest.fn();
		render(<ReviewRating onChange={handleChange} />);
		const button = screen.getAllByRole("button")[4];
		fireEvent.click(button);
		expect(handleChange).toHaveBeenCalledWith(2.5);
	});
});
