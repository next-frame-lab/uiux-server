import { render, screen } from "@testing-library/react";
import useReviews from "../../../../hooks/useReviews.ts";
import ReviewSection from "../../../performance/detail/review/ReviewSection.tsx";
import performanceReviewData from "../../../__mocks__/performanceReviewData.ts";

// useReviews 모킹
jest.mock("../../../../hooks/useReviews.ts", () => ({
	__esModule: true,
	default: jest.fn(),
}));

// ReviewList & ReviewForm 모킹
jest.mock("../../../performance/detail/review/ReviewList.tsx", () => ({
	__esModule: true,
	default: () => <div data-testid="review-list">ReviewListMock</div>,
}));

jest.mock("../../../performance/detail/review/ReviewForm.tsx", () => ({
	__esModule: true,
	default: function ReviewFormMock() {
		return <div data-testid="review-form">ReviewForm Stub</div>;
	},
}));

const mockedUseReviews = useReviews as unknown as jest.Mock;

describe("ReviewSection", () => {
	it("로딩 상태라면, '로딩 중'을 보여준다.", () => {
		mockedUseReviews.mockReturnValue({
			status: "loading",
		});
		render(
			<ReviewSection
				performanceId="mock-1"
				currentUserId="me-123"
				isAuthenticated
				onRequireLogin={jest.fn()}
			/>
		);
		expect(screen.getByText("로딩 중")).toBeInTheDocument();
	});

	it("에러 상태에서 에러 코드가 없다면 '알 수 없는 오류가 발생했습니다.'를 보여준다.", () => {
		mockedUseReviews.mockReturnValue({
			status: "error",
			error: {},
		});
		render(
			<ReviewSection
				performanceId="mock-1"
				currentUserId="me-123"
				isAuthenticated
				onRequireLogin={jest.fn()}
			/>
		);
		expect(
			screen.getByText("알 수 없는 오류가 발생했습니다.")
		).toBeInTheDocument();
	});

	it("성공 상태라면, ReviewList가 렌더링된다.", () => {
		mockedUseReviews.mockReturnValue({
			status: "success",
			reviews: performanceReviewData.data.reviews,
			onEdit: jest.fn(),
			onSubmit: jest.fn(),
			onDelete: jest.fn(),
		});

		render(
			<ReviewSection
				performanceId="mock-1"
				currentUserId="me-123"
				isAuthenticated
				onRequireLogin={jest.fn()}
			/>
		);
		expect(screen.getByTestId("review-list")).toBeInTheDocument();
	});

	it("로그인 상태라면, ReviewForm이 렌더링된다.", () => {
		mockedUseReviews.mockReturnValue({
			status: "success",
			reviews: [],
			onEdit: jest.fn(),
			onSubmit: jest.fn(),
			onDelete: jest.fn(),
		});
		render(
			<ReviewSection
				performanceId="mock-1"
				currentUserId="me-123"
				isAuthenticated
				onRequireLogin={jest.fn()}
			/>
		);
		expect(screen.getByTestId("review-form")).toBeInTheDocument();
	});

	it("비로그인 상태면 로그인 유도 UI가 보이며, ReviewForm은 보이지 않는다.", () => {
		mockedUseReviews.mockReturnValue({
			status: "success",
			reviews: [],
			onEdit: jest.fn(),
			onSubmit: jest.fn(),
			onDelete: jest.fn(),
		});
		render(
			<ReviewSection
				performanceId="mock-1"
				currentUserId="me-123"
				isAuthenticated={false}
				onRequireLogin={jest.fn()}
			/>
		);
		expect(
			screen.getByText(
				"해당 리뷰 작성 폼을 사용하기 위해서는 로그인이 필요합니다."
			)
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "로그인하기" })
		).toBeInTheDocument();
		expect(screen.queryByTestId("review-form")).not.toBeInTheDocument();
	});
});
