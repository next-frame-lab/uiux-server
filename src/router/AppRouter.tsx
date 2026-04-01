import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import GlobalLayout from "../components/layout/GlobalLayout.tsx";
import RouteGuard from "./RouteGuard.tsx";
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
			{/* GlobalLayout: Header + Footer 자동 적용 */}
			<Route element={<GlobalLayout />}>
				{/* 누구나 접근 가능한 페이지 */}
				<Route index element={<MainPage />} />
				<Route path="about" element={<AboutPage />} />
				<Route path="performances">
					<Route index element={<PerformancePage />} />
					<Route path=":id" element={<PerformanceDetailPage />} />
				</Route>

				{/* 로그인 상태에서 접근 시 → / 리다이렉트 */}
				<Route element={<RouteGuard type="public" />}>
					<Route path="login" element={<LoginPage />} />
				</Route>

				{/* 비로그인 상태에서 접근 시 → /login 리다이렉트 */}
				<Route element={<RouteGuard type="private" />}>
					<Route path="mypage" element={<MyPage />} />
					<Route path="payments">
						<Route path="success" element={<SuccessPage />} />
						<Route path="fail" element={<FailPage />} />
					</Route>
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</Route>

			{/* Header/Footer 없이 전체화면으로 표시되는 페이지 */}
			<Route path="auth/kakao/callback" element={<KakaoRedirectPage />} />

			{/* 비로그인 상태에서 접근 시 → /login 리다이렉트 */}
			<Route element={<RouteGuard type="private" />}>
				<Route path="performances/:id/seats" element={<SeatSelectPage />} />
				<Route path="payments" element={<PaymentPage />} />
			</Route>
		</Route>
	)
);

export default function AppRouter() {
	return <RouterProvider router={router} />;
}
