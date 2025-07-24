import { useParams } from "react-router-dom";
import useSeatReservation from "../../hooks/useSeatReservation.ts";
import SeatSelector from "../../components/reservation/SeatSelector.tsx";
import { useQuery } from "@tanstack/react-query";
import selectSeatsAllData from "../../components/__mocks__/selectSeatsAllData.ts";
import {
	seatData,
	seatPrices,
	selectSeatsData,
} from "../../types/ApiDataTypes.ts";
import TotalDisplay from "../../components/reservation/TotalDisplay.tsx";
import performanceDetail from "../../components/__mocks__/performanceDetailData.ts";
import SendSeatsButton from "../../components/reservation/SendSeatsButton.tsx";
import { useEffect } from "react";
import ReservationPerformanceInfo from "../../components/reservation/ReservationPerformanceInfo.tsx";

export default function SeatReservationPage() {
	const { performanceId = "", scheduleId = "" } = useParams();
	const { data: seatDataResponse } = useQuery<selectSeatsData>({
		queryKey: ["selectSeats", performanceId],
		queryFn: async () => {
			return selectSeatsAllData;
		},
	});
	const { selectedSeats, selectedSeatIds, toggleSeat, resetSelection } =
		useSeatReservation();

	useEffect(() => {
		resetSelection();
	}, []);

	if (!seatDataResponse) {
		return <div>로딩 중...</div>;
	}

	const handleSelectSeat = (seatId: string) => {
		const seat = seatDataResponse.seatList.find((s) => s.id === seatId);
		if (seat) {
			toggleSeat(seat);
		}
	};

	return (
		<>
			<div>
				<h2> 좌석 선택 </h2>
				<SeatSelector
					seatList={seatDataResponse.seatList as seatData[]}
					selectedSeatIds={selectedSeatIds}
					onSelect={handleSelectSeat}
				/>
				<TotalDisplay
					selectedSeats={selectedSeats}
					seatPricesList={performanceDetail.seatPrices as seatPrices[]}
				/>
			</div>
			<div>
				<ReservationPerformanceInfo />
				<SendSeatsButton
					performanceId={performanceId}
					scheduleId={scheduleId}
					seatIdList={selectedSeats}
				/>
			</div>
		</>
	);
}
