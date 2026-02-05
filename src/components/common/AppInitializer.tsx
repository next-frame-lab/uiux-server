// 앱 시작 시 카카오 SDK 초기화 컴포넌트
import { useEffect } from "react";
import { useAuthActions } from "../../store/authStore";

const apiUrl = process.env.KAKAO_JAVASCRIPT_KEY;

export default function AppInitializer({
	children,
}: {
	children: React.ReactNode;
}) {
	const { setKakaoSdkReady } = useAuthActions();

	useEffect(() => {
		if (window.Kakao && !window.Kakao.isInitialized()) {
			window.Kakao.init(apiUrl);
			setKakaoSdkReady(true);
		} else if (window.Kakao?.isInitialized()) {
			setKakaoSdkReady(true);
		}
	}, [setKakaoSdkReady]);

	return children;
}
