import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import fetchSeats from "../../../api/reservation/seats.ts";
import Countdown from "./Countdown.tsx";
import fetchSeatsStates from "../../../api/reservation/seatsStates.ts";
import { seatKeys } from "../../../api/queryKeys.ts";

interface WaitingRoomProps {
	stadiumId: string;
	scheduleId: string;
	duration: number;
	onDone: () => void;
}

export default function WaitingRoom({
	stadiumId,
	scheduleId,
	duration,
	onDone,
}: WaitingRoomProps) {
	const qc = useQueryClient();

	useEffect(() => {
		let cancelled = false;

		const prefetchAll = async () => {
			if (cancelled) return;

			await Promise.all([
				qc.prefetchQuery({
					queryKey: seatKeys.definitions(stadiumId),
					queryFn: () => fetchSeats(stadiumId),
					staleTime: 15 * 60 * 1000,
					cacheTime: 30 * 60 * 1000,
				}),
				qc.prefetchQuery({
					queryKey: seatKeys.states(scheduleId),
					queryFn: () => fetchSeatsStates(scheduleId),
					staleTime: 60 * 1000,
					cacheTime: 30 * 60 * 1000,
				}),
			]);
		};

		prefetchAll().catch(() => {});

		return () => {
			cancelled = true;
		};
	}, [stadiumId, qc]);

	return <Countdown duration={duration} onDone={onDone} />;
}
