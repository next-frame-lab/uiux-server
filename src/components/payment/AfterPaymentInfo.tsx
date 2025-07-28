import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AfterPaymentInfoData } from "../../types/ApiDataTypes.ts";
import afterPaymentInfoData from "../__mocks__/AfterPaymentInfoData.ts";

export default function AfterPaymentInfo() {
	const [info, setInfo] = useState<AfterPaymentInfoData | null>(null);
	const navigate = useNavigate();

	const handleMove = () => {
		navigate("/mypage/reservation");
	};

	useEffect(() => {
		setInfo(afterPaymentInfoData);
	}, []);

	if (!info) return <p>결제 정보를 불러오는 중입니다..</p>;

	return (
		<>
			<h2>결제 성공!</h2>
			<p>공연명: {info.performance.name}</p>
			<p>공연 선택 일정: {info.performance.scheduleDate}</p>
			<p>공연 선택 시간: {info.performance.scheduleTime}</p>
			<h2> 좌석 정보</h2>
			<ul>
				{info.seats.map((seat) => (
					<li key={`${seat.section}-${seat.row}-${seat.column}`}>
						{seat.row}열 - {seat.column}번
					</li>
				))}
			</ul>
			<button type="button" onClick={handleMove}>
				확인하기
			</button>
		</>
	);
}
