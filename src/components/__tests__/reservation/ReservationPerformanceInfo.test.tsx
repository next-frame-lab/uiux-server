import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import performanceDetail from "../../__mocks__/performanceDetailData.ts";
import ReservationInfo from "../../reservation/ReservationInfo.tsx";
import "@testing-library/jest-dom";

describe("ReservationInfo 컴포넌트", () => {
	const validPerformanceId = performanceDetail.data.id;
	const validSchedule = performanceDetail.data.performanceSchedules[0];
	const invalidPerformanceId = "invalid-performance-id";
	const invalidScheduleId = "invalid-schedule-id";

	const renderWithRoute = (performanceId: string, scheduleId: string) => {
		render(
			<MemoryRouter
				initialEntries={[`/reservation/${performanceId}/${scheduleId}`]}>
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
		renderWithRoute(validPerformanceId, validSchedule.id);

		expect(screen.getByText("공연명")).toBeInTheDocument();
		expect(screen.getByText(performanceDetail.data.name)).toBeInTheDocument();

		expect(screen.getByText("선택 날짜")).toBeInTheDocument();
		expect(screen.getByText(validSchedule.date)).toBeInTheDocument();

		expect(screen.getByText("선택 시간")).toBeInTheDocument();
		expect(screen.getByText(validSchedule.time)).toBeInTheDocument();

		performanceDetail.data.seatSectionPrices.forEach((price) => {
			expect(screen.getByText(price.section)).toBeInTheDocument();
			expect(
				screen.getByText(`${price.price.toLocaleString()}원`)
			).toBeInTheDocument();
		});
	});

	it("올바른 공연 ID & 잘못된 스케줄 ID를 받으면, 접근 차단 메시지를 출력한다.", () => {
		renderWithRoute(validPerformanceId, invalidScheduleId);

		expect(
			screen.getByText("스케줄 ID가 일치하지 않습니다. 잘못된 접근입니다.")
		).toBeInTheDocument();
	});

	it("잘못된 공연 ID를 받으면, 접근 차단 메시지를 출력한다.", () => {
		renderWithRoute(invalidPerformanceId, validPerformanceId);
		expect(
			screen.getByText("공연 ID가 일치하지 않습니다. 잘못된 접근입니다.")
		).toBeInTheDocument();
	});
});
