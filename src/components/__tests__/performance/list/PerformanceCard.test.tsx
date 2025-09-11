import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PerformanceCard from "../../../performance/list/PerformanceCard.tsx";
import performanceData from "../../../__mocks__/performanceData.ts";

// useNavigate mocking
const navigateMock = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => navigateMock,
}));

/* 공연 카드 렌더링 & 클릭 시, 상세 페이지로 navigate */
describe("공연 카드 목록 조회", () => {
	const mockList = performanceData.data.performances;

	beforeEach(() => {
		navigateMock.mockClear();
	});

	it("공연 카드에 공연 이름, 공연 장소, 공연 시작/종료 날짜가 표시된다.", () => {
		render(<PerformanceCard performances={mockList.slice(0, 1)} />);

		const first = mockList[0];

		const img = screen.getByAltText(`${first.name} 포스터 이미지`);
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute("src", "test-file-stub");
		expect(screen.getByText(first.name)).toBeInTheDocument();
		expect(screen.getByText(first.stadiumName)).toBeInTheDocument();
		expect(
			screen.getByText(`${first.startDate} ~ ${first.endDate}`)
		).toBeInTheDocument();
	});

	it("여러 개의 공연을 한 번에 렌더링한다면, 각 카드가 모두 표시된다.", () => {
		const second = { ...mockList[0], id: "mock-2", name: "공연 이름-2" };
		const third = { ...mockList[0], id: "mock-3", name: "공연 이름-3" };
		const three = [mockList[0], second, third];

		render(<PerformanceCard performances={three} />);
		expect(screen.getByText(mockList[0].name)).toBeInTheDocument();
		expect(screen.getByText("공연 이름-2")).toBeInTheDocument();
		expect(screen.getByText("공연 이름-3")).toBeInTheDocument();

		const cards = screen.getAllByTestId("performanceId");
		expect(cards).toHaveLength(3);
	});

	it("카드 클릭 시, 공연 상세 페이지로 navigate가 호출된다.", () => {
		render(<PerformanceCard performances={mockList} />);

		const first = mockList[0];
		const card = screen.getAllByTestId("performanceId")[0];
		fireEvent.click(card);

		expect(navigateMock).toHaveBeenCalledTimes(1);
		expect(navigateMock).toHaveBeenCalledWith(`/performances/${first.id}`);
	});

	it("비어 있다면, '공연이 존재하지 않습니다.' 문구를 표시한다.", () => {
		render(<PerformanceCard performances={[]} />);
		expect(screen.getByText("공연이 존재하지 않습니다.")).toBeInTheDocument();
	});
});
