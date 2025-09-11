import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import performanceDetail from "../../../__mocks__/performanceDetailData.ts";
import PerformanceInfo from "../../../performance/detail/PerformanceInfo.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// useNavigate mocking
const navigateMock = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => navigateMock,
}));

function renderWithProviders(ui: React.ReactElement) {
	const qc = new QueryClient();

	return render(
		<QueryClientProvider client={qc}>
			<MemoryRouter initialEntries={["/performances/mock-1"]}>
				{ui}
			</MemoryRouter>
		</QueryClientProvider>
	);
}

describe("공연 목록 상세 페이지 - 정보 렌더링", () => {
	it("공연 정보를 렌더링한다.", () => {
		renderWithProviders(<PerformanceInfo performance={performanceDetail} />);

		expect(screen.getByText(performanceDetail.data.name)).toBeInTheDocument();
		expect(
			screen.getByText(`평점 : ${performanceDetail.data.averageStar}점`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`타입 : ${performanceDetail.data.type}`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`장르 : ${performanceDetail.data.genre}`)
		).toBeInTheDocument();
		expect(
			screen.getByText(`공연 시간 : ${performanceDetail.data.runningTime}분`)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				`장소 : ${performanceDetail.data.stadium.name} ${performanceDetail.data.stadium.address}`
			)
		).toBeInTheDocument();
	});

	it("좌석 가격이 섹션 개수만큼 렌더링, 문구에 가격이 포함된다.", () => {
		const { seatSectionPrices } = performanceDetail.data;
		renderWithProviders(<PerformanceInfo performance={performanceDetail} />);

		seatSectionPrices.forEach((seat) => {
			expect(
				screen.getByText(`${seat.section}석 : ${seat.price.toLocaleString()}원`)
			).toBeInTheDocument();
		});
	});

	it("초기 선택된 스케줄이 첫 번째 스케줄 id로 설정된다", () => {
		renderWithProviders(<PerformanceInfo performance={performanceDetail} />);
		const select = screen.getByRole("combobox");
		expect(select).toHaveValue(
			performanceDetail.data.performanceSchedules[0].id
		);
	});

	it("스케줄 셀렉트 옵션이 스케줄 개수만큼 렌더링된다.", () => {
		const { performanceSchedules } = performanceDetail.data;
		renderWithProviders(<PerformanceInfo performance={performanceDetail} />);

		const options = screen.getAllByRole("option");
		expect(options).toHaveLength(performanceSchedules.length);
	});

	it("스케줄을 선택하면, 값이 변경된다.", () => {
		renderWithProviders(<PerformanceInfo performance={performanceDetail} />);
		const select = screen.getByRole("combobox");
		const schedules = performanceDetail.data.performanceSchedules;
		const nextId = schedules[1]?.id ?? schedules[0].id;

		fireEvent.change(select, { target: { value: nextId } });
		expect(select).toHaveValue(nextId);
	});

	it("예매 버튼 클릭 시, 좌석 페이지로 naviate가 호출되며, stat를 전달한다.", () => {
		const { data } = performanceDetail;
		renderWithProviders(<PerformanceInfo performance={performanceDetail} />);

		const btn = screen.getByRole("button", { name: "티켓 예매하기" });
		fireEvent.click(btn);

		expect(navigateMock).toHaveBeenCalledWith(
			`/performances/${data.id}/seats`,
			{
				state: {
					performanceId: data.id,
					scheduleId: data.performanceSchedules[0].id,
					seatPrices: data.seatSectionPrices,
					stadiumId: data.stadium.id,
				},
			}
		);
	});
});
