export default function Header() {
	return (
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
				<button type="button" className="hover:bg-gray-200">
					Main
				</button>
				<button type="button" className="hover:bg-gray-200">
					Shows
				</button>
				<button type="button" className="hover:bg-gray-200">
					About Us
				</button>
				<button type="button" className="hover:bg-gray-200">
					My Page
				</button>
				<button
					type="button"
					className="bg-gray-100 px-5 py-2 rounded-full font-semibold hover:bg-gray-200">
					Login
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
		</header>
	);
}
