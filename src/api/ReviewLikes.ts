const fetchReviewLikes = async (id: string, like: boolean) => {
	const res = await fetch(`/reviews/${id}/likes`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ like }),
	});

	if (!res.ok) throw new Error();
	return res.json();
};

export default fetchReviewLikes;
