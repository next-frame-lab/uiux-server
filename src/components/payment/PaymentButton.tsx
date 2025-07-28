import { useNavigate } from "react-router-dom";
import Debouncing from "../../utils/Debouncing.ts";

interface PaymentButtonProps {
	paymentMethod: string;
	elapsedTime: number;
}

export default function PaymentButton({
	paymentMethod,
	elapsedTime,
}: PaymentButtonProps) {
	const navigate = useNavigate();

	const handlePayment = async () => {
		if (elapsedTime > 600) {
			alert("결제 시간이 초과되었습니다. 처음부터 다시 시도해주세요.");
			navigate("/reservation");
			return;
		}
		if (!paymentMethod) {
			alert("결제 방식을 선택해주세요.");
			return;
		}

		try {
			// 여기에 실제 결제 API 호출 로직을 추가.
			console.log(`${paymentMethod} 결제가 성공적으로 완료되었습니다.`);
			alert(`${paymentMethod} 결제가 성공적으로 완료되었습니다.`);
			navigate("/payment/success");
		} catch (error) {
			console.error("결제 처리 중 오류 발생:", error);
			alert("결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
			window.location.reload();
		}
	};

	const debounceHandlePayment = Debouncing(handlePayment, 1000);

	return (
		<button type="button" onClick={debounceHandlePayment}>
			결제하기
		</button>
	);
}
