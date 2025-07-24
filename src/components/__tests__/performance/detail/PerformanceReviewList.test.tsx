import { render, screen } from "@testing-library/react";
import PerformanceReviewList from "../../../performance/detail/PerformanceReviewList.tsx";
import performanceReview from "../../../__mocks__/performanceReviewData.ts";
import "@testing-library/jest-dom";

describe("PerformanceReviewList 컴포넌트", () => {
	const mockReviews = performanceReview.reviewList;

	it("리뷰 갯수만큼 렌더링 되는지 확인", () => {
		render(
			<PerformanceReviewList
				reviews={mockReviews}
				currentUserId="c8d1e2a7-4a5b-437b-9d90-7b1a2c3f1239"
				onEdit={jest.fn()}
				onDelete={jest.fn()}
			/>
		);
		mockReviews.forEach((mockReview) => {
			expect(screen.getByText(mockReview.writerName)).toBeInTheDocument();
			expect(screen.getByText(mockReview.content)).toBeInTheDocument();
		});
	});

	it("작성자 본인인 경우, 수정/삭제 버튼이 보인다.", () => {
		render(
			<PerformanceReviewList
				reviews={mockReviews}
				currentUserId="other-user-id"
				onEdit={jest.fn()}
				onDelete={jest.fn()}
			/>
		);

		expect(screen.queryByText("수정")).not.toBeInTheDocument();
		expect(screen.queryByText("삭제")).not.toBeInTheDocument();
	});
});
