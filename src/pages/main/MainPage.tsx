import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchPerformances from "../../api/performance.ts";
import MainPageCarousel from "../../components/swiper/MainPageCarousel.tsx";
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import Category from "../../components/layout/Category.tsx";
import { PerformanceListItem } from "../../types/ApiDataTypes.ts";

export default function MainPage() {
	const [page, setPage] = useState(1);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["popularPerformances", page],
		queryFn: () => fetchPerformances(page, 10),
		keepPreviousData: true,
	});

	const performances: PerformanceListItem[] = data?.data.performances ?? [];
	const pagination = data?.pagination;

	return (
		<>
			<Header />
			<Category />
			<main className="bg-[#FBFBFB]">
				<div className="max-w-7xl mx-auto py-16 px-4 md:px-6">
					<MainPageCarousel />
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
							<div key={performance.id}>
								<img
									src={performance.imageUrl}
									alt={`${performance.name} 포스터`}
									className="w-full h-64 sm:h-72 lg:h-80 rounded-2xl mb-3 object-cover bg-gray-200"
								/>
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

					{/* 페이지네이션 */}
					<div className="flex justify-center items-center gap-x-4 mt-12">
						<button
							type="button"
							onClick={() => setPage((p) => p - 1)}
							disabled={page === 1}
							className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
							이전
						</button>
						<span>
							{page} / {pagination?.totalPages ?? 1}
						</span>
						<button
							type="button"
							onClick={() => setPage((p) => p + 1)}
							disabled={!pagination?.hasNext}
							className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
							다음
						</button>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
