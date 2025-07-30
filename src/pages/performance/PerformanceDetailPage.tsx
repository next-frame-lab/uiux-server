import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import fetchPerformanceDetail from "../../api/performanceDetail.ts";
import PerformanceInfo from "../../components/performance/detail/PerformanceInfo.tsx";
import { PerformanceDetailData } from "../../types/ApiDataTypes.ts";
import { ApiError } from "../../lib/apiClient.ts";
import AdultVerificationModal from "../../components/common/AdultVerificationModal.tsx";

export default function PerformanceDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const adult = sessionStorage.getItem("adultOnly") === "true";
	const isLoggedIn = !!localStorage.getItem("accessToken");

	const [confirmed, setConfirmed] = useState<boolean>(!adult);

	useEffect(() => {
		if (adult) {
			setConfirmed(sessionStorage.getItem("adultConfirmed") === "true");
		} else {
			setConfirmed(true);
		}
	}, [id, adult]);

	// 전체 이용가 : 바로 호출
	// 성인 이용가 : 모달 "들어가기" 후, 호출
	const enabled = useMemo(
		() => !!id && (!adult || confirmed),
		[id, adult, confirmed]
	);

	const { data, status } = useQuery<PerformanceDetailData, ApiError>({
		queryKey: ["performanceDetail", id],
		queryFn: () => fetchPerformanceDetail(id as string),
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		useErrorBoundary: true,
	});

	useEffect(() => {
		if (status === "success") {
			sessionStorage.removeItem("redirectTo");
			sessionStorage.removeItem("adultOnly");
			sessionStorage.removeItem("adultConfirmed");
		}
	}, [status]);

	const handleConfirm = () => {
		sessionStorage.setItem("redirectTo", `/performances/${id}`);
		if (!isLoggedIn) {
			sessionStorage.setItem("pendingIntent", "adult-confirm");
			navigate("/login", {
				replace: true,
				state: { redirectTo: `/performances/${id}` },
			});
			return;
		}

		sessionStorage.setItem("adultConfirmed", "true");
		setConfirmed(true);
	};
	const handleClose = () => navigate(-1);

	return (
		<div>
			<Header />
			<main className="bg-[#FBFBFB]">
				{adult && !confirmed && (
					<AdultVerificationModal
						isOpen
						onClose={handleClose}
						onConfirm={handleConfirm}
					/>
				)}
				{status === "loading" && <p>로딩 중</p>}
				{data && confirmed && <PerformanceInfo performance={data} />}
			</main>
			<Footer />
		</div>
	);
}
