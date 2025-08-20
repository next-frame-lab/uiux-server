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
		<div className="text-sm text-gray-600">
			총 가격:{" "}
			<span className="text-lg text-black font-semibold">
				{totalPrice.toLocaleString()}원
			</span>
		</div>
	);
}
