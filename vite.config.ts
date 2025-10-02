import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	const processEnv = Object.keys(env)
		.filter((key) => key.startsWith("VITE_"))
		.reduce(
			(acc, key) => {
				const newKey = key.replace(/^VITE_/, "");
				acc[`process.env.${newKey}`] = JSON.stringify(env[key]);
				return acc;
			},
			{} as Record<string, string>
		);

	return {
		plugins: [react(), tailwindcss()],
		server: {
			port: 15173,
		},
		define: processEnv,
	};
});
