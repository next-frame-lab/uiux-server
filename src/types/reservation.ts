/** 예약 가능한 좌석을 선택할 때 사용하는 데이터 타입입니다. */
export type SeatData = {
	id: string;
	section: string;
	row: number;
	column: number;
};

export interface SelectSeatsData {
	code: string;
	data: { seats: SeatData[] };
}

/** 좌석 잠금 상태 여부를 판단할 때 사용하는 데이터 타입입니다. */
export type SeatStateData = {
	id: string;
	isLocked: boolean;
};

export type SeatWithState = SeatData & { isLocked: boolean };

/** 좌석을 예약한 공연의 정보들을 불러올 때 사용하는 데이터 타입입니다. */
export type ReservationPerformance = {
	name: string;
	scheduleDate: string;
	scheduleTime: string;
};

export type ReservationSeat = {
	section: string;
	row: number;
	column: number;
};

export interface ReservationData {
	code: string;
	data: {
		reservationId: string;
		performance: ReservationPerformance;
		seats: ReservationSeat[];
		totalAmount: number;
	};
}

/** 선택한 좌석 요청을 보낼 때, 사용하는 데이터 타입입니다. */
export interface ReservationRequest {
	performanceId: string;
	scheduleId: string;
	seatIds: string[];
	elapsedTime: number;
	totalAmount: number;
}

/** 선택한 좌석 요청을 받을 때, 사용하는 데이터 타입입니다. */
export interface ReservationResponse {
	code: string;
	data: {
		reservationId: string;
		performance: ReservationPerformance;
		seats: ReservationSeat[];
		totalAmount: number;
	};
}
