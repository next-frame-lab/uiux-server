import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import performanceDetail from "../../__mocks__/performanceDetailData.ts";
import ReservationInfo from "../../reservation/ReservationInfo.tsx";
import "@testing-library/jest-dom";

jest.mock("../../reservation/ScheduleCalendar.tsx", () => ({
	__esModule: true,
	default: ({
		selectedSchedule,
	}: {
		selectedSchedule: { date: string; time: string };
	}) => (
		<div>
			<span data-testid="selected-date">{selectedSchedule.date}</span>
			<span data-testid="selected-time">{selectedSchedule.time}</span>
		</div>
	),
}));

describe("ReservationInfo 컴포넌트", () => {
	const validPerformanceId = performanceDetail.data.id;
	const validSchedule = performanceDetail.data.performanceSchedules[0];
	const invalidPerformanceId = "invalid-performance-id";
	const invalidScheduleId = "invalid-schedule-id";

	const renderWithRoute = (state: {
		performanceId?: string;
		scheduleId?: string;
	}) => {
		render(
			<MemoryRouter
				initialEntries={[
					{
						pathname: `/reservation/${state.performanceId}/${state.scheduleId}`,
						state,
					},
				]}>
				<Routes>
					<Route
						path="/reservation/:performanceId/:scheduleId"
						element={<ReservationInfo />}
					/>
				</Routes>
			</MemoryRouter>
		);
	};

	it("선택된 scheduleId가 유효하면 스케줄 정보를 렌더링한다", () => {
		renderWithRoute({
			performanceId: validPerformanceId,
			scheduleId: validSchedule.id,
		});

		expect(screen.getByText("공연 일정")).toBeInTheDocument();
		expect(screen.getByText("관람 선택 시간")).toBeInTheDocument();
		expect(screen.getByText("좌석 가격 안내")).toBeInTheDocument();

		expect(screen.getByTestId("selected-date")).toHaveTextContent(
			validSchedule.date
		);
		expect(screen.getByTestId("selected-time")).toHaveTextContent(
			validSchedule.time
		);

		performanceDetail.data.seatSectionPrices.forEach((price) => {
			expect(screen.getByText(`${price.section}석`)).toBeInTheDocument();
			expect(
				screen.getByText(`${price.price.toLocaleString()}원`)
			).toBeInTheDocument();
		});
	});

	it("올바른 공연 ID & 잘못된 스케줄 ID를 받으면, 접근 차단 메시지를 출력한다.", () => {
		renderWithRoute({
			performanceId: validPerformanceId,
			scheduleId: invalidScheduleId,
		});

		expect(
			screen.getByText("스케줄 ID가 일치하지 않습니다. 잘못된 접근입니다.")
		).toBeInTheDocument();
	});

	it("잘못된 공연 ID를 받으면, 접근 차단 메시지를 출력한다.", () => {
		renderWithRoute({
			performanceId: invalidPerformanceId,
			scheduleId: validSchedule.id,
		});
		expect(
			screen.getByText("공연 ID가 일치하지 않습니다. 잘못된 접근입니다.")
		).toBeInTheDocument();
	});
});
