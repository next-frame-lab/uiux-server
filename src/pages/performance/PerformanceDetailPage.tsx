import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPerformanceDetail from "../../api/performanceDetail.ts";
import PerformanceInfo from "../../components/performance/detail/PerformanceInfo.tsx";

export default function PerformanceDetailPage() {
	const { id } = useParams();
	const { data, isLoading, isError } = useQuery({
		queryKey: ["performanceDetail", id],
		queryFn: () => fetchPerformanceDetail(id as string),
		enabled: !!id,
	});

	if (isLoading) return <p>로딩 중...</p>;
	if (isError || !data) return <p>공연 정보를 불러올 수 없습니다.</p>;

	return (
		<div>
			<Header />
			<main className="bg-[#FBFBFB]">
				{isLoading && <p>로딩 중...</p>}
				{isError && <p>오류 발생</p>}
				{data && <PerformanceInfo performance={data} />}
			</main>
			<Footer />
		</div>
	);
}
