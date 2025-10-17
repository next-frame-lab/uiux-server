import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import AppInitializer from "./components/common/AppInitializer.tsx";
import App from "./App.tsx";
import "./index.css";

async function enableMocking() {
	const isDev = import.meta.env.NODE_ENV === "development";
	const useMsw = process.env.USE_MSW === "true";

	if (!isDev || !useMsw) {
		return;
	}

	const { default: worker } = await import("./mocks/browser.ts");

	// 결제 SDK 사용으로 인한 문제 해결을 위해, unhandledRequest를 bypass로 설정
	await worker.start({
		onUnhandledRequest: "bypass",
	});
}

const queryClient = new QueryClient();

enableMocking().then(() => {
	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					<AppInitializer>
						<App />
					</AppInitializer>
				</QueryClientProvider>
			</RecoilRoot>
		</StrictMode>
	);
});
