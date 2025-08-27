const fetchConfirmPayment = async (
	reservationId: string,
	amount: number,
	paymentKey: string
) => {
	const res = await fetch("/api/v1/payments/confirm", {
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

	const json = await res.json();

	if (!res.ok) {
		const code = json?.code ?? "HTTP_ERROR";
		const message = json?.message ?? `status ${res.status}`;
		throw new Error(`code: ${code}, message: ${message}`);
	}

	return json;
};

export default fetchConfirmPayment;
