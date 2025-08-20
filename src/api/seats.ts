const fetchSeats = async (id: string) => {
	const res = await fetch(`/stadiums/${id}/seat-definitions`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) throw new Error("공연 목록을 불러오지 못했습니다.");
	return res.json();
};

export default fetchSeats;
