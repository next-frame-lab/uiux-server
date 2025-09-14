import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import fetchSeats from "../../../api/seats.ts";
import Countdown from "./Countdown.tsx";
import fetchSeatsStates from "../../../api/seatsStates.ts";

interface WaitingRoomProps {
	stadiumId: string;
	scheduleId: string;
	startAt: Date;
	onDone: () => void;
}

export default function WaitingRoom({
	stadiumId,
	scheduleId,
	startAt,
	onDone,
}: WaitingRoomProps) {
	const qc = useQueryClient();

	useEffect(() => {
		let cancelled = false;

		const prefetchAll = async () => {
			if (cancelled) return;

			await Promise.all([
				qc.prefetchQuery({
					queryKey: ["seats", scheduleId],
					queryFn: () => fetchSeats(stadiumId),
					staleTime: 15 * 60 * 1000,
					cacheTime: 30 * 60 * 1000,
				}),
				qc.prefetchQuery({
					queryKey: ["seatStatus", scheduleId],
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

	return <Countdown target={startAt} onDone={onDone} />;
}
