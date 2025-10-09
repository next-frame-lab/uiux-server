import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainPageCarousel from "../../components/swiper/MainPageCarousel.tsx";
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import Category from "../../components/layout/Category.tsx";
import { PerformanceListItem } from "../../types/ApiDataTypes.ts";
import fetchPopularPerformances from "../../api/popularPerformance.ts";

export default function MainPage() {
	const navigate = useNavigate();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["popularPerformances"],
		queryFn: () => fetchPopularPerformances(),
		staleTime: 1000 * 60,
	});

	const handleClick = (id: string, adultOnly: boolean) => {
		sessionStorage.setItem("adultOnly", String(adultOnly));
		navigate(`/performances/${id}`);
	};

	const performances: PerformanceListItem[] = data?.data.performances ?? [];

	return (
		<>
			<Header />
			<Category />
			<main className="bg-[#FBFBFB]">
				<MainPageCarousel />
				<div className="max-w-7xl mx-auto mb-6 px-4 md:px-6">
					<h2 className="text-2xl font-bold mt-12 mb-6 md:mt-16 md:mb-8">
						인기 공연
					</h2>

					{isLoading && (
						<p className="text-center py-10">
							공연 목록을 불러오는 중입니다...
						</p>
					)}

					{isError && (
						<div className="text-center py-10">
							<p className="text-red-500 font-semibold">오류가 발생했습니다.</p>
							<p className="text-gray-600 mt-2">
								{error instanceof Error ? error.message : "알 수 없는 에러"}
							</p>
						</div>
					)}

					{/* 공연 목록 */}
					<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
						{performances.map((performance) => (
							<div
								role="button"
								tabIndex={0}
								onClick={() =>
									handleClick(performance.id, performance.adultOnly)
								}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ")
										handleClick(performance.id, performance.adultOnly);
								}}
								key={performance.id}
								className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
								<img
									src={performance.imageUrl}
									alt={`${performance.name} 포스터`}
									className="w-full h-64 sm:h-72 lg:h-80 rounded-2xl mb-1 object-cover bg-gray-200"
								/>
								<div className="flex flex-col gap-y-2 p-2">
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
			<Footer />
		</>
	);
}
