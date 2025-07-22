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
	grade: string;
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
