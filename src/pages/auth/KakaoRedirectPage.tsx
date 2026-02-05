import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authApi from "../../api/auth.ts";
import { useAuthActions } from "../../store/authStore";
import getUserIdFromToken from "../../utils/auth.ts";

export default function KakaoRedirectPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const { setUser } = useAuthActions();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const handleLogin = async (authCode: string) => {
			try {
				const response = await authApi.loginWithKakao(authCode);
				const { accessToken, refreshToken, ...userData } = response.data;

				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", refreshToken);

				const userId = getUserIdFromToken(accessToken);

				setUser({
					id: userId ?? "",
					...userData,
				});

				const intent = sessionStorage.getItem("pendingIntent");
				if (intent === "adult-confirm") {
					sessionStorage.setItem("adultConfirmed", "true");
					sessionStorage.removeItem("pendingIntent");
				}

				const fromState = searchParams.get("state");
				const redirectTo =
					fromState || sessionStorage.getItem("redirectTo") || "/";

				navigate(redirectTo, { replace: true });
			} catch (error) {
				console.error("로그인에 실패했습니다:", error);
				alert("로그인에 실패했습니다. 문제가 지속되면 관리자에게 문의하세요.");
				navigate("/login");
			} finally {
				setIsLoading(false);
			}
		};

		const code = searchParams.get("code");

		if (code) {
			handleLogin(code);
		} else {
			alert("비정상적인 접근입니다.");
			navigate("/login");
		}
	}, [navigate, searchParams, setUser]);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
				<div className="max-w-md w-full">
					<div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
						{/* 카카오 로고 + 로딩 애니메이션 */}
						<div className="flex justify-center mb-6">
							<div className="relative">
								{/* 카카오 색상 원형 배경 */}
								<div className="w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center">
									<svg
										className="w-12 h-12 text-gray-800"
										viewBox="0 0 24 24"
										fill="currentColor">
										<path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.7 1.74 5.04 4.35 6.48l-1.26 4.62c-.09.33.24.6.54.42l5.43-3.6c.48.06.96.09 1.44.09 5.52 0 9.99-3.48 9.99-7.8S17.52 3 12 3z" />
									</svg>
								</div>
								{/* 회전 애니메이션 */}
								<div className="absolute inset-0 w-20 h-20 border-4 border-yellow-200 border-t-yellow-400 rounded-full animate-spin" />
							</div>
						</div>

						{/* 제목 */}
						<h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-3">
							카카오 로그인 중
						</h1>

						{/* 설명 */}
						<p className="text-center text-base text-gray-600 mb-6">
							로그인을 처리하고 있습니다.
							<br />
							잠시만 기다려주세요...
						</p>

						{/* 진행 바 */}
						<div className="bg-gray-200 rounded-full h-2 overflow-hidden">
							<div className="bg-yellow-400 h-full rounded-full animate-pulse w-3/4" />
						</div>

						{/* 안내 */}
						<div className="mt-6 text-center">
							<p className="text-sm text-gray-500">
								페이지를 새로고침하거나 닫지 말아주세요
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return null;
}
