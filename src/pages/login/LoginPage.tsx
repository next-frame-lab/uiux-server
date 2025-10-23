import Header from "../../components/layout/Header.tsx";

const apiUrl = process.env.KAKAO_REDIRECT_KEY;

export default function LoginPage() {
	const handleKakaoLogin = () => {
		if (window.Kakao) {
			window.Kakao.Auth.authorize({
				redirectUri: apiUrl,
			});
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* 상단 부분 */}
			<Header />

			{/* 하단 로그인 부분 */}
			<main className="flex flex-1 items-center justify-center bg-[#FBFBFB] p-4">
				<div className="w-full max-w-sm text-center space-y-6">
					<div>
						<h1 className="text-3xl md:text-4xl font-semibold">로그인</h1>
						<p className="text-gray-500 mt-2 md:mt-5">
							Please Log in to continue
						</p>
					</div>

					<div className="flex flex-col items-center space-y-3">
						<button type="button" onClick={handleKakaoLogin}>
							<img
								src="/icons/kakao_login.png"
								alt="Kakao"
								className="w-full h-auto max-w-[280px] md:w-60"
							/>
						</button>
						<button type="button">
							<img
								src="/icons/naver_login.png"
								alt="naver"
								className="w-full h-auto max-w-[280px] md:w-60"
							/>
						</button>
						<button type="button">
							<img
								src="/icons/google_login.png"
								alt="google"
								className="w-full h-auto max-w-[280px] md:w-60"
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
