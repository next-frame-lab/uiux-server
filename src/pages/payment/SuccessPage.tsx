import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import fetchConfirmPayment from "../../api/confirmPayment.ts";

type PaymentData = {
	reservationId: string;
	totalAmount: number;
	raw: unknown;
};

export default function SuccessPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

	useEffect(() => {
		const reservationId = searchParams.get("orderId") ?? "";
		const amount = Number(searchParams.get("amount") ?? 0);
		const paymentKey = searchParams.get("paymentKey") ?? "";

		if (!reservationId || !amount || !paymentKey) {
			navigate("/payments/fail");
			return;
		}

		async function confirmPayment() {
			try {
				const json = await fetchConfirmPayment(
					reservationId,
					amount,
					paymentKey
				);

				if (json?.code && json.code !== "SUCCESS") {
					throw new Error(
						`code: ${json.code}, message: ${json.message ?? "결제 승인 실패"}`
					);
				}

				const d = json?.data ?? json ?? {};
				const normalized: PaymentData = {
					reservationId: d.reservationId ?? null,
					totalAmount: d.totalAmount ?? null,
					raw: d,
				};

				if (
					!normalized.reservationId ||
					!Number.isFinite(normalized.totalAmount)
				) {
					throw new Error(
						"code: INVALID_RESPONSE, message: 백엔드 응답 형식 오류"
					);
				}

				setPaymentData(normalized);
			} catch (err) {
				console.error("Error confirming payment:", err);
				navigate("/payments/fail");
			}
		}

		confirmPayment();
	}, [searchParams, navigate]);

	return (
		<div>
			<Header />

			{paymentData ? (
				<main className="bg-[#FBFBFB]">
					<div className="mx-auto flex max-w-2xl flex-col items-center gap-y-6">
						<div className="max-w-7xl mx-auto py-40">
							<h1 className="text-center text-5xl font-bold pb-28">
								결제 성공!
							</h1>

							<h2 className="text-center text-xl pb-10">
								결제 완료되었습니다! 마이 페이지나 이메일을 통해 QR코드를 확인할
								수 있습니다.
							</h2>

							{/* 확인 버튼 */}
							<div className="py-20">
								<button
									type="button"
									onClick={() => navigate("/mypage")}
									className="w-full rounded-lg bg-gray-200 py-3 text-lg font-bold text-shadow-black hover:bg-blue-200">
									확인하기
								</button>
							</div>
						</div>
					</div>
				</main>
			) : (
				<main className="bg-[#FBFBFB]">
					<div className="mx-auto flex max-w-2xl flex-col items-center gap-y-6">
						<div className="max-w-7xl mx-auto py-40">
							<h1 className="text-center text-5xl font-bold pb-28">
								승인 요청 중...
							</h1>

							<h2 className="text-center text-xl pb-10">
								잠시만 기다려주세요.
							</h2>
						</div>
					</div>
				</main>
			)}
			<Footer />
		</div>
	);
}
