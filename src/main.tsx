import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import AppInitializer from "./components/common/AppInitializer.tsx";

async function enableMocking() {
	if (import.meta.env.MODE !== "development") {
		return;
	}

	const { default: worker } = await import("./mocks/browser");

	return worker.start();
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
