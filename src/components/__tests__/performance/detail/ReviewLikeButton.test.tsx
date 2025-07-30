import { render, screen, fireEvent } from "@testing-library/react";
import performanceReview from "../../../__mocks__/performanceReviewData.ts";
import ReviewLikeButton from "../../../performance/detail/review/ReviewLikeButton.tsx";

describe("공연 후기글 좋아요 버튼", () => {
	const mockToggleLike = jest.fn();

	beforeEach(() => {
		mockToggleLike.mockClear();
	});

	it("첫 번째 리뷰 좋아요 상태가 초기값으로 렌더링된다.", () => {
		const review = performanceReview.data.reviews[0];

		render(
			<ReviewLikeButton
				reviewId={review.id}
				initialLiked={review.likeStatus}
				initialLikeCount={review.likeCount}
				onToggleLike={mockToggleLike}
			/>
		);

		const button = screen.getByTestId(`${review.id}`);
		expect(button).toHaveTextContent("👍 20");
		expect(button).toHaveClass("text-gray-500");
	});

	it("좋아요 버튼을 누른 상태일 때, 재클릭하면 해제된다.", () => {
		const review = performanceReview.data.reviews[1];

		render(
			<ReviewLikeButton
				reviewId={review.id}
				initialLiked={review.likeStatus}
				initialLikeCount={review.likeCount}
				onToggleLike={mockToggleLike}
			/>
		);

		const button = screen.getByTestId(`${review.id}`);
		expect(button).toHaveTextContent("👍 2");
		expect(button).toHaveClass("text-yellow-500");

		fireEvent.click(button);

		expect(button).toHaveTextContent("👍 1");
		expect(button).toHaveClass("text-gray-500");
		expect(mockToggleLike).toHaveBeenCalledWith(review.id, false);
	});
});
