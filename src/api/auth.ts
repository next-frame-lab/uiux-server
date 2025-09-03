// 로그인, 정보 조회를 위한 API 호출 함수 정의
import type { User } from "../recoil/auth.ts";
import { authedJSON, publicJSON } from "../lib/apiClient.ts";
import { LoginResponse } from "../types/ApiDataTypes.ts";

const loginWithKakao = async (authCode: string): Promise<LoginResponse> => {
	return publicJSON(`/api/v1/auth/kakao/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			provider: "kakao",
			authCode,
		}),
	});
};

const fetchMyInfo = async (): Promise<User> => {
	return authedJSON(`/api/v1/me`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
};

const authApi = {
	loginWithKakao,
	fetchMyInfo,
};

export default authApi;
