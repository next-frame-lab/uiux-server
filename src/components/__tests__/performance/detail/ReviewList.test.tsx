import { render, screen } from "@testing-library/react";
import ReviewList from "../../../performance/detail/review/ReviewList.tsx";
import performanceReview from "../../../__mocks__/performanceReviewData.ts";
import "@testing-library/jest-dom";

describe("ReviewList 컴포넌트", () => {
	const mockReviews = performanceReview.data.reviews;

	it("리뷰 갯수만큼 렌더링 되는지 확인", () => {
		render(
			<ReviewList
				reviews={mockReviews}
				currentUserId="c8d1e2a7-4a5b-437b-9d90-7b1a2c3f1239"
				isAuthenticated={false}
				onRequireLogin={() => {}}
				onEdit={jest.fn()}
				onDelete={jest.fn()}
			/>
		);

		mockReviews.forEach((r) => {
			expect(screen.getByText(r.writerName)).toBeInTheDocument();
			expect(screen.getByText(r.content)).toBeInTheDocument();
		});
	});

	it("리뷰가 없으면 아무것도 렌더링되지 않는다.", () => {
		render(
			<ReviewList
				reviews={[]}
				currentUserId="other-user-id"
				isAuthenticated={false}
				onRequireLogin={() => {}}
				onEdit={jest.fn()}
				onDelete={jest.fn()}
			/>
		);

		expect(screen.queryByText(/./)).toBeNull();
	});
});
