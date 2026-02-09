import { reviewList } from "../../../../types/ApiDataTypes.ts";
import ReviewItem from "./ReviewItem.tsx";

interface ReviewListProps {
	reviews: reviewList[];
	currentUserName: string;
	onEdit: (id: string, newContent: string, star: number) => void;
	onDelete: (id: string) => void;
	onLikeToggle: () => void;
	isAuthenticated: boolean;
	onRequireLogin: () => void;
}

export default function ReviewList({
	reviews,
	currentUserName,
	onEdit,
	onDelete,
	onLikeToggle,
	isAuthenticated,
	onRequireLogin,
}: ReviewListProps) {
	return (
		<div>
			{reviews.map((review) => (
				<ReviewItem
					key={review.id}
					review={review}
					isMine={review.writerName === currentUserName}
					onUpdate={onEdit}
					onDelete={() => onDelete(review.id)}
					onLikeToggle={onLikeToggle}
					isAuthenticated={isAuthenticated}
					onRequireLogin={onRequireLogin}
				/>
			))}
		</div>
	);
}
