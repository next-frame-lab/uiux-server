// 초기화 로직 관리용 컴포넌트
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { kakaoSdkReadyState } from "../../recoil/auth.ts";

// 이 컴포넌트는 눈에 보이는 UI 없이, 오직 앱 초기화 로직만 담당합니다.
export default function AppInitializer({
	children,
}: {
	children: React.ReactNode;
}) {
	const setKakaoSdkReady = useSetRecoilState(kakaoSdkReadyState);

	useEffect(() => {
		// Kakao 전역 객체가 존재하는지 확인합니다.
		if (window.Kakao) {
			// 초기화되지 않았다면 초기화를 진행합니다.
			if (!window.Kakao.isInitialized()) {
				try {
					window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
					console.log("Kakao SDK가 성공적으로 초기화되었습니다.");
					// 초기화 성공 시, Recoil 상태를 true로 변경하여 앱 전체에 알립니다.
					setKakaoSdkReady(true);
				} catch (e) {
					console.error("Kakao SDK 초기화 중 에러 발생:", e);
				}
			} else {
				// 이미 초기화된 경우에도 상태를 true로 설정합니다.
				setKakaoSdkReady(true);
			}
		} else {
			console.error("Kakao SDK를 찾을 수 없습니다.");
		}
	}, [setKakaoSdkReady]);

	return <>{children}</>;
}
