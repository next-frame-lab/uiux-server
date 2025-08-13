import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginWithKakao } from "../../api/auth.ts";

export default function KakaoRedirectPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	// useMutation 훅으로 로그인 API 요청을 관리합니다.
	const { mutate, isLoading } = useMutation({
		mutationFn: (authCode: string) => loginWithKakao(authCode), // 실제 API를 호출할 함수
		onSuccess: (response) => {
			// API 호출이 성공했을 때 실행될 로직
			const { accessToken, refreshToken, name } = response.data;

			console.log(`${name}님, 환영합니다!`);

			// 1. 발급받은 토큰을 안전한 곳에 저장합니다.
			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);

			// 2. 로그인 성공 후 메인 페이지로 이동합니다.
			navigate("/");
		},
		onError: (error) => {
			// API 호출이 실패했을 때 실행될 로직
			console.error("로그인에 실패했습니다:", error);
			alert("로그인에 실패했습니다. 문제가 지속되면 관리자에게 문의하세요.");
			navigate("/login"); // 실패 시 로그인 페이지로 돌려보냅니다.
		},
	});

	// 컴포넌트가 처음 렌더링될 때 URL에서 인가 코드를 추출하여 mutate 함수를 호출합니다.
	useEffect(() => {
		const code = searchParams.get("code");
		if (code) {
			mutate(code); // 인가 코드를 인자로 전달하여 API 호출을 트리거합니다.
		} else {
			console.error("URL에 인가 코드가 없습니다.");
			alert("비정상적인 접근입니다. 다시 시도해주세요.");
			navigate("/login");
		}
	}, [searchParams, mutate, navigate]);

	// 로딩 중일 때 사용자에게 피드백을 줍니다.
	if (isLoading) {
		return <div>로그인 처리 중입니다. 잠시만 기다려주세요...</div>;
	}

	// 로딩이 끝나면 이 페이지는 역할을 다했으므로 별도의 UI를 보여줄 필요가 없습니다.
	return null;
}
