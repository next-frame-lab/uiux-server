// API 요청 본문의 타입을 정의합니다.
interface LoginRequest {
	provider: "kakao";
	authCode: string;
}

// API 성공 응답의 전체 구조 타입을 정의합니다.
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

export const loginWithKakao = async (
	authCode: string
): Promise<LoginResponse> => {
	const requestBody: LoginRequest = {
		provider: "kakao",
		authCode,
	};

	// fetch 함수를 사용하여 백엔드 API에 POST 요청을 보냅니다.
	// '/api' 경로는 아래 Vite 프록시 설정을 통해 백엔드 서버 주소로 변환됩니다.
	const response = await fetch("/api/auth/kakao/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(requestBody),
	});

	// 응답이 성공적이지 않으면 에러를 발생시킵니다.
	if (!response.ok) {
		throw new Error("카카오 로그인 API 호출에 실패했습니다.");
	}

	// 성공적인 응답을 JSON 형태로 파싱하여 반환합니다.
	return response.json();
};
