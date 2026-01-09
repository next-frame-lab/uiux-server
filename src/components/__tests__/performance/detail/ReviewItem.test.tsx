import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReviewItem from "../../../performance/detail/review/ReviewItem.tsx";
import performanceReview from "../../../__mocks__/performanceReviewData.ts";

// DeleteConfirmModal 모킹
jest.mock("../../../common/DeleteConfirmModal.tsx", () => ({
	__esModule: true,
	default: function MockDeleteModal({
		isOpen,
		onConfirm,
		onClose,
	}: {
		isOpen: boolean;
		onConfirm: () => void;
		onClose: () => void;
	}) {
		if (!isOpen) return null;
		return (
			<div data-testid="delete-modal">
				<button type="button" onClick={onConfirm}>
					확인
				</button>
				<button type="button" onClick={onClose}>
					취소
				</button>
			</div>
		);
	},
}));

// ReviewRating 모킹
jest.mock("../../../performance/detail/review/ReviewRating.tsx", () => ({
	__esModule: true,
	default: function MockReviewRating({
		onChange,
		initialValue,
	}: {
		onChange: (n: number) => void;
		initialValue?: number;
	}) {
		return (
			<div data-testid="review-rating">
				<span>현재 별점: {initialValue}</span>
				<button type="button" onClick={() => onChange(5)}>
					별점 5점으로 변경
				</button>
			</div>
		);
	},
}));

// ReviewLikeButton 모킹
jest.mock("../../../performance/detail/review/ReviewLikeButton.tsx", () => ({
	__esModule: true,
	default: function MockReviewLikeButton({
		reviewId,
		initialLikeCount,
	}: {
		reviewId: string;
		initialLikeCount: number;
	}) {
		return (
			<button type="button" data-testid={`like-button-${reviewId}`}>
				👍 {initialLikeCount}
			</button>
		);
	},
}));

