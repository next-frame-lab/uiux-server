import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import useAuth from "../../hooks/useAuth.ts";
import logoImage from "../../assets/images/logo.png";

export default function Header() {
	// 모바일 크기에서 햄버거 메뉴 상태를 관리하는 state
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const { isLoggedIn, logout } = useAuth();

	// 모바일 크기에서 햄버거 메뉴 링크 클릭 시 메뉴가 자동으로 닫힘
	const handleNavigate = (path: string) => {
		navigate(path);
		setIsMenuOpen(false);
	};

	const handleMyPageClick = () => {
		if (isLoggedIn) {
			navigate("/mypage");
		} else {
			alert("로그인이 필요한 서비스입니다.");
			navigate("/login");
		}
		setIsMenuOpen(false);
	};

	const handleLogout = () => {
		logout();
		setIsMenuOpen(false);
	};

	return (
		<header className="bg-[#FBFBFB] border-b border-[#E8EDF5] sticky top-0 z-50">
			<div className="max-w-screen-xl mx-auto flex items-center justify-between flex-wrap px-6 py-14 md:px-6">
				<button
					type="button"
					className="flex items-center gap-4 cursor-pointer"
					onClick={() => handleNavigate("/")}>
					<img
						src={logoImage}
						className="w-10 h-10"
						alt="NextFrame 로고 이미지입니다"
					/>
					<p className="text-2xl font-bold">NextFrame</p>
				</button>

				<nav className="hidden md:flex items-center justify-end flex-wrap gap-x-4 gap-y-2 md:gap-x-6">
					<button
						type="button"
						onClick={() => navigate("/")}
						className="hover:bg-gray-200">
						메인
					</button>

					<button
						type="button"
						onClick={() => navigate("/performances")}
						className="hover:bg-gray-200">
						공연
					</button>

					<button type="button" className="hover:bg-gray-200">
						회사 소개
					</button>

					<button
						type="button"
						onClick={handleMyPageClick}
						className="hover:bg-gray-200">
						마이페이지
					</button>

					{isLoggedIn ? (
						<button
							type="button"
							onClick={logout}
							className="px-5 py-2 font-semibold transition-colors bg-gray-100 text-black rounded-full hover:bg-gray-200">
							로그아웃
						</button>
					) : (
						<button
							type="button"
							onClick={() => navigate("/login")}
							className="px-5 py-2 font-semibold transition-colors bg-gray-100 rounded-full hover:bg-gray-200">
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

				{/* --- 2. 모바일용 햄버거 버튼 --- */}
				<div className="md:hidden">
					<button type="button" onClick={() => setIsMenuOpen(true)}>
						<Bars3Icon className="w-6 h-6" />
					</button>
				</div>
			</div>

			{/* --- 3. 모바일 사이드바 메뉴 --- */}
			<div
				className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
				<button
					type="button"
					className="absolute inset-0 bg-black bg-opacity-50"
					onClick={() => setIsMenuOpen(false)}
					aria-label="메뉴 닫기"
				/>

				<nav
					className={`absolute top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
					<div className="flex flex-col h-full">
						{/* 닫기 버튼 */}
						<div className="flex justify-end mb-8">
							<button type="button" onClick={() => setIsMenuOpen(false)}>
								<XMarkIcon className="w-6 h-6" />
							</button>
						</div>

						<div className="flex flex-col items-start gap-y-2 text-lg font-medium">
							<button
								type="button"
								onClick={() => handleNavigate("/")}
								className="py-3 w-full text-left hover:bg-gray-100 rounded-md px-3">
								메인
							</button>
							<button
								type="button"
								onClick={() => handleNavigate("/performances")}
								className="py-3 w-full text-left hover:bg-gray-100 rounded-md px-3">
								공연
							</button>
							<button
								type="button"
								className="py-3 w-full text-left hover:bg-gray-100 rounded-md px-3">
								회사 소개
							</button>
							<button
								type="button"
								onClick={handleMyPageClick}
								className="py-3 w-full text-left hover:bg-gray-100 rounded-md px-3">
								마이페이지
							</button>
						</div>

						<div className="w-full border-t border-gray-200 my-4" />

						{isLoggedIn ? (
							<button
								type="button"
								onClick={handleLogout}
								className="py-3 w-full text-left hover:bg-gray-100 rounded-md px-3 font-medium">
								로그아웃
							</button>
						) : (
							<button
								type="button"
								onClick={() => handleNavigate("/login")}
								className="py-3 w-full text-left hover:bg-gray-100 rounded-md px-3 font-medium">
								로그인
							</button>
						)}

						<div className="mt-auto flex justify-center gap-x-4">
							<button
								type="button"
								className="bg-gray-100 p-3 rounded-full font-semibold hover:bg-gray-200">
								<img
									src="/icons/change_mode.png"
									alt="모드 변경"
									className="w-6 h-6"
								/>
							</button>
							<button
								type="button"
								className="bg-gray-100 p-3 rounded-full font-semibold hover:bg-gray-200">
								<img
									src="/icons/change_language.png"
									alt="언어 변경"
									className="w-6 h-6"
								/>
							</button>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
}
