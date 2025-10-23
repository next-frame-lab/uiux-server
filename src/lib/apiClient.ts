export type AppErrorCode = 400 | 401 | 404 | 500;

export type ApiError = Error & { status?: AppErrorCode };

export const statusMessage: Record<AppErrorCode, string> = {
	400: "잘못된 요청",
	401: "인증 실패",
	404: "리소스를 찾을 수 없음",
	500: "서버 내부 오류",
};

const makeError = (code: number, msg: string): ApiError => {
	const err = new Error(msg) as ApiError;
	err.status = code as AppErrorCode;
	return err;
};

export interface Options extends RequestInit {
	withAuth?: boolean;
	headers?: HeadersInit;
	body?: BodyInit | null;
}

export default async function requestJSON<T>(
	url: string,
	opts: Options = {}
): Promise<T> {
	const { withAuth = true, headers: userHeaders, ...rest } = opts;

	const headers = new Headers(userHeaders);

	if (withAuth) {
		const token = localStorage.getItem("accessToken");
		if (token && !headers.has("Authorization")) {
			headers.set("Authorization", `Bearer ${token}`);
		}
	}

	const res = await fetch(url, { ...rest, headers });

	const body = await res.json();

	if (!res.ok) {
		switch (res.status) {
			case 401:
				localStorage.removeItem("accessToken");
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

// Headers - Authorization이 필요 없는 경우
export function publicJSON<T>(url: string, opts: Omit<Options, "withAuth">) {
	return requestJSON<T>(url, { ...opts, withAuth: false });
}

// Headers - Authorization이 필요한 경우
export function authedJSON<T>(
	url: string,
	opts: Omit<Options, "withAuth"> = {}
) {
	return requestJSON<T>(url, { ...opts, withAuth: true });
}
