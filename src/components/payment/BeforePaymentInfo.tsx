import { useEffect, useState } from "react";
import { BeforePaymentInfoData } from "../../types/ApiDataTypes.ts";
import beforePaymentInfoData from "../__mocks__/BeforePaymentInfoData.ts";
import PaymentMethod from "./PaymentMethod.tsx";
import PaymentButton from "./PaymentButton.tsx";
import useElapsedTime from "../../hooks/useElapsedTime.ts";

export default function BeforePaymentInfo() {
	const [method, setMethod] = useState("");
	const [info, setInfo] = useState<BeforePaymentInfoData | null>(null);
	const elapsedTime = useElapsedTime();

	useEffect(() => {
		// 실제로는, fetch API를 호출하여 데이터를 가져오는 로직이 들어갈 수 있습니다.
		setInfo(beforePaymentInfoData);
	}, []);

	if (!info) return <p>결제 정보를 불러오는 중입니다..</p>;

	return (
		<>
			{/* 결제 방식 선택 함수 */}
			<PaymentMethod selectedMethod={method} setSelectedMethod={setMethod} />
			<h2>결제 정보</h2>
			<p>공연명: {info.performance.name}</p>
			<p>공연 선택 일정: {info.performance.scheduleDate}</p>
			<p>공연 선택 시간: {info.performance.scheduleTime}</p>
			<p>총 결제 금액: {info.totalAmount}</p>
			<h2> 좌석 정보</h2>
			<ul>
				{info.seats.map((seat) => (
					<li key={`${seat.section}-${seat.row}-${seat.column}`}>
						{seat.row}열 - {seat.column}번
					</li>
				))}
			</ul>
			<PaymentButton paymentMethod={method} elapsedTime={elapsedTime} />
		</>
	);
}
