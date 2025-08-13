// 로그아웃 로직을 담은 커스텀 훅
import { useRecoilValue, useResetRecoilState } from "recoil";
import { authState, userState } from "../recoil/auth.ts";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
	const { isLoggedIn, user } = useRecoilValue(authState);
	const resetUser = useResetRecoilState(userState);
	const navigate = useNavigate();

	// 로그아웃 함수를 정의합니다.
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
