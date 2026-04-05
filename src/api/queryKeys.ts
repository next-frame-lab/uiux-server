// Query Key Factory, 모든 TanStack Query의 queryKey를 중앙 관리

export const performanceKeys = {
	all: ["performances"] as const,
	lists: () => [...performanceKeys.all, "list"] as const,
	list: (size: number, genre?: string) =>
		[...performanceKeys.lists(), size, genre ?? "all"] as const,
	popular: () => [...performanceKeys.all, "popular"] as const,
	details: () => [...performanceKeys.all, "detail"] as const,
	detail: (id: string) => [...performanceKeys.details(), id] as const,
} as const;

export const reviewKeys = {
	all: ["reviews"] as const,
	lists: () => [...reviewKeys.all, "list"] as const,
	list: (performanceId: string) =>
		[...reviewKeys.lists(), performanceId] as const,
} as const;

export const seatKeys = {
	all: ["seats"] as const,
	definitions: (stadiumId: string) =>
		[...seatKeys.all, "definitions", stadiumId] as const,
	states: (scheduleId: string) =>
		[...seatKeys.all, "states", scheduleId] as const,
} as const;

export const paymentKeys = {
	all: ["payments"] as const,
	confirm: (reservationId: string) =>
		[...paymentKeys.all, "confirm", reservationId] as const,
} as const;
