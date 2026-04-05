import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "../../components/carousel/HeroCarousel.tsx";
import MainCategoryBar from "../../components/main/MainCategoryBar.tsx";
import usePerformances from "../../hooks/usePerformances.ts";

const categoryGenreMap: Record<string, string | undefined> = {
	all: undefined,
	CONCERT: "CONCERT",
	MUSICAL: "MUSICAL",
	CHILDREN_THEATER: "CHILDREN_THEATER",
	DANCE: "DANCE",
	PLAY: "PLAY",
	OPERA: "OPERA",
};

const categoryLabelMap: Record<string, string> = {
	all: "전체",
	CONCERT: "콘서트",
	MUSICAL: "뮤지컬",
	CHILDREN_THEATER: "어린이극",
	DANCE: "무용",
	PLAY: "연극",
	OPERA: "오페라",
};

export default function MainPage() {
	const navigate = useNavigate();
	const [activeCategory, setActiveCategory] = useState("all");

	const genre = categoryGenreMap[activeCategory];
	const { data, status } = usePerformances(10, genre);

	const handleClick = (id: string, adultOnly: boolean) => {
		sessionStorage.setItem("adultOnly", String(adultOnly));
		navigate(`/performances/${id}`);
	};

	const performances =
		data?.pages.flatMap((page) => page.data.performances) ?? [];

	const sectionTitle =
		activeCategory === "all"
			? "인기 공연"
			: `인기 ${categoryLabelMap[activeCategory]}`;

	return (
		<>
			<HeroCarousel />
			<MainCategoryBar
				activeCategory={activeCategory}
				onCategoryChange={setActiveCategory}
			/>
			<div className="max-w-7xl mx-auto mb-6 px-4 md:px-6">
				<h2 className="text-3xl text-blue-950 mt-12 mb-6 md:mt-16 md:mb-8">
					{sectionTitle}
				</h2>

				{status === "loading" && (
					<p className="text-center py-10">공연 목록을 불러오는 중입니다...</p>
				)}

				{status === "error" && (
					<div className="text-center py-10">
						<p className="text-red-500 font-semibold">오류가 발생했습니다.</p>
					</div>
				)}

				{status === "success" && performances.length === 0 && (
					<p className="text-center py-10 text-gray-500">
						해당 카테고리의 인기 공연이 없습니다.
					</p>
				)}

				{/* 공연 목록 */}
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
					{performances.map((performance) => (
						<div
							role="button"
							tabIndex={0}
							key={performance.id}
							className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
							{/* 이미지 영역 */}
							<div className="relative overflow-hidden">
								<img
									src={performance.imageUrl}
									alt={`${performance.name} 포스터`}
									className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
								/>

								{/* 호버 시 그라데이션 오버레이 */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

								{/* 성인 전용 뱃지 */}
								{performance.adultOnly && (
									<div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
										19+
									</div>
								)}
							</div>

							{/* 정보 영역 */}
							<div className="p-4 space-y-2">
								<h3 className="font-bold text-base md:text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
									{performance.name}
								</h3>

								<div className="flex items-center gap-2 text-sm text-gray-600">
									<svg
										className="w-4 h-4 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									<span className="line-clamp-1">
										{performance.stadiumName}
									</span>
								</div>

								<div className="flex items-center gap-2 text-sm text-gray-500">
									<svg
										className="w-4 h-4 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
									<span className="text-xs line-clamp-1">
										{performance.startDate} ~ {performance.endDate}
									</span>
								</div>
							</div>

							{/* 하단 액션 영역 */}
							<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
								<button
									type="button"
									onClick={() =>
										handleClick(performance.id, performance.adultOnly)
									}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ")
											handleClick(performance.id, performance.adultOnly);
									}}
									className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
									예매하기
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
