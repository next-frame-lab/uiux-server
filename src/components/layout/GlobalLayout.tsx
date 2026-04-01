// 전역 레이아웃: Header + 페이지 콘텐츠(Outlet) + Footer를 자동 적용
// React Router의 Layout Route 패턴을 활용하여, 하위 Route가 <Outlet /> 위치에 렌더링됨
import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

export default function GlobalLayout() {
	return (
		<div className="min-h-screen flex flex-col bg-[#FBFBFB]">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
