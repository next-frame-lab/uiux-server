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

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<MainPage />} />
			<Route path="login" element={<LoginPage />} />
			<Route path="performance" element={<PerformancePage />} />
			<Route path="performance/detail" element={<PerformanceDetailPage />} />
		</Route>
	)
);

export default function AppRouter() {
	return <RouterProvider router={router} />;
}
