// 로그인, 정보 조회를 위한 API 호출 함수 정의
import type { User } from "../recoil/auth.ts";
import { authedJSON, publicJSON } from "../lib/apiClient.ts";
import { LoginResponse } from "../types/ApiDataTypes.ts";
import getEnvVar from "../utils/env.ts";
const VITE_BACKEND_SRT_API = getEnvVar("VITE_BACKEND_SRT_API");

const loginWithKakao = async (authCode: string): Promise<LoginResponse> => {
	return publicJSON(`${VITE_BACKEND_SRT_API}/api/v1/auth/kakao/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			provider: "kakao",
			authCode,
		}),
	});
};

const fetchMyInfo = async (): Promise<User> => {
	return authedJSON(`${VITE_BACKEND_SRT_API}/api/v1/me`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
};

const authApi = {
	loginWithKakao,
	fetchMyInfo,
};

export default authApi;
