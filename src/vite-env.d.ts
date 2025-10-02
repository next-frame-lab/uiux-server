/// <reference types="vite/client" />
interface Window {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Kakao: any;
}

interface ImportMetaEnv {
	readonly VITE_BACKEND_SRT_API: string;
	readonly VITE_BACKEND_PAYMENT_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
