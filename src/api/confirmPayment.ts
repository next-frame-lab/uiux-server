import { authedJSON } from "../lib/apiClient.ts";
import { ConfirmPaymentResponse } from "../types/ApiDataTypes.ts";
import getEnvVar from "../utils/env.ts";
const VITE_BACKEND_PAYMENT_API = getEnvVar("VITE_BACKEND_PAYMENT_API");

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
