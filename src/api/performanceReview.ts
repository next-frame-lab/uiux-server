const fetchPerformanceReview = async (id: string) => {
	const res = await fetch(`/performance/${id}/reviews`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) throw new Error("리뷰 데이터를 불러올 수 없습니다.");
	return res.json();
};

export default fetchPerformanceReview;
