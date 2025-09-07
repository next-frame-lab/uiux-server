import { selectSeatsData } from "../../types/ApiDataTypes.ts";

const SECTIONS = ["A", "B", "C", "D", "E", "F"];

const selectSeatsAllData: selectSeatsData = {
	code: "SUCCESS",
	data: {
		seats: SECTIONS.flatMap((section) =>
			Array.from({ length: 20 }, (_, row) =>
				Array.from({ length: 5 }, (__, col) => {
					return {
						id: `${section}-${row + 1}-${col + 1}`,
						section,
						row: row + 1,
						column: col + 1,
					};
				})
			).flat()
		),
	},
};

export default selectSeatsAllData;
