export default function Header() {
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
				<nav className="lex items-center gap-3 space-x-6">
					<button type="button" className="hover:bg-gray-200">
						메인
					</button>
					<button type="button" className="hover:bg-gray-200">
						공연
					</button>
					<button type="button" className="hover:bg-gray-200">
						회사 소개
					</button>
					<button type="button" className="hover:bg-gray-200">
						마이페이지
					</button>
					<button
						type="button"
						className="bg-gray-100 px-5 py-2 rounded-full font-semibold hover:bg-gray-200">
						로그인
					</button>
					<button
						type="button"
						className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						<img
							src="/public/icons/change_mode.png"
							alt="라이트모드/다크모드 변경용 버튼입니다"
						/>
					</button>
					<button
						type="button"
						className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						<img
							src="/public/icons/change_language.png"
							alt="언어 변경용 버튼입니다"
						/>
					</button>
				</nav>
			</div>
		</header>
	);
}
