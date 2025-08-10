import { PerformanceDetailData } from "../../types/ApiDataTypes.ts";
import perfImage from "../../assets/images/Performance1.gif";

const performanceDetail: PerformanceDetailData = {
	id: "mock-1",
	image: perfImage,
	name: "오페라 유령",
	type: "로맨스",
	genre: "오페라",
	averageStar: 4.1,
	runningTime: 130,
	description:
		"전설적인 오페라의 유령이 다시 돌아옵니다. 아름다운 무대와 감동적인 음악을 함께 즐겨보세요.",
	adultOnly: true,
	stadium: {
		name: "부산문화회관",
		address: "부산광역시 남구 유엔로 123",
	},
	scheduleList: [
		{
			id: "1a2b3c4d-5e6f-7890-abcd-1234567890ef",
			date: "2025-09-10",
			time: "10:00",
		},
		{
			id: "1a2b3c4d-5e6f-7890-abcd-1234567890eg",
			date: "2025-09-10",
			time: "19:00",
		},
		{
			id: "1a2b3c4d-5e6f-7890-abcd-1234567890eh",
			date: "2025-09-11",
			time: "10:00",
		},
		{
			id: "1a2b3c4d-5e6f-7890-abcd-1234567890ei",
			date: "2025-09-11",
			time: "19:00",
		},
	],
	seatPrices: [
		{
			section: "A",
			price: 120000,
		},
		{
			section: "B",
			price: 100000,
		},
		{
			section: "C",
			price: 80000,
		},
	],
};

export default performanceDetail;
