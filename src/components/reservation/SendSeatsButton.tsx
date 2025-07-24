import { seatData, seatReservationData } from "../../types/ApiDataTypes.ts";
import useElapsedTime from "../../hooks/useElapsedTime.ts";

interface SendSeatsButtonProps {
	performanceId: string;
	scheduleId: string;
	seatIdList: seatData[];
}

export default function SendSeatsButton({
	performanceId,
	scheduleId,
	seatIdList,
}: SendSeatsButtonProps) {
	const selectedSeatIds = seatIdList.map((seat) => seat.id);
	const elapsedTime = useElapsedTime();

	const handleSubmit = () => {
		if (elapsedTime > 600) {
			alert("예매 가능 시간 초과");
			window.location.reload();
			return;
		}

		const formData: seatReservationData = {
			performanceId,
			scheduleId,
			seatIdList: selectedSeatIds,
			elapsedTime,
		};

		console.log("요청 폼 데이터", formData);
	};

	return (
		<button
			type="button"
			onClick={handleSubmit}
			data-testid="send-seats-button"
			/** 단위 테스트하기 위해, 임시로 생성 & 추후 코드 구성할 때, window 객체 활용 */
			disabled={elapsedTime > 600}>
			예매하기
		</button>
	);
}
