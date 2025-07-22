import { authedJSON } from "../lib/apiClient.ts";
import { ConfirmPaymentResponse } from "../types/ApiDataTypes.ts";

const { VITE_BACKEND_PAYMENT_API } = import.meta.env;

const fetchConfirmPayment = async (
	reservationId: string,
	amount: number,
	paymentKey: string
) => {
	return authedJSON<ConfirmPaymentResponse>(
		`${VITE_BACKEND_PAYMENT_API}/api/v1/payments/confirm`,
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
