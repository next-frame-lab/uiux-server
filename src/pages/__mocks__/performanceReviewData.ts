import { reviewData } from "../../types/ApiDataTypes.ts";

const performanceReview: reviewData = {
	reviewList: [
		{
			id: "c8d1e2a7-4a5b-437b-9d90-7b1a2c3f1235",
			writerName: "뮤덕이",
			writerProfileImage: "https://cdn.example.com/profiles/user123.jpg",
			content: "정말 감동적인 공연이었어요. 무대 연출도 최고!",
			likeStatus: false,
			likeCount: 21,
			createdAt: "2025-07-01 14:32:00",
		},
		{
			id: "c8d1e2a7-4a5b-437b-9d90-7b1a2c3f1239",
			writerName: "뮤덕삼",
			writerProfileImage: "https://cdn.example.com/profiles/user123.jpg",
			content: "재미없는 공연이었어요. 무대 연출도 별로.",
			likeStatus: true,
			likeCount: 2,
			createdAt: "2025-07-01 14:34:00",
		},
	],
	pagination: {
		page: 0,
		size: 5,
		totalItems: 88,
		totalPages: 18,
		hasNext: true,
		hasPrevious: true,
	},
};

export default performanceReview;
