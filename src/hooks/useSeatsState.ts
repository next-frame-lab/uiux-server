import { useQuery } from "@tanstack/react-query";
import { seatStateData } from "../types/ApiDataTypes.ts";
import fetchSeatsStates from "../api/seatsStates.ts";

export default function useSeatsState(
	scheduleId: string,
	enabled: boolean,
	hasSelection: boolean
) {
	return useQuery<seatStateData[]>({
		queryKey: ["seatsState", scheduleId],
		queryFn: () => fetchSeatsStates(scheduleId),
		enabled,
		staleTime: 3000,
		refetchInterval: hasSelection ? 3000 : 5000,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
	});
}
