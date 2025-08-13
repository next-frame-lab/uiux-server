import { http, HttpResponse } from "msw";
import type { LoginResponse } from "../api/auth";

const mockLoginResponse: LoginResponse = {
	code: "SUCCESS",
	data: {
		accessToken: "mock-accessToken-12345-abcdefg",
		refreshToken: "mock-refreshToken-12345-abcdefg",
		imageUrl: "mockimage/user_1.png",
		name: "오준택",
		age: 25,
		email: "handsomegay@example.com",
	},
};

export const handlers = [
	http.post("/api/auth/kakao/login", () => {
		return HttpResponse.json(mockLoginResponse);
	}),
];
