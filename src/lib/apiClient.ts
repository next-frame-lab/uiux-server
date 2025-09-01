export type AppErrorCode = 400 | 401 | 404 | 500;

export type ApiError = Error & { status?: AppErrorCode };

export const statusMessage: Record<AppErrorCode, string> = {
	400: "잘못된 요청",
	401: "인증 실패",
	404: "리소스를 찾을 수 없음",
	500: "서버 내부 오류",
};

const makeError = (code: number, msg: string) => {
	const err = new Error(msg) as Error & { status?: number };
	err.status = code;
	return err;
};

type Handle401 = () => void;

export default async function requestJSON<T>(
	input: RequestInfo,
	init?: RequestInit,
	onAuthorized?: Handle401 // 401 시, 호출되는 콜백 함수 (로그아웃/리다이렉트)
): Promise<T> {
	const res = await fetch(input, {
		...init,
		headers: {
			"Content-Type": "application/json",
		},
	});

	const body = await res.json();

	if (res.status !== 200) {
		switch (res.status) {
			case 401:
				onAuthorized?.();
				throw makeError(401, statusMessage[401]);
			case 400:
			case 404:
			case 500: {
				const msg = statusMessage[res.status as AppErrorCode];
				throw makeError(res.status, msg);
			}
			default:
				throw new Error(`Http Error: ${res.status}`);
		}
	}

	return body as T;
}
