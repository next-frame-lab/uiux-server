import MainPageCarousel from "../../components/swiper/MainPageCarousel.tsx";
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";

export default function MainPage() {
	return (
		<div>
			{/*상단 부분*/}
			<Header />

			{/*중간 부분*/}
			<main className="bg-[#FBFBFB]">
				{/*공연 이미지들 정렬*/}
				<div className="max-w-7xl mx-auto py-16 px-3">
					{/*인기 공연 이미지 칸*/}
					{/*해당 캐러셀을 땡겨와 그대로 노출*/}
					<MainPageCarousel />
					<h2 className="text-2xl font-bold mb-8">Popular Shows</h2>

					{/* 5가지 공연 라인 */}
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

					{/* 5가지 공연 라인 */}
					<div className="flex gap-x-6 mb-16">
						{/* 첫 번째 공연 */}
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
			<Footer />
		</div>
	);
}
