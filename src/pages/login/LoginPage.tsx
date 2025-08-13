import Header from "../../components/layout/Header.tsx";

export default function LoginPage() {
	// 카카오 로그인 버튼 클릭 시 실행될 핸들러 함수입니다.
	const handleKakaoLogin = () => {
		if (window.Kakao) {
			window.Kakao.Auth.authorize({
				// 1단계에서 설정한 Redirect URI를 정확히 입력합니다.
				redirectUri: "http://localhost:5173/auth/kakao/callback",
			});
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* 상단 부분 */}
			<Header />

			{/* 하단 로그인 부분 */}
			<main className="flex flex-1 items-center justify-center bg-[#FBFBFB]">
				<div className="text-center space-y-6">
					<div>
						<h1 className="text-4xl font-semibold">로그인</h1>
						<p className="text-gray-500 mt-5">Please Log in to continue</p>
					</div>

					<div className="flex flex-col items-center space-y-3">
						<button type="button" onClick={handleKakaoLogin}>
							<img
								src="/icons/kakao_login.png"
								alt="Kakao"
								className="w-64 h-15"
							/>
						</button>
						<button type="button">
							<img
								src="/icons/naver_login.png"
								alt="naver"
								className="w-64 h-14"
							/>
						</button>
						<button type="button">
							<img
								src="/icons/google_login.png"
								alt="google"
								className="w-64 h-14"
							/>
						</button>
					</div>

					<p className="text-sm text-gray-500">
						Don’t have an account?{" "}
						<button type="button" className="text-blue-500 hover:underline">
							Sign up
						</button>
					</p>
				</div>
			</main>
		</div>
	);
}