describe("ReviewItem 컴포넌트", () => {
	const mockReview1 = performanceReview.data.reviews[0];
	const mockReview2 = performanceReview.data.reviews[1];

	it("작성자 정보, 후기 내용, 작성 날짜를 렌더링한다.", () => {
		render(
			<ReviewItem
				review={mockReview1}
				isMine={false}
				isAuthenticated={false}
				onRequireLogin={() => {}}
				onUpdate={jest.fn()}
				onDelete={jest.fn()}
				onLikeToggle={jest.fn()}
			/>
		);

		expect(screen.getByText(mockReview1.writerName)).toBeInTheDocument();
		expect(screen.getByText(mockReview1.content)).toBeInTheDocument();
		expect(screen.getByText(mockReview1.createdAt)).toBeInTheDocument();
		expect(
			screen.getByTestId(`like-button-${mockReview1.id}`)
		).toBeInTheDocument();
	});

	it("likeCount가 20 미만일 시, Best Review 뱃지가 표시되지 않는다.", () => {
		render(
			<ReviewItem
				review={mockReview2}
				isMine={false}
				isAuthenticated={false}
				onRequireLogin={() => {}}
				onUpdate={jest.fn()}
				onDelete={jest.fn()}
				onLikeToggle={jest.fn()}
			/>
		);

		expect(screen.queryByText("Best Review")).not.toBeInTheDocument();
	});

	it("likeCount가 20 이상일 시, Best Review 뱃지가 표시된다.", () => {
		render(
			<ReviewItem
				review={mockReview1}
				isMine={false}
				isAuthenticated={false}
				onRequireLogin={() => {}}
				onUpdate={jest.fn()}
				onDelete={jest.fn()}
				onLikeToggle={jest.fn()}
			/>
		);

		expect(screen.getByText("Best Review")).toBeInTheDocument();
	});

	it("별점이 정확하게 표시된다.", () => {
		render(
			<ReviewItem
				review={mockReview1}
				isMine={false}
				isAuthenticated={false}
				onRequireLogin={() => {}}
				onUpdate={jest.fn()}
				onDelete={jest.fn()}
				onLikeToggle={jest.fn()}
			/>
		);

		// 별점 표시 확인 (mockReview1.star 값 확인)
		expect(
			screen.getByText(`${mockReview1.star.toFixed(1)}`)
		).toBeInTheDocument();
	});

	it("수정 버튼 클릭 시, textarea와 저장/취소 버튼이 나타나고 별점도 표시된다.", () => {
		render(
			<ReviewItem
				review={mockReview1}
				isMine
				isAuthenticated
				onRequireLogin={() => {}}
				onUpdate={jest.fn()}
				onDelete={jest.fn()}
				onLikeToggle={jest.fn()}
			/>
		);

		fireEvent.click(screen.getByText("수정"));

		expect(screen.getByDisplayValue(mockReview1.content)).toBeInTheDocument();
		expect(screen.getByText("저장")).toBeInTheDocument();
		expect(screen.getByText("취소")).toBeInTheDocument();
		expect(screen.getByTestId("review-rating")).toBeInTheDocument();
		expect(
			screen.getByText(`현재 별점: ${mockReview1.star}`)
		).toBeInTheDocument();
	});

	it("저장 버튼 클릭 시, onUpdate가 호출되고 편집 종료 (별점과 함께)", async () => {
		const handleUpdate = jest.fn().mockResolvedValue(undefined);

		render(
			<ReviewItem
				review={mockReview1}
				isMine
				isAuthenticated
				onRequireLogin={() => {}}
				onUpdate={handleUpdate}
				onDelete={jest.fn()}
				onLikeToggle={jest.fn()}
			/>
		);

		fireEvent.click(screen.getByText("수정"));

		const textarea = screen.getByRole("textbox");
		fireEvent.change(textarea, { target: { value: "수정된 후기" } });

		// 별점 변경
		fireEvent.click(screen.getByText("별점 5점으로 변경"));

		fireEvent.click(screen.getByText("저장"));

		await waitFor(() => {
			expect(handleUpdate).toHaveBeenCalledWith(
				mockReview1.id,
				"수정된 후기",
				5
			);
			expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
		});
	});

	it("취소 버튼 클릭 시, 원래 내용과 별점으로 복원되고 편집 종료", () => {
		render(
			<ReviewItem
				review={mockReview1}
				isMine
				isAuthenticated
				onRequireLogin={() => {}}
				onUpdate={jest.fn()}
				onDelete={jest.fn()}
				onLikeToggle={jest.fn()}
			/>
		);

		fireEvent.click(screen.getByText("수정"));

		const textarea = screen.getByRole("textbox");
		fireEvent.change(textarea, { target: { value: "수정된 후기" } });
		fireEvent.click(screen.getByText("별점 5점으로 변경"));

		fireEvent.click(screen.getByText("취소"));

		expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
		expect(screen.getByText(mockReview1.content)).toBeInTheDocument();
	});

	it("삭제 버튼 클릭 시, 모달이 표시되고 확인 버튼 클릭 시 onDelete가 호출된다.", async () => {
		const handleDelete = jest.fn().mockResolvedValue(undefined);

		render(
			<ReviewItem
				review={mockReview1}
				isMine
				isAuthenticated
				onRequireLogin={() => {}}
				onUpdate={jest.fn()}
				onDelete={handleDelete}
				onLikeToggle={jest.fn()}
			/>
		);

		// 삭제 버튼 클릭
		fireEvent.click(screen.getByText("삭제"));

		// 모달이 표시되는지 확인
		expect(screen.getByTestId("delete-modal")).toBeInTheDocument();

		// 모달의 확인 버튼 클릭
		fireEvent.click(screen.getByText("확인"));

		await waitFor(() => {
			expect(handleDelete).toHaveBeenCalledWith(mockReview1.id);
		});
	});

	it("삭제 모달에서 취소 버튼 클릭 시, 모달이 닫히고 onDelete가 호출되지 않는다.", () => {
		const handleDelete = jest.fn();

		render(
			<ReviewItem
				review={mockReview1}
				isMine
				isAuthenticated
				onRequireLogin={() => {}}
				onUpdate={jest.fn()}
				onDelete={handleDelete}
				onLikeToggle={jest.fn()}
			/>
		);

		// 삭제 버튼 클릭
		fireEvent.click(screen.getByText("삭제"));

		// 모달의 취소 버튼 클릭
		fireEvent.click(screen.getByText("취소"));

		expect(screen.queryByTestId("delete-modal")).not.toBeInTheDocument();
		expect(handleDelete).not.toHaveBeenCalled();
	});

	it("isMine이 false일 때는 수정/삭제 버튼이 보이지 않는다.", () => {
		render(
			<ReviewItem
				review={mockReview1}
				isMine={false}
				isAuthenticated
				onRequireLogin={() => {}}
				onUpdate={jest.fn()}
				onDelete={jest.fn()}
				onLikeToggle={jest.fn()}
			/>
		);

		expect(screen.queryByText("수정")).not.toBeInTheDocument();
		expect(screen.queryByText("삭제")).not.toBeInTheDocument();
	});
});
