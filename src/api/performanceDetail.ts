import { PerformanceDetailData } from "../types/ApiDataTypes.ts";

const fetchPerformanceDetail = async (
	id: string
): Promise<PerformanceDetailData> => {
	const res = await fetch(`/performances/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) throw new Error("공연 상세 정보를 불러오지 못했습니다.");
	return res.json();
};

export default fetchPerformanceDetail;
