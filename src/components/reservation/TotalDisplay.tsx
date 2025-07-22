import { seatData, seatPrices } from "../../types/ApiDataTypes.ts";
import calculateTotalPrice from "../../utils/CalculatePrice.ts";

interface TotalPriceDisplayProps {
	selectedSeats: seatData[];
	seatPricesList: seatPrices[];
}

export default function TotalDisplay({
	selectedSeats,
	seatPricesList,
}: TotalPriceDisplayProps) {
	const totalPrice = calculateTotalPrice(selectedSeats, seatPricesList);

	return (
		<>
			<div>총 가격: {totalPrice.toLocaleString()}원</div>
		</>
	);
}
