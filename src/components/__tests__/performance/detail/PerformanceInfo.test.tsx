import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import performanceDetail from "../../../__mocks__/performanceDetailData.ts";
import PerformanceInfo from "../../../performance/detail/PerformanceInfo.tsx";

describe("공연 목록 상세 페이지 - 정보 렌더링", () => {
	it("공연 정보를 렌더링한다.", () => {
		render(<PerformanceInfo performance={performanceDetail} />);
		expect(screen.getByText(performanceDetail.data.name)).toBeInTheDocument();
		expect(
			screen.getByText(
				`${performanceDetail.data.type} | ${performanceDetail.data.genre}`
			)
		).toBeInTheDocument();
		expect(
			screen.getByText(performanceDetail.data.stadium.name)
		).toBeInTheDocument();
		expect(
			screen.getByText(performanceDetail.data.stadium.address)
		).toBeInTheDocument();
		expect(
			screen.getByText(`진행 시간: ${performanceDetail.data.runningTime}분`)
		).toBeInTheDocument();
	});
	
	it("스케줄을 선택하면, 값이 변경된다.", () => {
		render(<PerformanceInfo performance={performanceDetail} />);
		const select = screen.getByRole("combobox");
		fireEvent.change(select, { target: { value: "2025-09-11 - 19:00" } });
		expect(select).toHaveValue("2025-09-11 - 19:00");
	});
});
