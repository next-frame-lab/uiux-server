import { useParams } from "react-router-dom";
import { scheduleList } from "../../types/ApiDataTypes.ts";
import performanceDetail from "../__mocks__/performanceDetailData.ts";

export default function ReservationPerformanceInfo() {
	const { performanceId = "", scheduleId = "" } = useParams();

	if (performanceDetail.id !== performanceId) {
		return <p>공연 ID가 일치하지 않습니다. 잘못된 접근입니다.</p>;
	}

	const schedule: scheduleList | undefined =
		performanceDetail.scheduleList.find((s) => s.id === scheduleId);

	if (!schedule) {
		return <p>스케줄 ID가 일치하지 않습니다. 잘못된 접근입니다.</p>;
	}

	return (
		<>
			<h2>공연명</h2>
			<h3>{performanceDetail.name}</h3>
			{schedule && (
				<>
					<h2>선택 날짜</h2>
					<h3>{schedule.date}</h3>
					<h2>선택 시간</h2>
					<h3>{schedule.time}</h3>
				</>
			)}
			<h2>좌석 가격</h2>
			{performanceDetail.seatPrices.map((price) => (
				<div key={price.section}>
					<p>{price.section}</p>
					<p>{price.price.toLocaleString()}원</p>
				</div>
			))}
		</>
	);
}
