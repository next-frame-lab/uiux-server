// Authorization 헤더를 자동 추가하는 API 클라이언트
interface FetchOptions extends RequestInit {
	headers?: Record<string, string>;
	// body?: unkonwn;
}

const authFetch = async (endpoint: string, options: FetchOptions = {}) => {
	const accessToken = localStorage.getItem("accessToken");
	const baseHeaders: Record<string, string> = {};

	if (accessToken) {
		baseHeaders.Authorization = `Bearer ${accessToken}`;
	}

	const finalOptions: RequestInit = {
		...options,
		headers: {
			...baseHeaders,
			...options.headers,
		},
	};

	const isPlainObject =
		options.body !== null &&
		typeof options.body === "object" &&
		options.body.constructor === Object;

	if (isPlainObject) {
		finalOptions.headers = {
			...finalOptions.headers,
			"Content-Type": "application/json",
		};
		finalOptions.body = JSON.stringify(options.body);
	} else {
		finalOptions.body = options.body;
	}

	const response = await fetch(`/api${endpoint}`, finalOptions);

	if (!response.ok) {
		const errorData = await response
			.json()
			.catch(() => ({ message: response.statusText }));
		throw new Error(errorData.message || "API 요청에 실패했습니다.");
	}

	return response.json();
};

export default authFetch;
