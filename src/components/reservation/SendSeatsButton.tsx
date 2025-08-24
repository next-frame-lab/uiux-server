import useElapsedTime from "../../hooks/useElapsedTime.ts";
import { ReservationRequest } from "../../types/ApiDataTypes.ts";
import fetchPostReservation from "../../api/reservation.ts";

interface SendSeatsButtonProps {
	performanceId: string;
	scheduleId: string;
	seatIds: string[];
	totalAmount: number;
}

export default function SendSeatsButton({
	performanceId,
	scheduleId,
	seatIds,
	totalAmount,
}: SendSeatsButtonProps) {
	const elapsedTime = useElapsedTime();

	const handleSubmit = async () => {
		if (elapsedTime > 600) {
			alert("예매 가능 시간 초과");
			window.location.reload();
			return;
		}
		const formData: ReservationRequest = {
			performanceId,
			scheduleId,
			seatIds,
			totalAmount,
			elapsedTime,
		};

		try {
			await fetchPostReservation(formData);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<button
			type="button"
			className="w-full rounded-lg border border-blue-200 bg-blue-50 py-3 text-base font-bold text-gray-800 hover:bg-gray-300"
			onClick={handleSubmit}
			data-testid="send-seats-button"
			/** 단위 테스트하기 위해, 임시로 생성 & 추후 코드 구성할 때, window 객체 활용 */
			disabled={elapsedTime > 600}>
			예매하기
		</button>
	);
}
