import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import performanceDetail from "../../components/__mocks__/performanceDetailData.ts";
import {
	seatPrices,
	seatStateData,
	selectSeatsData,
} from "../../types/ApiDataTypes.ts";
import useSeatReservation from "../../hooks/useSeatReservation.ts";
import SeatSelector from "../../components/reservation/SeatSelector.tsx";
import fetchSeats from "../../api/seats.ts";
import ReservationInfo from "../../components/reservation/ReservationInfo.tsx";
import WaitingRoom from "../../components/reservation/loading/WaitingRoom.tsx";
import CombineSeatsWithState from "../../utils/CombineSeatsWithState.ts";
import calculateTotalPrice from "../../utils/CalculatePrice.ts";
import SendSeatsButton from "../../components/reservation/SendSeatsButton.tsx";
import fetchSeatsStates from "../../api/seatsStates.ts";
import { ApiError } from "../../lib/apiClient.ts";

const TIMEOUT_MS = 10 * 60 * 10; // 예매 진입 로딩 시간

export default function SeatSelectPage() {
	const { selectedSeats, selectedSeatIds, toggleSeat, resetSelection } =
		useSeatReservation();

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			navigate("/login");
		}
	}, [navigate]);

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

	const {
		performanceId,
		scheduleId,
		seatPrices: seatPricesList,
		stadiumId,
	} = location.state;

	const totalAmount = calculateTotalPrice(selectedSeats, seatPricesList);

	const { data: seatDataResponse, status: seatsStatus } = useQuery<
		selectSeatsData,
		ApiError
	>({
		queryKey: ["selectSeats", stadiumId],
		queryFn: async () => fetchSeats(stadiumId),
		enabled: ready && !!stadiumId,
		staleTime: 60 * 1000,
		useErrorBoundary: true,
	});

	const { data: seatStateDataResponse, status: seatsStatus2 } = useQuery<
		seatStateData[],
		ApiError
	>({
		queryKey: ["seatsState", scheduleId],
		queryFn: () => fetchSeatsStates(scheduleId),
		enabled: ready && !!scheduleId,
		refetchOnWindowFocus: true,
		useErrorBoundary: true,
	});

	useEffect(() => {
		resetSelection();
	}, [resetSelection]);

	const CombineSeats = useMemo(
		() =>
			CombineSeatsWithState(
				seatDataResponse?.data.seats ?? [],
				seatStateDataResponse ?? []
			),
		[seatDataResponse, seatStateDataResponse]
	);

	const handleSelectSeat = (seatId: string) => {
		const seat = CombineSeats.find((s) => s.id === seatId);
		if (!seat || seat.isLocked) return;
		toggleSeat(seat);
	};

	if (!ready) {
		return (
			<WaitingRoom
				stadiumId={stadiumId}
				scheduleId={scheduleId}
				startAt={startAt}
				onDone={() => setReady(true)}
			/>
		);
	}

	if (seatsStatus === "loading" || seatsStatus2 === "loading")
		return <p>로딩 중</p>;

	return (
		<main className="bg-[#FBFBFB]">
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

							<div className="mt-8 border-t border-gray-200 pt-6 text-sm text-gray-600">
								총 가격:{" "}
								<span className="text-lg text-black font-semibold">
									{totalAmount.toLocaleString()}원
								</span>
							</div>
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
