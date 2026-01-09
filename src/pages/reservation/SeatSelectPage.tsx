import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
	scheduleList,
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
	const [elapsedTime, setElapsedTime] = useState<number | null>(null);
	const [startTime] = useState(() => performance.now());
	const [ready, setReady] = useState(
		() =>
			typeof performance !== "undefined" &&
			typeof performance.getEntriesByType === "function" &&
			(
				performance.getEntriesByType("navigation")[0] as
					| PerformanceNavigationTiming
					| undefined
			)?.type === "reload"
	);

	const location = useLocation() as {
		key: string;
		state: {
			performanceId: string;
			performanceName: string;
			scheduleId: string;
			seatPrices: seatPrices[];
			stadiumId: string;
			performanceSchedules: scheduleList[];
		};
	};

	const {
		performanceId,
		performanceName,
		scheduleId,
		seatPrices: seatPricesList,
		stadiumId,
		performanceSchedules,
	} = location.state;

	const totalAmount = calculateTotalPrice(selectedSeats, seatPricesList);

	const { data: seatDataResponse, status: seatsStatus } = useQuery<
		selectSeatsData,
		ApiError
	>({
		queryKey: ["selectSeats", stadiumId],
		queryFn: async () => fetchSeats(stadiumId),
		enabled: !!stadiumId,
		staleTime: Infinity,
		useErrorBoundary: false,
	});

	const { data: seatStateDataResponse, status: seatsStateStatus } = useQuery<
		seatStateData[],
		ApiError
	>({
		queryKey: ["seatsState", scheduleId],
		queryFn: () => fetchSeatsStates(scheduleId),
		enabled: !!scheduleId,
		refetchOnWindowFocus: true,
		useErrorBoundary: false,
	});

	useEffect(() => {
		const navType = (
			performance.getEntriesByType("navigation")[0] as
				| PerformanceNavigationTiming
				| undefined
		)?.type;

		// 새로고침이 아닌 모든 경우에 WaitingRoom 다시 실행
		if (navType !== "reload") {
			setReady(false);
			resetSelection();
		}
	}, [scheduleId, location.key, resetSelection]);

	useEffect(() => {
		if (seatsStatus === "success" && seatsStateStatus === "success") {
			const endTime = performance.now();
			const elapsed = Math.max(endTime - startTime, 100);
			setElapsedTime(elapsed);
		}
	}, [seatsStatus, seatsStateStatus, startTime]);

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

	if (!ready && elapsedTime !== null) {
		return (
			<WaitingRoom
				stadiumId={stadiumId}
				scheduleId={scheduleId}
				duration={elapsedTime}
				onDone={() => setReady(true)}
			/>
		);
	}

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			{ready && (
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">
						{/* 좌석 선택 영역 */}
						<div className="space-y-6">
							{/* 제목 */}
							<div className="bg-white rounded-2xl shadow-lg p-6">
								<h1 className="text-3xl md:text-4xl font-bold text-gray-900">
									{performanceName}
								</h1>
							</div>

							{/* 좌석맵 */}
							<div className="bg-white rounded-2xl shadow-lg p-6">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-2xl font-bold text-gray-900">
										좌석 선택
									</h2>
									<div className="flex items-center gap-4 text-sm">
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 bg-gray-300 rounded" />
											<span className="text-gray-600">선택 가능</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 bg-red-600 rounded" />
											<span className="text-gray-600">선택 불가</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 bg-green-600 rounded" />
											<span className="text-gray-600">선택됨</span>
										</div>
									</div>
								</div>

								{/* SCREEN */}
								<div className="relative mb-8">
									<div className="w-full bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center rounded-lg p-4 shadow-xl">
										<div className="font-bold text-lg tracking-widest">
											SCREEN
										</div>
									</div>
									<div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-b from-gray-400/50 to-transparent blur-sm" />
								</div>

								{/* 좌석 선택 UI */}
								{seatDataResponse && (
									<div className="overflow-x-auto">
										<SeatSelector
											seatList={CombineSeats}
											selectedSeatIds={selectedSeatIds}
											onSelect={handleSelectSeat}
										/>
									</div>
								)}
							</div>
						</div>

						{/* 오른쪽 예약 패널 */}
						<div className="lg:sticky lg:top-28 lg:self-start">
							<div className="bg-white rounded-2xl shadow-lg p-4 space-y-4">
								{/* 공연 일정 & 관람 선택 시간 & 좌석 가격 안내 */}
								<ReservationInfo
									performanceSchedules={performanceSchedules}
									scheduleId={scheduleId}
									seatPrices={seatPricesList}
								/>

								{/* 총 가격 */}
								<div className="border-t border-gray-200 pt-4">
									<div className="flex items-center justify-between">
										<span className="text-lg font-semibold text-gray-700">
											총 결제금액
										</span>
										<div className="text-right">
											<div className="text-3xl font-bold text-blue-600">
												{totalAmount.toLocaleString()}
												<span className="text-lg text-gray-600 ml-1">원</span>
											</div>
										</div>
									</div>
								</div>

								{/* 결제하기 버튼 */}
								<SendSeatsButton
									performanceId={performanceId}
									scheduleId={scheduleId}
									seatIds={selectedSeatIds}
									totalAmount={totalAmount}
								/>
							</div>

							{/* 안내 문구 */}
							<div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
								<div className="flex items-start gap-3">
									<svg
										className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
										fill="currentColor"
										viewBox="0 0 20 20">
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
											clipRule="evenodd"
										/>
									</svg>
									<div className="text-sm text-blue-900 space-y-1">
										<p className="font-semibold">예매 안내</p>
										<ul className="list-disc list-inside space-y-1 text-blue-800">
											<li>최대 4석까지 선택 가능합니다</li>
											<li>결제 후 취소/변경이 불가합니다</li>
											<li>공연 시작 1시간 전까지 입장하세요</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
