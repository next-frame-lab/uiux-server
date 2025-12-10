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
import AboutPage from "../pages/about/AboutPage.tsx";
import KakaoRedirectPage from "../pages/auth/KakaoRedirectPage.tsx";
import SeatSelectPage from "../pages/reservation/SeatSelectPage.tsx";
import PaymentPage from "../pages/payment/PaymentPage.tsx";
import SuccessPage from "../pages/payment/SuccessPage.tsx";
import FailPage from "../pages/payment/FailPage.tsx";
import NotFoundPage from "../pages/common/NotFoundPage.tsx";
import ErrorBoundary from "../components/ui/ErrorBoundary.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route errorElement={<ErrorBoundary />}>
			<Route index element={<MainPage />} />
			<Route path="login" element={<LoginPage />} />
			<Route path="mypage" element={<MyPage />} />
			<Route path="about" element={<AboutPage />} />
			<Route path="auth">
				<Route path="kakao/callback" element={<KakaoRedirectPage />} />
			</Route>
			<Route path="performances">
				<Route index element={<PerformancePage />} />
				<Route path=":id">
					<Route index element={<PerformanceDetailPage />} />
					<Route path="seats" element={<SeatSelectPage />} />
				</Route>
			</Route>
			<Route path="payments">
				<Route index element={<PaymentPage />} />
				<Route path="success" element={<SuccessPage />} />
				<Route path="fail" element={<FailPage />} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Route>
	)
);

export default function AppRouter() {
	return <RouterProvider router={router} />;
}
