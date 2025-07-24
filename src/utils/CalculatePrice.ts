import { seatData, seatPrices } from "../types/ApiDataTypes.ts";

export default function calculateTotalPrice(
	selectedSeats: seatData[],
	seatPricesList: seatPrices[]
) {
	const priceMap = Object.fromEntries(
		seatPricesList.map((s) => [s.section, s.price])
	);

	return selectedSeats.reduce((sum, seat) => {
		const price = priceMap[seat.section];
		return sum + price;
	}, 0);
}
