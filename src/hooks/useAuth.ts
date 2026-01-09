// 로그아웃 함수 커스텀 훅
import { useNavigate } from "react-router-dom";
import { useAuthState, useAuthActions } from "../store/authStore.ts";

export default function useAuth() {
	const { isLoggedIn, user } = useAuthState();
	const { resetUser } = useAuthActions();
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("auth-storage");
		sessionStorage.removeItem("adultConfirmed");

		resetUser();

		alert("로그아웃 되었습니다.");
		navigate("/");
	};

	return { isLoggedIn, user, logout };
}
