// 로그인, 정보 조회를 위한 API 호출 함수 정의
import type { User } from "../recoil/auth.ts";
import { authedJSON, publicJSON } from "../lib/apiClient.ts";
import { LoginResponse } from "../types/ApiDataTypes.ts";

const apiUrl =
	process.env.MODE === "development"
		? process.env.BACKEND_DEVELOPMENT_SRT_API
		: process.env.BACKEND_SRT_API;

const loginWithKakao = async (authCode: string): Promise<LoginResponse> => {
	return publicJSON(`${apiUrl}/api/v1/auth/kakao/login`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			accept: "application/json",
		},
		body: JSON.stringify({
			provider: "kakao",
			authCode,
		}),
	});
};

const fetchMyInfo = async (): Promise<User> => {
	return authedJSON(`${apiUrl}/api/v1/me`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			accept: "application/json",
		},
	});
};

const authApi = {
	loginWithKakao,
	fetchMyInfo,
};

export default authApi;
