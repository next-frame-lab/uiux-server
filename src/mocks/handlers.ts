import { http, HttpResponse } from "msw";
import performanceData from "../components/__mocks__/performanceData.ts";
import performanceDetailData from "../components/__mocks__/performanceDetailData.ts";
import performanceReview from "../components/__mocks__/performanceReviewData.ts";
import {
	mockLoginResponse,
	mockUserData,
} from "../components/__mocks__/authData.ts";
import selectSeatsAllData from "../components/__mocks__/selectSeatsAllData.ts";
import seatsStateData from "../components/__mocks__/seatsStatesData.ts";
import reservationData from "../components/__mocks__/reservationData.ts";
import { ConfirmPaymentRequest } from "../types/ApiDataTypes.ts";

const handlers = [
	// performance - 공연 관련 API
	http.get(`/api/v1/performances`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const size = Number(url.searchParams.get("size") ?? 10);

		const startIndex = (page - 1) * size;
		const endIndex = startIndex + size;

		const slicedList = performanceData.data.performances.slice(
			startIndex,
			endIndex
		);

		return HttpResponse.json({
			code: "SUCCESS",
			data: {
				performances: slicedList,
			},
			pagination: {
				page,
				size,
				totalItems: performanceData.data.performances.length,
				totalPages: Math.ceil(performanceData.data.performances.length / size),
				hasNext: endIndex < performanceData.data.performances.length,
				hasPrevious: page > 1,
			},
		});
	}),

	http.get(`/api/v1/performances/:id`, ({ params }) => {
		const { id } = params;

		if (id === performanceDetailData.data.id)
			return HttpResponse.json(performanceDetailData);
	}),

	// Review - 공연 리뷰 관련 API
	http.get(`/api/v1/performances/:id/reviews`, () => {
		return HttpResponse.json(performanceReview);
	}),

	http.post("/api/v1/performances/:id/reviews", async () => {
		return HttpResponse.json({
			code: "SUCCESS",
			data: {
				id: "b8c9d3fa-2f1a-4a5d-9e2a-812f7a91cdef",
				createdAt: "2025-07-11T12:45:00",
			},
		});
	}),

	http.patch("/api/v1/reviews/:id", async () => {
		return HttpResponse.json({
			code: "SUCCESS",
			data: {
				id: "b8c9d3fa-2f1a-4a5d-9e2a-812f7a91cdef",
				updatedAt: "2025-07-11T12:45:00",
			},
		});
	}),

	http.delete("/api/v1/reviews/:id", () => {
		return HttpResponse.json({ success: true });
	}),

	http.post("/api/v1/reviews/:id/likes", async ({ request }) => {
		const { like } = (await request.json()) as { like: boolean };
		return HttpResponse.json({
			code: "SUCCESS",
			data: { likeStatus: like },
		});
	}),

	// 로그인 요청 핸들러입니다.
	http.post("/api/auth/kakao/login", () => {
		return HttpResponse.json(mockLoginResponse);
	}),

	// 사용자 정보 조회 요청 핸들러입니다.
	http.get("/api/me", ({ request }) => {
		const authorizationHeader = request.headers.get("Authorization");
		if (!authorizationHeader) {
			return new HttpResponse(null, {
				status: 401,
				statusText: "Unauthorized",
			});
		}
		return HttpResponse.json(mockUserData);
	}),

	http.get("/stadiums/:id/seat-definitions", () => {
		return HttpResponse.json(selectSeatsAllData);
	}),

	http.get("/schedules/:id/seat-states", () => {
		return HttpResponse.json(seatsStateData);
	}),

	http.post("/reservation", () => {
		return HttpResponse.json(reservationData);
	}),

	// 결제 승인 요청 핸들러입니다.
	http.post("/api/v1/payments/confirm", async ({ request }) => {
		const { orderId, amount, paymentKey } =
			(await request.json()) as ConfirmPaymentRequest;

		// 간단한 유효성 검사
		if (!orderId || !amount || !paymentKey) {
			return HttpResponse.json(
				{ code: "INVALID_REQUEST", message: "Invalid request parameters" },
				{ status: 400 }
			);
		}

		// 성공적인 결제 승인 응답 예시
		return HttpResponse.json({
			code: "SUCCESS",
			data: {
				reservationId: "resJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
				totalAmount: 10000,
			},
			message: null,
		});
	}),
];
export default handlers;
