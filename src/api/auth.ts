// 로그인, 정보 조회를 위한 API 호출 함수 정의
import authFetch from "../lib/authClient.ts";
import type { User } from "../recoil/auth.ts";

export interface LoginResponse {
	code: string;
	data: {
		accessToken: string;
		refreshToken: string;
		imageUrl: string;
		name: string;
		age: number;
		email: string;
	};
}

const loginWithKakao = async (authCode: string): Promise<LoginResponse> => {
	return authFetch("/auth/kakao/login", {
		method: "POST",
		body: JSON.stringify({
			provider: "kakao",
			authCode,
		}),
	});
};

const fetchMyInfo = async (): Promise<User> => {
	return authFetch("/me", {
		method: "GET",
	});
};

const authApi = {
	loginWithKakao,
	fetchMyInfo,
};

export default authApi;
