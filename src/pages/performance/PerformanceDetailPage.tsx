import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import fetchPerformanceDetail from "../../api/performanceDetail.ts";
import PerformanceInfo from "../../components/performance/detail/PerformanceInfo.tsx";
import { PerformanceDetailData } from "../../types/ApiDataTypes.ts";
import { ApiError, AppErrorCode, statusMessage } from "../../lib/apiClient.ts";

export default function PerformanceDetailPage() {
	const { id } = useParams();

	const { data, status, error } = useQuery<PerformanceDetailData, ApiError>({
		queryKey: ["performanceDetail", id],
		queryFn: () => fetchPerformanceDetail(id as string),
		enabled: !!id,
	});

	if (status === "loading") return <p>로딩 중</p>;
	if (status === "error") {
		const code = error?.status as AppErrorCode | undefined;

		if (code) {
			return <p>에러 발생: {statusMessage[code]}</p>;
		}
		return <p> 알 수 없는 오류가 발생했습니다.</p>;
	}

	return (
		<div>
			<Header />
			<main className="bg-[#FBFBFB]">
				{data && <PerformanceInfo performance={data} />}
			</main>
			<Footer />
		</div>
	);
}
