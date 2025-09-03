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
		<main className="bg-[#FBFBFB] py-5">
			<div className="max-w-7xl mx-auto py-40 flex flex-col items-center gap-y-6">
				<h1 className="text-center text-5xl font-bold pb-2 w-full">결제</h1>

				<div className="flex flex-col w-full ">
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
