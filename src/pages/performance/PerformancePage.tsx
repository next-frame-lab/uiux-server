import Footer from "../../components/layout/Footer.tsx";
import Header from "../../components/layout/Header.tsx";
import PerformanceCard from "../../components/performance/list/PerformanceCard.tsx";
import usePerformances from "../../hooks/usePerformances.ts";
import InfiniteScroll from "../../components/ui/InfiniteScroll.tsx";

export default function PerformancePage() {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		usePerformances();

	if (status === "loading") return <p>로딩 중</p>;
	if (status === "error") return <p>공연 목록을 불러오는 데 실패했습니다.</p>;

	const performances =
		data?.pages.flatMap((page) => page.performanceList) ?? [];
	return (
		<div>
			{/* 상단 부분 */}
			<Header />

			{/* 중간 부분 */}
			<main className="bg-[#FBFBFB]">
				{/* 카테고리 부분 */}
				<div className="flex items-center justify-center divide-x divide-gray-300 border-b border-[#E8EDF5] bg-gray-100 py-4">
					{["전체", "로맨스", "호러", "스릴러", "다큐", "코미디", "유머"].map(
						(genre) => (
							<button
								type="button"
								className="px-18 py-2 font-semibold hover:bg-gray-200"
								key={genre}>
								{genre}
							</button>
						)
					)}
				</div>

				{/* 공연 목록 제목 부분 */}
				<div className="max-w-7xl mx-auto py-16 px-3">
					<h1 className="text-3xl font-bold">공연 목록</h1>
				</div>

				{/* 공연 부분 */}
				<div className="max-w-7xl mx-auto">
					<InfiniteScroll
						hasMore={!!hasNextPage}
						onFetchNext={fetchNextPage}
						delay={1000}>
						<PerformanceCard performances={performances} />
						{isFetchingNextPage && <p>로딩 ui 보여주기</p>}
					</InfiniteScroll>
				</div>
			</main>

			{/* 하단 부분 */}
			<Footer />
		</div>
	);
}
