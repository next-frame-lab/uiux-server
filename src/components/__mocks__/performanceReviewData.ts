import { reviewData } from "../../types/ApiDataTypes.ts";
import userImage from "../../assets/images/user.png";

const performanceReview: reviewData = {
	code: "SUCCESS",
	data: {
		reviews: [
			{
				id: "mock-accessToken-12345-abcdefg",
				writerName: "뮤덕이",
				writerProfileImageUrl: userImage,
				content: "정말 감동적인 공연이었어요. 무대 연출도 최고!",
				likeStatus: false,
				likeCount: 20,
				createdAt: "2025-07-01T14:32:00",
				updatedAt: "2025-07-01T15:32:00",
			},
			{
				id: "c8d1e2a7-4a5b-437b-9d90-7b1a2c3f1239",
				writerName: "뮤덕삼",
				writerProfileImageUrl: userImage,
				content: "재미없는 공연이었어요. 무대 연출도 별로.",
				likeStatus: true,
				likeCount: 2,
				createdAt: "2025-07-15T11:10:00",
				updatedAt: "2025-07-16T14:32:00",
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
	},
};

export default performanceReview;
