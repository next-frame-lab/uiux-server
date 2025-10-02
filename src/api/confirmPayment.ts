import { authedJSON } from "../lib/apiClient.ts";
import { ConfirmPaymentResponse } from "../types/ApiDataTypes.ts";

const apiUrl = process.env.BACKEND_PAYMENT_API;

const fetchConfirmPayment = async (
	reservationId: string,
	amount: number,
	paymentKey: string
) => {
	return authedJSON<ConfirmPaymentResponse>(
		`${apiUrl}/api/v1/payments/confirm`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
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
