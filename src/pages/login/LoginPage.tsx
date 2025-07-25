export default function LoginPage() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/*상단 부분*/}
			<header className="flex items-center justify-between px-15 py-6 bg-[#FBFBFB] border-b border-[#E8EDF5]">
				<div className="flex items-center gap-4">
					<img
						src="/src/assets/images/logo.png"
						className="w-10 h-10"
						alt="NextFrame 로고 이미지입니다"
					/>
					<p className="text-xl font-bold">NextFrame</p>
				</div>
				<nav className="flex items-center gap-3 space-x-3">
					<a className="hover:bg-gray-200">Main</a>
					<a className="hover:bg-gray-200">Shows</a>
					<a className="hover:bg-gray-200">About Us</a>
					<a className="hover:bg-gray-200">My Page</a>
					<a className="bg-gray-100 px-5 py-2 rounded-full font-semibold hover:bg-gray-200">
						Login
					</a>
					<a className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						<img
							src="/public/icons/change_mode.png"
							alt="라이트모드/다크모드 변경용 버튼입니다"
						/>
					</a>
					<a className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						<img
							src="/public/icons/change_language.png"
							alt="언어 변경용 버튼입니다"
						/>
					</a>
				</nav>
			</header>

			{/*하단 로그인 부분*/}
			<main className="flex flex-1 items-center justify-center bg-[#FBFBFB]">
				<div className="text-center space-y-6">
					<div>
<<<<<<< HEAD
						<h1 className="text-4xl font-semibold">Login</h1>
=======
						<h1 className="text-4xl font-semibold">LogIn</h1>
>>>>>>> ec5912a (#4 feat(domain.login): 로그인 페이지 UI 구현)
						<p className="text-gray-500 mt-5">Please Log in to continue</p>
					</div>

					<div className="flex flex-col items-center space-y-3">
						<button>
							<img
								src="/public/icons/kakao_login.png"
								alt="Kakao"
								className="w-64 h-15"
							/>
						</button>
						<button>
							<img
								src="/public/icons/naver_login.png"
								alt="naver"
								className="w-64 h-14"
							/>
						</button>
						<button>
							<img
								src="/public/icons/google_login.png"
								alt="google"
								className="w-64 h-14"
							/>
						</button>
					</div>

					<p className="text-sm text-gray-500">
						Don’t have an account?{" "}
						<a className="text-blue-500 hover:underline">Sign up</a>
					</p>
				</div>
			</main>
		</div>
	);
}
