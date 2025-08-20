import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import MainPage from "../pages/main/MainPage.tsx";
import LoginPage from "../pages/login/LoginPage.tsx";
import PerformancePage from "../pages/performance/PerformancePage.tsx";
import PerformanceDetailPage from "../pages/performance/PerformanceDetailPage.tsx";
import MyPage from "../pages/mypage/MyPage.tsx";
import KakaoRedirectPage from "../pages/auth/KakaoRedirectPage.tsx";
import SeatSelectPage from "../pages/reservation/SeatSelectPage.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<MainPage />} />
			<Route path="login" element={<LoginPage />} />
			<Route path="mypage" element={<MyPage />} />
			<Route path="auth/kakao/callback" element={<KakaoRedirectPage />} />
			<Route path="performances" element={<PerformancePage />} />
			<Route path="performances/:id" element={<PerformanceDetailPage />} />
			<Route path="performances/:id/seats" element={<SeatSelectPage />} />
		</Route>
	)
);

export default function AppRouter() {
	return <RouterProvider router={router} />;
}
