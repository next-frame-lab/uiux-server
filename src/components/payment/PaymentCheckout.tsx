import { useNavigate } from "react-router-dom";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import Debouncing from "../../utils/Debouncing.ts";
import useElapsedTime from "../../hooks/useElapsedTime.ts";

const apiUrl = process.env.TOSS_CLIENT_KEY ?? "";

const customerKey = `user-id`; // OAuth로 받은 user.id 값을 사용

export default function TossPaymentCheckout({
	reservationId,
	performanceName,
	totalAmount,
}: {
	reservationId: string;
	performanceName: string;
	totalAmount: number;
}) {
	// 토스 측에서 안내하는 type 정의가 보이지 않음.. 따라서, any로 우선 설정하되, ESLint 규칙에 의해 경고가 발생하지 않도록 주석 처리
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [payment, setPayment] = useState<any>(null);
	const [amount] = useState({
		currency: "KRW",
		value: totalAmount,
	});
	const navigate = useNavigate();
	const elapsedTime = useElapsedTime();

	useEffect(() => {
		if (elapsedTime > 600) {
			alert("결제 시간이 초과되었습니다. 처음부터 다시 시도해주세요.");
			navigate("/reservation");
			return;
		}

		async function fetchPayment() {
			try {
				const tossPayments = await loadTossPayments(apiUrl);

				// 회원 결제
				const paymentInfo = tossPayments.payment({
					customerKey,
				});

				// 비회원 결제
				// const payment = tossPayments.payment({ customerKey: ANONYMOUS });

				setPayment(paymentInfo);
			} catch (error) {
				console.error("Error fetching payment:", error);
			}
		}

		fetchPayment();
	}, [elapsedTime, navigate]); // 추 후, OAuth와 연결 시, customerKey가 들어갈 예정

	async function requestPayment() {
		// 결제 요청하기 전, orderId, amount를 서버에 저장
		// 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도
		await payment.requestPayment({
			method: "CARD",
			amount,
			orderId: reservationId, // 추후, reservationId로 변경
			orderName: performanceName, // 추후, performance.name 으로 변경
			successUrl: `${window.location.origin}/payments/success`,
			failUrl: `${window.location.origin}/payments/fail`,
			customerEmail: "example@gmail.com", // 추후, OAuth로 받은 user.email 값 사용
			customerName: "홍길동", // 추후, OAuth로 받은 user.name 값 사용
			card: {
				useEscrow: false,
				flowMode: "DEFAULT",
				useCardPoint: false,
				useAppCardOnly: false,
			},
		});
	}

	const debounceHandlePayment = Debouncing(requestPayment, 1000);

	return (
		<div className="mt-6">
			<button
				type="button"
				onClick={() => debounceHandlePayment()}
				className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3">
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
					/>
				</svg>
				<span>결제하기</span>
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>

			{/* 안내 문구 */}
			<p className="text-center text-sm text-gray-500 mt-4">
				결제 정보를 확인하신 후 결제 버튼을 눌러주세요
			</p>
		</div>
	);
}
