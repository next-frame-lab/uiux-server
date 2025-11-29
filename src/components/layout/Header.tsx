import {
	useState,
	ChangeEvent,
	KeyboardEvent as ReactKeyboardEvent,
	useRef,
	useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import {
	Bars3Icon,
	XMarkIcon,
	MagnifyingGlassIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/solid";
import useAuth from "../../hooks/useAuth.ts";
import logoImage from "../../assets/images/logo.png";

export default function Header() {
	// 모바일 크기에서 햄버거 메뉴 상태를 관리하는 state
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	// 프로필 드롭다운 메뉴의 상태를 관리하는 state
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	// 검색어 상태를 관리하기 위한 state
	const [searchTerm, setSearchTerm] = useState<string>("");
	const navigate = useNavigate();
	// Recoil state에서 사용자 정보를 가져옵니다.
	const { user, logout } = useAuth();
	// 드롭다운 외부 클릭 감지를 위한 ref를 생성
	const dropdownRef = useRef<HTMLDivElement>(null);

	// 드롭다운 메뉴 링크 클릭 시 드롭다운를 닫는 헬퍼 함수
	const handleNavigateWithDropdown = (path: string) => {
		navigate(path);
		setIsDropdownOpen(false);
	};

	// 모바일 크기에서 햄버거 메뉴 링크 클릭 시 메뉴가 자동으로 닫힘
	const handleNavigate = (path: string) => {
		navigate(path);
		setIsMenuOpen(false);
	};
	const handleMyPageClick = () => {
		if (user) {
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

	const handleMyPageClickWithDropdown = () => {
		if (user) {
			navigate("/mypage");
		} else {
			alert("로그인이 필요한 서비스입니다.");
			navigate("/login");
		}
		setIsDropdownOpen(false);
	};

	const handleLogoutWithDropdown = () => {
		logout();
		setIsDropdownOpen(false);
	};

	// 검색 실행 함수
	const handleSearch = () => {
		if (!searchTerm.trim()) {
			alert("검색어를 입력해주세요.");
			return;
		}
		navigate(`/performances/search?query=${encodeURIComponent(searchTerm)}`);
		setIsMenuOpen(false);
	};

	// Enter 키를 누르면 검색 실행
	const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	// 드롭다운 메뉴 외부 클릭 시 메뉴를 닫는 useEffect
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		}

		function handleEscapeKey(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsDropdownOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscapeKey);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, []);

	return (
		<header className="bg-[#FBFBFB] border-b border-[#E8EDF5] sticky top-0 z-50">
			<div className="max-w-screen-xl mx-auto flex items-center justify-between flex-wrap px-6 py-14 md:px-6 gap-y-6">
				<div className="flex items-center gap-x-6">
					<button
						type="button"
						className="flex items-center gap-4 cursor-pointer"
						onClick={() => handleNavigate("/")}>
						<img src={logoImage} className="w-10 h-10" alt="NextFrame 로고" />
						<p className="text-2xl font-bold">NextFrame</p>
					</button>

					{/* 검색창 UI */}
					<div className="relative hidden md:block">
						<input
							type="text"
							value={searchTerm}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							placeholder="공연을 검색해보세요"
							className="w-48 lg:w-80 h-11 pl-4 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
						/>
						<button
							type="button"
							onClick={handleSearch}
							className="absolute top-0 right-0 h-full px-3.5 text-gray-500 hover:text-gray-800"
							aria-label="검색">
							<MagnifyingGlassIcon className="w-5 h-5" />
						</button>
					</div>
				</div>

				<nav className="hidden md:flex items-center justify-end flex-wrap gap-x-4 gap-y-2 md:gap-x-6">
					{user ? (
						// 로그인 상태
						<div className="relative" ref={dropdownRef}>
							<button
								type="button"
								onClick={toggleDropdown}
								className="flex items-center rounded-full focus:outline-none"
								aria-label="프로필 메뉴"
								aria-expanded={isDropdownOpen}
								aria-haspopup="true">
								<img
									className="h-10 w-10 rounded-full object-cover"
									src={user.imageUrl}
									alt="프로필 사진"
								/>
							</button>

							{/* 드롭다운 메뉴 */}
							{isDropdownOpen && (
								<div
									className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-fadeIn"
									role="menu">
									<div className="p-6 pb-4">
										<div className="flex items-center gap-x-2 mb-1">
											<h2 className="text-xl font-bold text-gray-900">
												{user.name}
											</h2>
										</div>
									</div>

									<div className="px-4 pb-4 space-y-1">
										<button
											type="button"
											onClick={handleMyPageClickWithDropdown}
											className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
											role="menuitem">
											<span className="text-gray-700 font-medium group-hover:text-gray-900">
												마이페이지
											</span>
											<ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
										</button>

										<button
											type="button"
											onClick={() => handleNavigateWithDropdown("/")}
											className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
											role="menuitem">
											<span className="text-gray-700 font-medium group-hover:text-gray-900">
												메인
											</span>
											<ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
										</button>

										<button
											type="button"
											onClick={() =>
												handleNavigateWithDropdown("/performances")
											}
											className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
											role="menuitem">
											<span className="text-gray-700 font-medium group-hover:text-gray-900">
												공연
											</span>
											<ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
										</button>

										<button
											type="button"
											onClick={handleLogoutWithDropdown}
											className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
											role="menuitem">
											<span className="text-gray-700 font-medium group-hover:text-gray-900">
												로그아웃
											</span>
											<ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
										</button>
									</div>
								</div>
							)}
						</div>
					) : (
						// 비로그인 상태
						<button
							type="button"
							onClick={() => navigate("/login")}
							className="px-5 py-2 font-semibold transition-colors bg-gray-100 rounded-full hover:bg-gray-200">
							로그인
						</button>
					)}
				</nav>

				{/* 모바일용 햄버거 버튼 */}
				<div className="md:hidden">
					<button type="button" onClick={() => setIsMenuOpen(true)}>
						<Bars3Icon className="w-6 h-6" />
					</button>
				</div>
			</div>

			{/* 모바일 사이드바 메뉴 */}
			<div
				className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
					isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}>
				<button
					type="button"
					className="absolute inset-0 bg-black bg-opacity-50"
					onClick={() => setIsMenuOpen(false)}
					aria-label="메뉴 닫기"
				/>

				<nav
					className={`absolute top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out ${
						isMenuOpen ? "translate-x-0" : "translate-x-full"
					}`}>
					<div className="flex flex-col h-full">
						{/* 닫기 버튼 */}
						<div className="flex justify-end mb-8">
							<button type="button" onClick={() => setIsMenuOpen(false)}>
								<XMarkIcon className="w-6 h-6" />
							</button>
						</div>

						{/* 모바일용 검색창 UI */}
						<div className="relative mb-6">
							<input
								type="text"
								value={searchTerm}
								onChange={handleChange}
								onKeyDown={handleKeyDown}
								placeholder="공연을 검색해보세요"
								className="w-full h-11 pl-4 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
							/>
							<button
								type="button"
								onClick={handleSearch}
								className="absolute top-0 right-0 h-full px-3.5 text-gray-500"
								aria-label="검색">
								<MagnifyingGlassIcon className="w-5 h-5" />
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
								onClick={handleMyPageClick}
								className="py-3 w-full text-left hover:bg-gray-100 rounded-md px-3">
								마이페이지
							</button>
						</div>

						<div className="w-full border-t border-gray-200 my-4" />

						{user ? (
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
					</div>
				</nav>
			</div>
		</header>
	);
}
