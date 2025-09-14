// 앱 시작 시 카카오 SDK 초기화 컴포넌트
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { kakaoSdkReadyState } from "../../recoil/auth.ts";

export default function AppInitializer({
	children,
}: {
	children: React.ReactNode;
}) {
	const setKakaoSdkReady = useSetRecoilState(kakaoSdkReadyState);

	useEffect(() => {
		if (window.Kakao && !window.Kakao.isInitialized()) {
			window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
			setKakaoSdkReady(true);
		} else if (window.Kakao?.isInitialized()) {
			setKakaoSdkReady(true);
		}
	}, [setKakaoSdkReady]);

	return children;
}
