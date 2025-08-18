import { http, HttpResponse } from "msw";
import performanceData from "../components/__mocks__/performanceData.ts";
import performanceDetailData from "../components/__mocks__/performanceDetailData.ts";
import performanceReview from "../components/__mocks__/performanceReviewData.ts";
import {
	mockLoginResponse,
	mockUserData,
} from "../components/__mocks__/authData.ts";

const handlers = [
	http.get(`/performances`, ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page") ?? 1);
		const size = Number(url.searchParams.get("size") ?? 10);

		const startIndex = (page - 1) * size;
		const endIndex = startIndex + size;

		const slicedList = performanceData.performanceList.slice(
			startIndex,
			endIndex
		);

		return HttpResponse.json({
			performanceList: slicedList,
			pagination: {
				page,
				size,
				totalItems: performanceData.performanceList.length,
				totalPages: Math.ceil(performanceData.performanceList.length / size),
				hasNext: endIndex < performanceData.performanceList.length,
				hasPrevious: page > 1,
			},
		});
	}),

	http.get(`/performances/:id`, ({ params }) => {
		const { id } = params;

		if (id !== performanceDetailData.id) {
			return HttpResponse.json(
				{ message: "해당 공연 정보를 찾을 수 없습니다." },
				{ status: 404 }
			);
		}

		return HttpResponse.json(performanceDetailData);
	}),

	http.get(`/performance/:id/reviews`, () => {
		return HttpResponse.json(performanceReview);
	}),

	http.post("/performance/:id/reviews", async () => {
		return HttpResponse.json({
			code: "SUCCESS",
			data: {
				id: "b8c9d3fa-2f1a-4a5d-9e2a-812f7a91cdef",
				createdAt: "2025-07-11T12:45:00",
			},
		});
	}),

	http.patch("/reviews/:id", async ({ request }) => {
		const { content } = (await request.json()) as { content: string };
		return HttpResponse.json({
			code: "SUCCESS",
			content,
		});
	}),

	http.delete("/reviews/:id", () => {
		return HttpResponse.json({ success: true });
	}),

	http.post("/reviews/:id/likes", async ({ request }) => {
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
];

export default handlers;
