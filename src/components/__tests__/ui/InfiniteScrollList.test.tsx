import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import performanceData from "../../__mocks__/performanceData.ts";
import InfiniteScroll from "../../ui/InfiniteScroll.tsx";

beforeEach(() => {
	jest.useFakeTimers();
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

afterEach(() => {
	jest.useRealTimers();
});

describe("인피니티 스크롤(공연) 컴포넌트 호출", () => {
	it("초기 10개 공연 카드가 렌더링된다.", () => {
		render(
			<InfiniteScroll hasMore onFetchNext={() => {}} delay={1000}>
				{performanceData.data.performances.slice(0, 10).map((item) => (
					<div key={item.id}>{item.name}</div>
				))}
			</InfiniteScroll>
		);

		expect(screen.getByText("공연 이름-1")).toBeInTheDocument();
		expect(screen.getByText("공연 이름-2")).toBeInTheDocument();
	});

	it("hasMore가 false라면, 하단 로더가 보이지 않음.", () => {
		render(
			<InfiniteScroll hasMore={false} onFetchNext={() => {}} delay={1000}>
				{performanceData.data.performances.map((item) => (
					<div key={item.id}>{item.name}</div>
				))}
			</InfiniteScroll>
		);

		expect(screen.queryByTestId("scroll-loader")).not.toBeInTheDocument();
	});

	it("IntersectionObserver 작동 시, fetchNext 호출", () => {
		const fetchNext = jest.fn();

		render(
			<InfiniteScroll hasMore onFetchNext={fetchNext} delay={1000}>
				{performanceData.data.performances.map((item) => (
					<div key={item.id}>{item.name}</div>
				))}
			</InfiniteScroll>
		);

		const callback = (window.IntersectionObserver as jest.Mock).mock
			.calls[0][0];
		callback([{ isIntersecting: true }]);

		jest.advanceTimersByTime(1000);

		expect(fetchNext).toHaveBeenCalled();
	});

	it("IntersectionObserver 작동 중, isIntersecting이 false일 경우, fetchNext 호출 x", () => {
		const fetchNext = jest.fn();

		render(
			<InfiniteScroll hasMore onFetchNext={() => {}} delay={1000}>
				{performanceData.data.performances.map((item) => (
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
