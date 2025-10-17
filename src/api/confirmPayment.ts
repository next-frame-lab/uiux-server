import { authedJSON } from "../lib/apiClient.ts";
import { ConfirmPaymentResponse } from "../types/ApiDataTypes.ts";

const apiUrl =
	process.env.MODE === "development"
		? process.env.BACKEND_DEVELOPMENT_PAYMENT_API
		: process.env.BACKEND_PAYMENT_API;

const fetchConfirmPayment = async (
	reservationId: string,
	amount: number,
	paymentKey: string
) => {
	return authedJSON<ConfirmPaymentResponse>(
		`${apiUrl}/api/v1/payments/confirm`,
		{
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json",
			},
			body: JSON.stringify({
				orderId: reservationId,
				amount,
				paymentKey,
			}),
		}
	);
};

export default fetchConfirmPayment;
