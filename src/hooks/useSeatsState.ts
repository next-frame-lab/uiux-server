import { useQuery } from "@tanstack/react-query";
import { seatStateData } from "../types/ApiDataTypes.ts";
import fetchSeatsStates from "../api/seatsStates.ts";

export default function useSeatsState(scheduleId: string, enabled: boolean) {
	return useQuery<seatStateData[]>({
		queryKey: ["seatsState", scheduleId],
		queryFn: () => fetchSeatsStates(scheduleId),
		enabled,
		refetchOnWindowFocus: true,
	});
}
