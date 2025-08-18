// MOCK 사용자 데이터 정의
import type { LoginResponse } from "../../api/auth";

export const mockUserData = {
	imageUrl: "/mockimage/user_1.png",
	name: "오준택",
	age: 25,
	email: "handsomegay@example.com",
};

export const mockLoginResponse: LoginResponse = {
	code: "SUCCESS",
	data: {
		accessToken: "mock-accessToken-12345-abcdefg",
		refreshToken: "mock-refreshToken-12345-abcdefg",
		...mockUserData,
	},
};
