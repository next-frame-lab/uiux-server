import { useRouteError } from "react-router-dom";
import NotFoundPage from "../../pages/common/NotFoundPage.tsx";
import { ApiError, statusMessage } from "../../lib/apiClient.ts";

export default function ErrorBoundary() {
	const error = useRouteError();
	const e = error as ApiError;
	const status = e.status ?? 500;

	if (status === 404) return <NotFoundPage />;

	return (
		<div className="p-8 text-center">
			<h1 className="text-2xl font-bold">오류 {status}</h1>
			<p className="mt-2 text-gray-600">
				{statusMessage[status as 400 | 401 | 404 | 500] ?? e.message}
			</p>
		</div>
	);
}
