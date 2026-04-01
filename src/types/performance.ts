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
export type Stadium = {
	id: string;
	name: string;
	address: string;
};

export type ScheduleItem = {
	id: string;
	date: string;
	time: string;
};

export type SeatPrice = {
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
		stadium: Stadium;
		performanceSchedules: ScheduleItem[];
		seatSectionPrices: SeatPrice[];
	};
}

/** 공연 리뷰 목록을 조회할 때 사용하는 데이터 타입입니다. */
export interface ReviewItem {
	id: string;
	writerName: string;
	writerProfileImageUrl: string;
	content: string;
	star: number;
	likeStatus: boolean;
	likeCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface ReviewPagination {
	page: number;
	size: number;
	totalItems: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
}

export interface ReviewData {
	code: string;
	data: {
		reviews: ReviewItem[];
		pagination: ReviewPagination;
	};
}

/** 공연 리뷰를 등록할 때 사용하는 데이터 타입입니다. */
export interface CreateReviewData {
	star: number;
	content: string;
}
