import { http, HttpResponse } from "msw";
import type { LoginResponse } from "../api/auth";

const mockLoginResponse: LoginResponse = {
	code: "SUCCESS",
	data: {
		accessToken: "mock-accessToken-12345-abcdefg",
		refreshToken: "mock-refreshToken-12345-abcdefg",
		imageUrl: "https://cdn.example.com/profile/mock_user.jpg",
		name: "테스트 유저",
		age: 25,
		email: "test.user@example.com",
	},
};

export const handlers = [
	http.post("/api/auth/kakao/login", () => {
		return HttpResponse.json(mockLoginResponse);
	}),
];
