import type { ReservationPerformance, ReservationSeat } from "./reservation.ts";

/** 예약한 좌석에 대한 결제 정보들을 불러올 때 사용하는 데이터 타입입니다.(결제 전) */
export interface BeforePaymentInfoData {
	performance: ReservationPerformance;
	seats: ReservationSeat[];
	totalAmount: number;
}

/** 예약한 좌석에 대한 결제 정보들을 불러올 때 사용하는 데이터 타입입니다.(결제 후) */
export interface AfterPaymentInfoData {
	performance: ReservationPerformance;
	seats: ReservationSeat[];
}

/** 결제 서버에 결제 승인 요청할 때 사용되는 데이터 타입입니다. */
export interface ConfirmPaymentRequest {
	orderId: string;
	amount: number;
	paymentKey: string;
}

/** 결제 서버에 결제 승인 응답을 받을 때 사용되는 데이터 타입입니다. */
export interface ConfirmPaymentResponse {
	code: string;
	data: {
		reservationId: string;
		totalAmount: number;
	};
	message: string;
}
