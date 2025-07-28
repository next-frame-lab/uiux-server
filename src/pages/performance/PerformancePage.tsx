export default function PerformancePage() {
	return (
		<div>
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

			{/*중간 부분*/}
			<main className="bg-[#FBFBFB]">
				{/*공연 목록 제목 부분*/}
				<div className="max-w-7xl mx-auto py-16">
					<h1 className="text-3xl font-bold">공연 목록</h1>
				</div>

				{/*카테고리 부분*/}
				<div className="max-w-7xl mx-auto px-3 flex gap-27 space-x-3">
					<a className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						ALL
					</a>
					<a className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						Romance
					</a>
					<a className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						Horror
					</a>
					<a className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						Thriller
					</a>
					<a className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						Human
					</a>
					<a className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						Comedy
					</a>
					<a className="bg-gray-100 px-3 py-2 rounded-full font-semibold hover:bg-gray-200">
						Humor
					</a>
				</div>

				{/*공연 부분*/}
				{/*첫 번째 줄 공연*/}
				<div className="max-w-7xl mx-auto py-16 px-3">
					<div className="flex gap-x-6 mb-16">
						{/* 첫 번째 공연 */}
						<div className="flex-1">
							{/* 이미지 박스 */}
							<div className="h-80 bg-gray-200 rounded-2xl mb-3"></div>
							{/* 글 사이 간격 맞춤..?? P 태그끼리 */}
							<div className="flex flex-col gap-y-2">
								{/* brak-all 사용해서 제목이 늘어나도 이미지 고정 */}
								<p className="font-bold text-lg text-gray-900 break-all">
									와 이거 진짜 제목 길어도 줄 바꿈이 자동으로 가능하네 짱 신기
								</p>
								<p className="text-sm text-gray-800 break-all">
									서울예술의전당
								</p>
								<p className="text-sm text-gray-500 break-all">
									2025-08-01 ~ 2025-08-31
								</p>
							</div>
						</div>

						{/* 두 번째 공연 */}
						<div className="flex-1">
							<div className="h-80 bg-gray-200 rounded-2xl mb-3"></div>
							<div className="flex flex-col gap-y-2">
								<p className="font-bold text-lg text-gray-900 break-all">
									와 이거 진짜 제목 길어도 줄 바꿈이 자동으로 가능하네 짱 신기
								</p>
								<p className="text-sm text-gray-800 break-all">
									서울예술의전당
								</p>
								<p className="text-sm text-gray-500 break-all">
									2025-08-01 ~ 2025-08-31
								</p>
							</div>
						</div>

						{/* 세 번째 공연 */}
						<div className="flex-1">
							<div className="h-80 bg-gray-200 rounded-2xl mb-3"></div>
							<div className="flex flex-col gap-y-2">
								<p className="font-bold text-lg text-gray-900 break-all">
									와 이거 진짜 제목 길어도 줄 바꿈이 자동으로 가능하네 짱 신기
								</p>
								<p className="text-sm text-gray-800 break-all">
									서울예술의전당
								</p>
								<p className="text-sm text-gray-500 break-all">
									2025-08-01 ~ 2025-08-31
								</p>
							</div>
						</div>

						{/* 네 번째 공연 */}
						<div className="flex-1">
							<div className="h-80 bg-gray-200 rounded-2xl mb-3"></div>
							<div className="flex flex-col gap-y-2">
								<p className="font-bold text-lg text-gray-900 break-all">
									와 이거 진짜 제목 길어도 줄 바꿈이 자동으로 가능하네 짱 신기
								</p>
								<p className="text-sm text-gray-800 break-all">
									서울예술의전당
								</p>
								<p className="text-sm text-gray-500 break-all">
									2025-08-01 ~ 2025-08-31
								</p>
							</div>
						</div>

						{/* 다섯 번째 공연 */}
						<div className="flex-1">
							<div className="h-80 bg-gray-200 rounded-2xl mb-3"></div>
							<div className="flex flex-col gap-y-2">
								<p className="font-bold text-lg text-gray-900 break-all">
									와 이거 진짜 제목 길어도 줄 바꿈이 자동으로 가능하네 짱 신기
								</p>
								<p className="text-sm text-gray-800 break-all">
									서울예술의전당
								</p>
								<p className="text-sm text-gray-500 break-all">
									2025-08-01 ~ 2025-08-31
								</p>
							</div>
						</div>
					</div>

					{/*두 번째 줄 공연*/}
					<div className="flex gap-x-6 mb-16">
						{/* 첫 번째 공연 */}
						<div className="flex-1">
							{/* 이미지 박스 */}
							<div className="h-80 bg-gray-200 rounded-2xl mb-3"></div>
							{/* 글 사이 간격 맞춤..?? P 태그끼리 */}
							<div className="flex flex-col gap-y-2">
								{/* brak-all 사용해서 제목이 늘어나도 이미지 고정 */}
								<p className="font-bold text-lg text-gray-900 break-all">
									와 이거 진짜 제목 길어도 줄 바꿈이 자동으로 가능하네 짱 신기
								</p>
								<p className="text-sm text-gray-800 break-all">
									서울예술의전당
								</p>
								<p className="text-sm text-gray-500 break-all">
									2025-08-01 ~ 2025-08-31
								</p>
							</div>
						</div>

						{/* 두 번째 공연 */}
						<div className="flex-1">
							<div className="h-80 bg-gray-200 rounded-2xl mb-3"></div>
							<div className="flex flex-col gap-y-2">
								<p className="font-bold text-lg text-gray-900 break-all">
									와 이거 진짜 제목 길어도 줄 바꿈이 자동으로 가능하네 짱 신기
								</p>
								<p className="text-sm text-gray-800 break-all">
									서울예술의전당
								</p>
								<p className="text-sm text-gray-500 break-all">
									2025-08-01 ~ 2025-08-31
								</p>
							</div>
						</div>

						{/* 세 번째 공연 */}
						<div className="flex-1">
							<div className="h-80 bg-gray-200 rounded-2xl mb-3"></div>
							<div className="flex flex-col gap-y-2">
								<p className="font-bold text-lg text-gray-900 break-all">
									와 이거 진짜 제목 길어도 줄 바꿈이 자동으로 가능하네 짱 신기
								</p>
								<p className="text-sm text-gray-800 break-all">
									서울예술의전당
								</p>
								<p className="text-sm text-gray-500 break-all">
									2025-08-01 ~ 2025-08-31
								</p>
							</div>
						</div>

						{/* 네 번째 공연 */}
						<div className="flex-1">
							<div className="h-80 bg-gray-200 rounded-2xl mb-3"></div>
							<div className="flex flex-col gap-y-2">
								<p className="font-bold text-lg text-gray-900 break-all">
									와 이거 진짜 제목 길어도 줄 바꿈이 자동으로 가능하네 짱 신기
								</p>
								<p className="text-sm text-gray-800 break-all">
									서울예술의전당
								</p>
								<p className="text-sm text-gray-500 break-all">
									2025-08-01 ~ 2025-08-31
								</p>
							</div>
						</div>

						{/* 다섯 번째 공연 */}
						<div className="flex-1">
							<div className="h-80 bg-gray-200 rounded-2xl mb-3"></div>
							<div className="flex flex-col gap-y-2">
								<p className="font-bold text-lg text-gray-900 break-all">
									와 이거 진짜 제목 길어도 줄 바꿈이 자동으로 가능하네 짱 신기
								</p>
								<p className="text-sm text-gray-800 break-all">
									서울예술의전당
								</p>
								<p className="text-sm text-gray-500 break-all">
									2025-08-01 ~ 2025-08-31
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/*하단 부분*/}
			<footer className="flex flex-col items-center w-full gap-y-4 px-10 py-13 text-white bg-black">
				<div className="flex gap-x-50">
					<p>About</p>
					<p>Contact</p>
					<p>Privacy Policy</p>
					<p>Terms of Service</p>
				</div>
				<div>
					<p>@2025 Stage Access. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
