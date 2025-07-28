interface PaymentMethodProps {
	selectedMethod: string;
	setSelectedMethod: (method: string) => void;
}

export default function PaymentMethod({
	selectedMethod,
	setSelectedMethod,
}: PaymentMethodProps) {
	const methods = ["kakao", "naver", "toss"];

	return (
		<div>
			<h2>결제 방식</h2>
			{methods.map((method) => (
				<button
					type="button"
					key={method}
					className={`mr-8 border ${selectedMethod === method ? "bg-gray-200" : "bg-white"}`}
					onClick={() => setSelectedMethod(method)}>
					{method.toUpperCase()} PAY
				</button>
			))}
		</div>
	);
}
