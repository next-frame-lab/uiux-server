const fetchPerformances = async (page: number) => {
	const res = await fetch(`/performances?page=${page}&size=10`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) throw new Error("공연 목록을 불러오지 못했습니다.");
	return res.json();
};

export default fetchPerformances;
