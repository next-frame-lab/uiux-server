import {
	seatData,
	seatStateData,
	SeatWithState,
} from "../types/ApiDataTypes.ts";

export default function CombineSeatsWithState(
	seats: seatData[] = [],
	states: { seats: seatStateData[] } | seatStateData[] = []
): SeatWithState[] {
	const rawStates = Array.isArray(states) ? states : (states.seats ?? []);
	const lockMap = new Map(rawStates.map((s) => [s.id, s.isLocked]));

	return seats.map((seat) => ({
		...seat,
		isLocked: lockMap.get(seat.id) ?? false,
	}));
}
