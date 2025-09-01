import performanceDetail from "../../components/__mocks__/performanceDetailData.ts";
import { seatPrices, selectSeatsData } from "../../types/ApiDataTypes.ts";
import TotalDisplay from "../../components/reservation/TotalDisplay.tsx";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useSeatReservation from "../../hooks/useSeatReservation.ts";
import { useEffect, useMemo, useState } from "react";
import SeatSelector from "../../components/reservation/SeatSelector.tsx";
import fetchSeats from "../../api/seats.ts";
import ReservationInfo from "../../components/reservation/ReservationInfo.tsx";
import WaitingRoom from "../../components/reservation/loading/WaitingRoom.tsx";
import CombineSeatsWithState from "../../utils/CombineSeatsWithState.ts";
import calculateTotalPrice from "../../utils/CalculatePrice.ts";
import SendSeatsButton from "../../components/reservation/SendSeatsButton.tsx";
import useSeatsState from "../../hooks/useSeatsState.ts";

const TIMEOUT_MS = 10 * 60 * 10; //

export default function SeatSelectPage() {
	const { selectedSeats, selectedSeatIds, toggleSeat, resetSelection } =
		useSeatReservation();
	// 시간 조절
	const startAt = useMemo(() => new Date(Date.now() + TIMEOUT_MS), []);
	const [ready, setReady] = useState(() => Date.now() >= startAt.getTime());

	const location = useLocation() as {
		state: {
			performanceId: string;
			scheduleId: string;
			seatPrices: seatPrices[];
			stadiumId: string;
		};
	};

	const performanceId = location.state.performanceId;
	const scheduleId = location.state.scheduleId;
	const seatPricesList = location.state.seatPrices;
	const stadiumId = location.state.stadiumId;

	const totalAmount = calculateTotalPrice(selectedSeats, seatPricesList);

	const { data: seatDataResponse } = useQuery<selectSeatsData>({
		queryKey: ["selectSeats", stadiumId],
		queryFn: async () => fetchSeats(stadiumId),
		enabled: ready,
		staleTime: 60 * 1000,
	});

	const { data: seatStateDataResponse } = useSeatsState(scheduleId, ready);

	useEffect(() => {
		resetSelection();
	}, [resetSelection]);

	const CombineSeats = useMemo(
		() =>
			CombineSeatsWithState(
				seatDataResponse?.seats ?? [],
				seatStateDataResponse ?? []
			),
		[seatDataResponse, seatStateDataResponse]
	);

	const handleSelectSeat = (seatId: string) => {
		const seat = CombineSeats.find((s) => s.id === seatId);
		if (!seat || seat.isLocked) return;
		toggleSeat(seat);
	};

	return (
		<main className="bg-[#FBFBFB]">
			{!ready && (
				<WaitingRoom
					stadiumId={stadiumId}
					scheduleId={scheduleId}
					startAt={startAt}
					onDone={() => setReady(true)}
				/>
			)}

			{ready && (
				<div className="mx-auto max-w-7xl px-8 py-12">
					<div className="flex gap-x-16">
						<div className="flex-1">
							<h1 className="text-4xl font-bold text-gray-900">
								{performanceDetail.data.name}
							</h1>
							<div className="h-full flex flex-col">
								<div className="flex flex-row justify-between text-center items-center text-2xl">
									<h2 className="mt-2 font-semibold text-gray-700">
										좌석 선택
									</h2>

									{/* 새로고침 버튼 임시로 제거 */}
									{/*<button type="button" onClick={() => refetchSeatStates()}>*/}
									{/*	<TbRefresh />*/}
									{/*</button>*/}
								</div>
								<div className="w-full bg-gray-600 text-center border-none rounded-sm p-2 mb-4 mt-4">
									SCREEN
								</div>
								{/* 좌석 선택 UI가 들어갈 빈 칸 */}
								{seatDataResponse && (
									<SeatSelector
										seatList={CombineSeats}
										selectedSeatIds={selectedSeatIds}
										onSelect={handleSelectSeat}
									/>
								)}
							</div>
						</div>

						{/* 오른쪽 예약 패널 */}
						<div className="w-[380px] flex-shrink-0 rounded-lg bg-gray-50 p-6">
							{/* 공연 일정 & 관람 선택 시간 & 좌석 가격 안내 */}
							<ReservationInfo />

							<section className="mt-8 border-t border-gray-200 pt-6">
								<TotalDisplay
									selectedSeats={selectedSeats}
									seatPricesList={
										performanceDetail.data.seatSectionPrices as seatPrices[]
									}
								/>
							</section>

							{/* 결제하기 버튼 */}
							<div className="mt-8">
								<SendSeatsButton
									performanceId={performanceId}
									scheduleId={scheduleId}
									seatIds={selectedSeatIds}
									totalAmount={totalAmount}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
