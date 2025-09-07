import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PerformanceCard from "../../../performance/list/PerformanceCard.tsx";
import performanceData from "../../../__mocks__/performanceData.ts";

/* 공연 카드 렌더링 & 클릭 시, 상세 페이지로 navigate */
describe("공연 카드 목록 조회", () => {
	const mockPerformance = performanceData.data.performances;

	it("공연 카드에 공연 이름, 공연 장소, 공연 시작/종료 날짜, 공연 평균 별점이 표시된다.", () => {
		render(<PerformanceCard performances={mockPerformance} />);

		expect(
			screen.getByAltText("j-hope Tour: HOPE ON THE STAGE [서울] 포스터 이미지")
		).toBeInTheDocument();
		expect(
			screen.getByText("j-hope Tour: HOPE ON THE STAGE [서울]")
		).toBeInTheDocument();
		expect(screen.getByText("올림픽공원")).toBeInTheDocument();
		expect(screen.getByText("4.1")).toBeInTheDocument();
		expect(screen.getByText("20250228 ~ 20250302")).toBeInTheDocument();
	});

	it("PerformanceCard를 여러 개 렌더링한다면, 각 카드가 정확히 표시된다.", () => {
		const performances = [
			mockPerformance,
			{
				...mockPerformance,
				id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
				name: "2번째 공연",
			},
			{
				...mockPerformance,
				id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
				name: "3번째 공연",
			},
		];

		performances.forEach((p) => {
			render(<PerformanceCard performances={p} />);
		});
		expect(
			screen.getByText("j-hope Tour: HOPE ON THE STAGE [서울]")
		).toBeInTheDocument();
		expect(screen.getByText("2번째 공연")).toBeInTheDocument();
		expect(screen.getByText("3번째 공연")).toBeInTheDocument();
	});

	it("카드 클릭 시, 상세 페이지 이동 콜백(onClick)이 호출된다.", () => {
		const handleClick = jest.fn();

		render(<PerformanceCard performances={mockPerformance} />);

		const card = screen.getByTestId("performanceId");
		fireEvent.click(card);

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledWith(
			"c8d1e2a7-4a5b-437b-9d90-7b1a2c3f1231"
		);
	});

	it("performance prop이 undefined일 시, 렌더링하지 않는다.", () => {
		render(<PerformanceCard performances={undefined as any} />);
		expect(screen.queryByTestId("performanceId")).not.toBeInTheDocument();
	});

	it("onClick이 전달되지 않아도, 클릭 시 에러 없이 작동한다.", () => {
		const cardRender = () =>
			render(<PerformanceCard performances={mockPerformance} />);
		expect(cardRender).not.toThrow();
	});
});
