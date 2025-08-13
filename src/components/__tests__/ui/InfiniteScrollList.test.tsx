import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import performanceData from "../../__mocks__/performanceData.ts";
import InfiniteScroll from "../../ui/InfiniteScroll.tsx";
import performanceReview from "../../__mocks__/performanceReviewData.ts";

beforeEach(() => {
	window.IntersectionObserver = jest.fn(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
		takeRecords: jest.fn(),
		root: null,
		rootMargin: "",
		thresholds: [],
	}));
});

describe("인피니티 스크롤(공연) 컴포넌트 호출", () => {
	it("초기 2개 공연 카드가 렌더링된다.", () => {
		render(
			<InfiniteScroll hasMore onFetchNext={() => {}}>
				{performanceData.performanceList.map((item) => (
					<div key={item.id}>{item.name}</div>
				))}
			</InfiniteScroll>
		);

		expect(
			screen.getByText("j-hope Tour: HOPE ON THE STAGE [서울]")
		).toBeInTheDocument();
		expect(screen.getByText("오페라 유령")).toBeInTheDocument();
	});

	it("hasMore가 false라면, 하단 로더가 보이지 않음.", () => {
		render(
			<InfiniteScroll hasMore={false} onFetchNext={() => {}}>
				{performanceData.performanceList.map((item) => (
					<div key={item.id}>{item.name}</div>
				))}
			</InfiniteScroll>
		);

		expect(screen.queryByTestId("scroll-loader")).not.toBeInTheDocument();
	});

	it("IntersectionObserver 작동 시, fetchNext 호출", () => {
		const fetchNext = jest.fn();

		render(
			<InfiniteScroll hasMore onFetchNext={fetchNext}>
				{performanceData.performanceList.map((item) => (
					<div key={item.id}>{item.name}</div>
				))}
			</InfiniteScroll>
		);

		const callback = (window.IntersectionObserver as jest.Mock).mock
			.calls[0][0];
		callback([{ isIntersecting: true }]);

		expect(fetchNext).toHaveBeenCalled();
	});

	it("IntersectionObserver 작동 중, isIntersecting이 false일 경우, fetchNext 호출 x", () => {
		const fetchNext = jest.fn();

		render(
			<InfiniteScroll hasMore onFetchNext={() => {}}>
				{performanceData.performanceList.map((item) => (
					<div key={item.id}>{item.name}</div>
				))}
			</InfiniteScroll>
		);

		const callback = (window.IntersectionObserver as jest.Mock).mock
			.calls[0][0];
		callback([{ isIntersecting: false }]);

		expect(fetchNext).not.toHaveBeenCalled();
	});
});

describe("인피니티 스크롤(후기글) 컴포넌트 호출", () => {
	it("초기 2개 후기글이 렌더링된다.", () => {
		render(
			<InfiniteScroll hasMore onFetchNext={() => {}}>
				{performanceReview.reviewList.map((review) => (
					<div key={review.writerId}>
						<p>{review.writerName}</p>
						<p>{review.content}</p>
					</div>
				))}
			</InfiniteScroll>
		);

		expect(screen.getByText("뮤덕이")).toBeInTheDocument();
		expect(
			screen.getByText("정말 감동적인 공연이었어요. 무대 연출도 최고!")
		).toBeInTheDocument();
	});

	it("hasMore가 false라면, 하단 로더가 보이지 않음.", () => {
		render(
			<InfiniteScroll hasMore={false} onFetchNext={() => {}}>
				{performanceReview.reviewList.map((review) => (
					<div key={review.writerId}>
						<p>{review.writerName}</p>
						<p>{review.content}</p>
					</div>
				))}
			</InfiniteScroll>
		);

		expect(screen.queryByTestId("scroll-loader")).not.toBeInTheDocument();
	});

	it("IntersectionObserver 작동 시, fetchNext 호출", () => {
		const fetchNext = jest.fn();

		render(
			<InfiniteScroll hasMore onFetchNext={fetchNext}>
				{performanceReview.reviewList.map((review) => (
					<div key={review.writerId}>
						<p>{review.writerName}</p>
						<p>{review.content}</p>
					</div>
				))}
			</InfiniteScroll>
		);

		const callback = (window.IntersectionObserver as jest.Mock).mock
			.calls[0][0];
		callback([{ isIntersecting: true }]);

		expect(fetchNext).toHaveBeenCalled();
	});

	it("IntersectionObserver 작동 중, isIntersecting이 false일 경우, fetchNext 호출 x", () => {
		const fetchNext = jest.fn();

		render(
			<InfiniteScroll hasMore onFetchNext={() => {}}>
				{performanceReview.reviewList.map((review) => (
					<div key={review.writerId}>
						<p>{review.writerName}</p>
						<p>{review.content}</p>
					</div>
				))}
			</InfiniteScroll>
		);

		const callback = (window.IntersectionObserver as jest.Mock).mock
			.calls[0][0];
		callback([{ isIntersecting: false }]);

		expect(fetchNext).not.toHaveBeenCalled();
	});
});
