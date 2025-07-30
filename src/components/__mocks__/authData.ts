// MOCK 사용자 데이터 정의
import { LoginResponse } from "../../types/ApiDataTypes.ts";

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
