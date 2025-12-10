import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header.tsx";

const apiUrl =
	process.env.MODE === "development"
		? process.env.KAKAO_DEVELOPMENT_REDIRECT_KEY
		: process.env.KAKAO_REDIRECT_KEY;
const isMockMode = process.env.ENABLE_MSW === "true";

const buttonBaseClass =
	"w-full max-w-[300px] h-[45px] flex items-center justify-center gap-2 rounded-lg transition-colors";

export default function LoginPage() {
	const navigate = useNavigate();

	const handleKakaoLogin = () => {
		if (isMockMode) {
			navigate("/auth/kakao/callback?code=mockCode");
			return;
		}
		window.Kakao?.Auth.authorize({ redirectUri: apiUrl });
	};

	return (
		<div className="min-h-screen bg-[#FBFBFB] flex flex-col">
			<Header />
			<main className="flex flex-1 items-center justify-center p-4">
				<div className="w-full max-w-md text-center space-y-8">
					<div className="space-y-3">
						<h1 className="text-3xl md:text-4xl font-bold text-blue-950">
							로그인
						</h1>
						<p className="text-gray-500">소셜 계정으로 간편하게 로그인하세요</p>
					</div>
					<div className="flex flex-col items-center gap-3 px-4">
						<button
							type="button"
							onClick={handleKakaoLogin}
							className={`${buttonBaseClass} bg-[#FEE500] hover:bg-[#FDD800]`}>
							<img
								src="/icons/login/kakao_login.svg"
								alt="Kakao"
								width="18"
								height="18"
							/>
							<span className="text-[#191919] font-medium text-sm">
								카카오 로그인
							</span>
						</button>
						<button
							type="button"
							onClick={() => alert("네이버 로그인 기능 준비중입니다.")}
							className={`${buttonBaseClass} bg-[#03C75A] hover:bg-[#02b351]`}>
							<img
								src="/icons/login/naver_login.svg"
								alt="Naver"
								width="16"
								height="16"
							/>
							<span className="text-white font-medium text-sm">
								네이버 로그인
							</span>
						</button>
						<button
							type="button"
							onClick={() => alert("Google 로그인 기능 준비중입니다.")}
							className={`${buttonBaseClass} bg-white border border-gray-300 hover:bg-gray-50`}>
							<img
								src="/icons/login/google_login.svg"
								alt="Google"
								width="18"
								height="18"
							/>
							<span className="text-gray-700 font-medium text-sm">
								Google 로그인
							</span>
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
