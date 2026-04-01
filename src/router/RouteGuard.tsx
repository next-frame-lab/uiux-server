import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useIsLoggedIn } from "../store/authStore.ts";

interface RouteGuardProps {
	type: "private" | "public";
}

export default function RouteGuard({ type }: RouteGuardProps) {
	const isLoggedIn = useIsLoggedIn();
	const location = useLocation();

	if (type === "private" && !isLoggedIn) {
		return <Navigate to="/login" state={{ from: location.pathname }} replace />;
	}

	if (type === "public" && isLoggedIn) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
