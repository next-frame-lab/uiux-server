import Footer from "../../components/layout/Footer.tsx";
import Header from "../../components/layout/Header.tsx";
import usePerformances from "../../hooks/usePerformances.ts";
import InfiniteScroll from "../../components/ui/InfiniteScroll.tsx";
import { AppErrorCode, statusMessage } from "../../lib/apiClient.ts";
import Category from "../../components/layout/Category.tsx";

export default function PerformancePage() {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		error,
		isFetchingNextPage,
		status,
	} = usePerformances();

	if (status === "loading") return <p>로딩 중</p>;
	if (status === "error") {
		const code = error?.status as AppErrorCode | undefined;

		if (code) {
			return <p>에러 발생: {statusMessage[code]}</p>;
		}
		return <p> 알 수 없는 오류가 발생했습니다.</p>;
	}

	const performances =
		data?.pages.flatMap((page) => page.data.performances) ?? [];

	return (
		<div>
			{/* 상단 부분 */}
			<Header />

			{/* 중간 부분 */}
			<main className="bg-[#FBFBFB]">
				{/* 카테고리 부분 */}
				<Category />

				{/* 공연 목록 제목 부분 */}
				<div className="max-w-7xl mx-auto py-16 px-4 md:px-6">
					<h1 className="text-3xl font-bold mb-8">공연 목록</h1>

					{/* 공연 부분 - 반응형 그리드 및 무한 스크롤 적용 */}
					<InfiniteScroll
						hasMore={!!hasNextPage}
						onFetchNext={fetchNextPage}
						delay={1000}>
						{/* 반응형 그리드 클래스를 적용 */}
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
					</InfiniteScroll>
					{isFetchingNextPage && (
						<p className="text-center py-4">더 많은 공연을 불러오는 중...</p>
					)}
				</div>
			</main>
			{/* 하단 부분 */}
			<Footer />
		</div>
	);
}
