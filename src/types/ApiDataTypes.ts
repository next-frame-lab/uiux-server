// 도메인별 타입 파일에서 re-export
// 기존 import 호환성을 유지하면서 점진적으로 도메인별 import로 전환 가능

export { type LoginResponse } from "./auth.ts";

export {
	type PerformanceListItem,
	type PerformancePagination,
	type PerformanceData,
	type PopularPerformanceData,
	type PerformanceDetailData,
	type ReviewItem,
	type ReviewPagination,
	type ReviewData,
	type CreateReviewData,
} from "./performance.ts";

export {
	type Stadium as stadium,
	type ScheduleItem as scheduleList,
	type SeatPrice as seatPrices,
	type ReviewItem as reviewList,
	type ReviewPagination as reviewPagination,
	type ReviewData as reviewData,
	type CreateReviewData as createReviewData,
} from "./performance.ts";

export {
	type SeatData,
	type SelectSeatsData,
	type SeatStateData,
	type SeatWithState,
	type ReservationPerformance,
	type ReservationSeat,
	type ReservationData,
	type ReservationRequest,
	type ReservationResponse,
} from "./reservation.ts";

export {
	type SeatData as seatData,
	type SelectSeatsData as selectSeatsData,
	type SeatStateData as seatStateData,
	type ReservationPerformance as reservationPerformance,
	type ReservationSeat as reservationSeats,
	type ReservationData as reservationData,
} from "./reservation.ts";

export {
	type BeforePaymentInfoData,
	type AfterPaymentInfoData,
	type ConfirmPaymentRequest,
	type ConfirmPaymentResponse,
} from "./payment.ts";
