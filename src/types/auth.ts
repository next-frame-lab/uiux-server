/** 로그인하고 나서, 받는 로그인 응답 데이터 타입입니다. */
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
