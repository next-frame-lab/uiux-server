import MainPageCarousel from "../../components/swiper/MainPageCarousel.tsx";
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import Category from "../../components/layout/Category.tsx";

// 메인 화면에 보여질 mock 데이터
const popularPerformances = Array.from({ length: 10 }, (_, index) => ({
	id: index + 1,
	name: "햄릿",
	stadiumName: "서울예술의전당",
	startDate: "2025-08-01",
	endDate: "2025-08-31",
}));

export default function MainPage() {
	return (
		<>
			{/* 상단 부분 */}
			<Header />
			<Category />

			{/* 중간 부분 */}
			<main className="bg-[#FBFBFB]">
				<div className="max-w-7xl mx-auto py-16 px-4 md:px-6">
					<MainPageCarousel />
					<h2 className="text-2xl font-bold mt-12 mb-6 md:mt-16 md:mb-8">
						인기 공연
					</h2>

					{/* 반응형 구현부분 */}
					<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
						{popularPerformances.map((performance) => (
							<div key={performance.id}>
								<div className="h-64 bg-gray-200 rounded-2xl mb-3 sm:h-72 lg:h-80" />
								<div className="flex flex-col gap-y-2">
									<p className="font-bold text-base text-gray-900 break-all md:text-lg">
										{performance.name}
									</p>
									<p className="text-sm text-gray-800 break-all">
										{performance.stadiumName}
									</p>
									<p className="text-sm text-gray-500 break-all">
										{performance.startDate} ~ {performance.endDate}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>

			{/* 하단 부분 */}
			<Footer />
		</>
	);
}
