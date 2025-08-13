import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";

export default function Header() {
	const navigate = useNavigate();
	const { isLoggedIn, logout } = useAuth();

	return (
		<header className="bg-[#FBFBFB] border-b border-[#E8EDF5]">
			<div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-14">
				<div className="flex items-center gap-4">
					<img
						src="/src/assets/images/logo.png"
						className="w-10 h-10"
						alt="NextFrame 로고 이미지입니다"
					/>
					<p className="text-2xl font-bold">NextFrame</p>
				</div>
				<nav className="flex items-center gap-3 space-x-6">
					<button
						type="button"
						onClick={() => navigate("/")}
						className="hover:bg-gray-200">
						메인
					</button>

					<button type="button" className="hover:bg-gray-200">
						공연
					</button>

					<button type="button" className="hover:bg-gray-200">
						회사 소개
					</button>

					<button
						type="button"
						onClick={() => {
							if (isLoggedIn) {
								navigate("/mypage");
							} else {
								alert("로그인이 필요한 서비스입니다.");
								navigate("/login");
							}
						}}
						className="hover:bg-gray-200">
						마이페이지
					</button>

					{isLoggedIn ? (
						// 로그인 상태일 때: '로그아웃' 버튼 표시
						<button
							type="button"
							onClick={logout} // 클릭 시 useAuth 훅의 logout 함수를 실행합니다.
							className="px-5 py-2 font-semibold transition-colors bg-gray-100 text-black rounded-full hover:bg-gray-200">
							로그아웃
						</button>
					) : (
						// 로그아웃 상태일 때: '로그인' 버튼 표시
						<button
							type="button"
							onClick={() => navigate("/login")}
							className="px-5 py-2 font-semibold transition-colors bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
							로그인
						</button>
					)}

					<button
						type="button"
						className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						<img
							src="/icons/change_mode.png"
							alt="라이트모드/다크모드 변경용 버튼입니다"
						/>
					</button>

					<button
						type="button"
						className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						<img
							src="/icons/change_language.png"
							alt="언어 변경용 버튼입니다"
						/>
					</button>
				</nav>
			</div>
		</header>
	);
}
