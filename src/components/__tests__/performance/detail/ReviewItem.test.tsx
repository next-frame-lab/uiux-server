import { render, screen, fireEvent } from "@testing-library/react";
import ReviewItem from "../../../performance/detail/review/ReviewItem.tsx";
import performanceReview from "../../../__mocks__/performanceReviewData.ts";

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
			/>
		);

		expect(screen.getByText(mockReview1.writerName)).toBeInTheDocument();
		expect(screen.getByText(mockReview1.content)).toBeInTheDocument();
		expect(screen.getByText(mockReview1.createdAt)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "👍 20" })).toBeInTheDocument();
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
			/>
		);

		expect(screen.getByText("Best Review")).toBeInTheDocument();
	});

	it("수정 버튼 클릭 시, textarea와 저장/취소 버튼이 나타난다.", () => {
		render(
			<ReviewItem
				review={mockReview1}
				isMine
				isAuthenticated
				onRequireLogin={() => {}}
				onUpdate={jest.fn()}
				onDelete={jest.fn()}
			/>
		);

		fireEvent.click(screen.getByText("수정"));
		expect(screen.getByDisplayValue(mockReview1.content)).toBeInTheDocument();
		expect(screen.getByText("저장")).toBeInTheDocument();
		expect(screen.getByText("취소")).toBeInTheDocument();
	});

	it("저장 버튼 클릭 시, OnUpdate가 호출되고 편집 종료", () => {
		const handleUpdate = jest.fn();

		render(
			<ReviewItem
				review={mockReview1}
				isMine
				isAuthenticated
				onRequireLogin={() => {}}
				onUpdate={handleUpdate}
				onDelete={jest.fn()}
			/>
		);

		fireEvent.click(screen.getByText("수정"));
		const textarea = screen.getByRole("textbox");
		fireEvent.change(textarea, { target: { value: "수정된 후기" } });
		fireEvent.click(screen.getByText("저장"));

		expect(handleUpdate).toHaveBeenCalledWith(mockReview1.id, "수정된 후기");
		expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
	});

	it("삭제 버튼 클릭 시, onDelete가 호출된다.", () => {
		const handleDelete = jest.fn();

		render(
			<ReviewItem
				review={mockReview1}
				isMine
				isAuthenticated
				onRequireLogin={() => {}}
				onUpdate={jest.fn()}
				onDelete={handleDelete}
			/>
		);

		fireEvent.click(screen.getByText("삭제"));
		expect(handleDelete).toHaveBeenCalledWith(mockReview1.id);
	});
});
