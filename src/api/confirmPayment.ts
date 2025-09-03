import { authedJSON } from "../lib/apiClient.ts";
import { ConfirmPaymentResponse } from "../types/ApiDataTypes.ts";

const fetchConfirmPayment = async (
	reservationId: string,
	amount: number,
	paymentKey: string
) => {
	return authedJSON<ConfirmPaymentResponse>("/api/v1/payments/confirm", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			orderId: reservationId,
			amount,
			paymentKey,
		}),
	});
};

export default fetchConfirmPayment;
