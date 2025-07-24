import { selectSeatsData } from "../../types/ApiDataTypes.ts";

const selectSeatsAllData: selectSeatsData = {
	seatList: [
		{
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa0",
			section: "A",
			row: 1,
			column: 1,
			isLocked: true,
		},
		{
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
			section: "B",
			row: 1,
			column: 2,
			isLocked: false,
		},
		{
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa2",
			section: "B",
			row: 1,
			column: 3,
			isLocked: false,
		},
		{
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
			section: "C",
			row: 1,
			column: 4,
			isLocked: true,
		},
		{
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa4",
			section: "A",
			row: 2,
			column: 1,
			isLocked: false,
		},
		{
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
			section: "A",
			row: 2,
			column: 2,
			isLocked: false,
		},
		{
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
			section: "B",
			row: 2,
			column: 3,
			isLocked: false,
		},
		{
			id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
			section: "C",
			row: 2,
			column: 4,
			isLocked: false,
		},
	],
};

export default selectSeatsAllData;
