import { useEffect, useState } from "react"; // useState 추가
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginWithKakao } from "../../api/auth";
import { isLoggedInState, userState } from "../../recoil/auth";

export default function KakaoRedirectPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const setIsLoggedIn = useSetRecoilState(isLoggedInState);
	const setUser = useSetRecoilState(userState);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const handleLogin = async (authCode: string) => {
			try {
				const response = await loginWithKakao(authCode);
				const { accessToken, refreshToken, ...userData } = response.data;

				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", refreshToken);

				setIsLoggedIn(true);
				setUser(userData);

				console.log(`${userData.name}님, 환영합니다!`);

				navigate("/");
			} catch (error) {
				console.error("로그인에 실패했습니다:", error);
				alert("로그인에 실패했습니다. 문제가 지속되면 관리자에게 문의하세요.");
				navigate("/login");
			}
		};

		const code = searchParams.get("code");

		if (code) {
			handleLogin(code);
		} else {
			alert("비정상적인 접근입니다.");
			navigate("/login");
		}
	}, [navigate, searchParams, setIsLoggedIn, setUser]);

	if (isLoading) {
		return <div>로그인 처리 중입니다. 잠시만 기다려주세요...</div>;
	}

	return null;
}
