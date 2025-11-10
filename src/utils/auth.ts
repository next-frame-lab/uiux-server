function getUserIdFromToken(token: string): string | null {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => {
					const hex = c.charCodeAt(0).toString(16);
					return `%${`00${hex}`.slice(-2)}`;
				})
				.join("")
		);
		const payload = JSON.parse(jsonPayload);

		return payload.sub || null;
	} catch (error) {
		console.error("토큰에서 사용자 ID를 추출하는 중 오류 발생:", error);
		return null;
	}
}

export default getUserIdFromToken;
