import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PayInformation from "../../components/payment/PayInformation.tsx";
import TossPaymentCheckout from "../../components/payment/PaymentCheckout.tsx";
import { ReservationResponse } from "../../types/ApiDataTypes.ts";

export default function PaymentPage() {
	const { state } = useLocation() as {
		state?: { reservation?: ReservationResponse };
	};

	const navigate = useNavigate();
	const reservation = state?.reservation;

	const invalid =
		!reservation || reservation.code !== "SUCCESS" || !reservation.data;

	useEffect(() => {
		if (invalid) {
			navigate(-1);
		}
		const token = localStorage.getItem("accessToken");
		if (!token) {
			navigate("/login");
		}
	}, [invalid, navigate]);

	if (invalid) return null;

	const { reservationId, totalAmount, performance } = reservation.data;

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* 헤더 */}
				<div className="text-center mb-8">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
						결제하기
					</h1>
					<p className="text-gray-600">
						예매 정보를 확인하고 결제를 진행해주세요
					</p>
				</div>

				<div className="space-y-6">
					<PayInformation reservation={reservation} />

					{/* 결제 버튼 */}
					<TossPaymentCheckout
						reservationId={reservationId}
						performanceName={performance.name}
						totalAmount={totalAmount}
					/>
				</div>
			</div>
		</main>
	);
}
