/** 로그인하고 나서, 받는 로그인 응답 데이터 타입입니다. */
export interface LoginResponse {
	code: string;
	data: {
		accessToken: string;
		refreshToken: string;
		imageUrl: string;
		name: string;
		age: number;
		email: string;
	};
}

/** 공연 목록을 조회 및 검색하기 위한 데이터 타입입니다. */
export interface PerformanceListItem {
	id: string;
	name: string;
	imageUrl: string;
	type: string;
	genre: string;
	stadiumName: string;
	startDate: string;
	endDate: string;
	adultOnly: boolean;
}

export interface PerformancePagination {
	page: number;
	size: number;
	totalItems: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
}
/** 공연 목록을 조회하여 응답으로 받는 데이터 타입입니다. */
export interface PerformanceData {
	code: string;
	data: {
		performances: PerformanceListItem[];
	};
	pagination: PerformancePagination;
}

/** 인기 공연 목록을 조회하기 위한 데이터 타입입니다. */
export interface PopularPerformanceData {
	code: string;
	data: {
		performances: PerformanceListItem[];
	};
}

/** 공연 ID를 통해 공연의 상세 정보를 조회하는 데이터 타입입니다. */
export type stadium = {
	id: string;
	name: string;
	address: string;
};

export type scheduleList = {
	id: string;
	date: string;
	time: string;
};

export type seatPrices = {
	section: string;
	price: number;
};

export interface PerformanceDetailData {
	code: string;
	data: {
		id: string;
		imageUrl: string;
		name: string;
		type: string;
		genre: string;
		averageStar: number;
		runningTime: number;
		description: string;
		adultOnly: boolean;
		ticketOpenTime: string;
		ticketCloseTime: string;
		stadium: stadium;
		performanceSchedules: scheduleList[];
		seatSectionPrices: seatPrices[];
	};
}

/** 공연 리뷰 목록을 조회할 때 사용하는 데이터 타입입니다. */
export interface reviewList {
	id: string;
	writerName: string;
	writerProfileImageUrl: string;
	content: string;
	likeStatus: boolean;
	likeCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface reviewPagination {
	page: number;
	size: number;
	totalItems: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
}

export interface reviewData {
	code: string;
	data: {
		reviews: reviewList[];
		pagination: reviewPagination;
	};
}

/**  공연 리뷰를 등록할 때 사용하는 데이터 타입입니다. */
export interface createReviewData {
	star: number;
	content: string;
}

/** 예약 가능한 좌석을 선택할 때 사용하는 데이터 타입입니다. */
export type seatData = {
	id: string;
	section: string;
	row: number;
	column: number;
};

export interface selectSeatsData {
	code: string;
	data: { seats: seatData[] };
}

/** 좌석 잠금 상태 여부를 판단할 때 사용하는 데이터 타입입니다. */
export type seatStateData = {
	id: string;
	isLocked: boolean;
};

export type SeatWithState = seatData & { isLocked: boolean };

/** 좌석을 예약한 공연의 정보들을 불러올 때 사용하는 데이터 타입입니다. */
export type reservationPerformance = {
	name: string;
	scheduleDate: string;
	scheduleTime: string;
};

export type reservationSeats = {
	section: string;
	row: number;
	column: number;
};

export interface reservationData {
	code: string;
	data: {
		reservationId: string;
		performance: reservationPerformance;
		seats: reservationSeats[];
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
		performance: reservationPerformance;
		seats: reservationSeats[];
		totalAmount: number;
	};
}

/** 예약한 좌석에 대한 결제 정보들을 불러올 때 사용하는 데이터 타입입니다.(결제 전) */
export type paymentPerformance = {
	name: string;
	scheduleDate: string;
	scheduleTime: string;
};

export type paymentSeats = {
	section: string;
	row: number;
	column: number;
};

export interface BeforePaymentInfoData {
	performance: paymentPerformance;
	seats: paymentSeats[];
	totalAmount: number;
}

/** 예약한 좌석에 대한 결제 정보들을 불러올 때 사용하는 데이터 타입입니다.(결제 후) */
export interface AfterPaymentInfoData {
	performance: paymentPerformance;
	seats: paymentSeats[];
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
