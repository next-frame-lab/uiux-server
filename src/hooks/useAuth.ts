// 로그아웃 함수 컴스텀 훅
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { authState, userState } from "../recoil/auth.ts";

export default function useAuth() {
	const { isLoggedIn, user } = useRecoilValue(authState);
	const resetUser = useResetRecoilState(userState);
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("recoil-persist");

		resetUser();

		alert("로그아웃 되었습니다.");
		navigate("/");
	};

	return { isLoggedIn, user, logout };
}