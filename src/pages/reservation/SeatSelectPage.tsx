import performanceDetail from "../../components/__mocks__/performanceDetailData.ts";
import {
	seatData,
	seatPrices,
	selectSeatsData,
} from "../../types/ApiDataTypes.ts";
import TotalDisplay from "../../components/reservation/TotalDisplay.tsx";
import { useQuery } from "@tanstack/react-query";
import useSeatReservation from "../../hooks/useSeatReservation.ts";
import { useEffect } from "react";
import SeatSelector from "../../components/reservation/SeatSelector.tsx";
import fetchSeats from "../../api/seats.ts";
import ReservationPerformanceInfo from "../../components/reservation/ReservationPerformanceInfo.tsx";

const STADIUM_ID = "mock-stadium";

export default function SeatSelectPage() {
	const { data: seatDataResponse } = useQuery<selectSeatsData>({
		queryKey: ["selectSeats", STADIUM_ID],
		queryFn: async () => fetchSeats(STADIUM_ID),
	});

	const { selectedSeats, selectedSeatIds, toggleSeat, resetSelection } =
		useSeatReservation();

	useEffect(() => {
		resetSelection();
	}, [resetSelection]);

	if (!seatDataResponse) {
		return <div>로딩 중...</div>;
	}

	const handleSelectSeat = (seatId: string) => {
		const seat = seatDataResponse.seats.find((s) => s.id === seatId);
		if (seat) {
			toggleSeat(seat);
		}
	};

	return (
		<main className="bg-[#FBFBFB]">
			<div className="mx-auto max-w-7xl px-8 py-12">
				<div className="flex gap-x-16">
					<div className="flex-1">
						<h1 className="text-4xl font-bold text-gray-900">
							{performanceDetail.name}
						</h1>
						<div className="h-full flex flex-col ">
							<h2 className="mt-2 text-2xl font-semibold text-gray-700">
								좌석 선택
							</h2>

							<div className="w-full bg-gray-600 text-center border-none rounded-sm p-2 mb-4 mt-4">
								SCREEN
							</div>

							{/* 좌석 선택 UI가 들어갈 빈 칸 */}
							<SeatSelector
								seatList={seatDataResponse.seats as seatData[]}
								selectedSeatIds={selectedSeatIds}
								onSelect={handleSelectSeat}
							/>
						</div>

					</div>

					{/* 오른쪽 예약 패널 */}
					<div className="w-[380px] flex-shrink-0 rounded-lg bg-gray-50 p-6">
						{/* 공연 일정 & 관람 선택 시간 & 좌석 가격 안내 */}
						<ReservationPerformanceInfo />

						<section className="mt-8 border-t border-gray-200 pt-6">
							<TotalDisplay
								selectedSeats={selectedSeats}
								seatPricesList={performanceDetail.seatPrices as seatPrices[]}
							/>
						</section>
						{/* 결제하기 버튼 */}
						<div className="mt-8">
							<button
								type="button"
								className="w-full rounded-lg bg-gray-200 py-3 text-base font-bold text-gray-800 hover:bg-gray-300">
								결제하기
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
