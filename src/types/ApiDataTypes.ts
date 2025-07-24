/** 공연 목록을 조회 및 검색하기 위한 데이터 타입입니다. */
export interface PerformanceListItem {
	id: string;
	image: string;
	name: string;
	type: string;
	genre: string;
	stadiumName: string;
	startDate: string;
	endDate: string;
	averageStar: number;
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

export interface PerformanceData {
	performanceList: PerformanceListItem[];
	pagination: PerformancePagination;
}

/** 공연 ID를 통해 공연의 상세 정보를 조회하는 데이터 타입입니다. */
export type stadium = {
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
	id: string;
	image: string;
	name: string;
	type: string;
	genre: string;
	averageStar: number;
	runningTime: number;
	description: string;
	adultOnly: boolean;
	stadium: stadium;
	scheduleList: scheduleList[];
	seatPrices: seatPrices[];
}

/** 공연 리뷰 목록을 조회할 때 사용하는 데이터 타입입니다. */
export interface reviewList {
	id: string;
	writerName: string;
	writerProfileImage: string;
	content: string;
	likeStatus: boolean;
	likeCount: number;
	createdAt: string;
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
	reviewList: reviewList[];
	pagination: reviewPagination;
}

/** 예약 가능한 좌석을 선택할 때 사용하는 데이터 타입입니다. */
export type seatData = {
	id: string;
	section: string;
	row: number;
	column: number;
	isLocked: boolean;
};

export interface selectSeatsData {
	seatList: seatData[];
}

/** 좌석 예매를 하기 위한 데이터 타입입니다. */
export interface seatReservationData {
	performanceId: string;
	scheduleId: string;
	seatIdList: string[];
	elapsedTime: number;
}

/** 좌석을 예약한 공연의 정보들을 불러올 때 사용하는 데이터 타입입니다. */
export type reservationPerformance = {
	name: string;
	scheduleDate: string;
	scheduleTime: string;
};

export type reservationStadium = {
	name: string;
	address: string;
};

export type reservationSeats = {
	section: string;
	row: number;
	column: number;
};

export interface reservationData {
	id: string;
	performance: reservationPerformance;
	stadium: reservationStadium;
	seatList: reservationSeats[];
}
