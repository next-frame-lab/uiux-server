const SECTIONS = ["A", "B", "C", "D", "E", "F"];

const seatsStatesData = {
	code: "SUCCESS",
	data: {
		seats: SECTIONS.flatMap((section) =>
			Array.from({ length: 20 }, (_, row) =>
				Array.from({ length: 5 }, (__, col) => {
					return {
						id: `${section}-${row + 1}-${col + 1}`,
						isLocked: Math.random() < 0.3,
					};
				})
			).flat()
		),
	},
};

export default seatsStatesData;
