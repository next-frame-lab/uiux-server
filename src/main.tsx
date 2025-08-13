import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import worker from "./mocks/browser.ts";

if (window.Kakao) {
	if (!window.Kakao.isInitialized()) {
		window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
	}
}

const queryClient = new QueryClient();

if (process.env.NODE_ENV === "development") {
	worker.start().then(() => {
		createRoot(document.getElementById("root")!).render(
			<StrictMode>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</StrictMode>
		);
	});
}
