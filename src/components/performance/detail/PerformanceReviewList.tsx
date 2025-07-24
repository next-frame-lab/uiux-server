import { reviewList } from "../../../types/ApiDataTypes.ts";
import ReviewItem from "./PerformanceReviewItem.tsx";

interface ReviewListProps {
	reviews: reviewList[];
	currentUserId: string;
	onEdit: (id: string, newContent: string) => void;
	onDelete: (id: string) => void;
}

export default function PerformanceReviewList({
	reviews,
	currentUserId,
	onEdit,
	onDelete,
}: ReviewListProps) {
	return (
		<div>
			{reviews.map((review) => (
				<ReviewItem
					key={review.id}
					review={review}
					isMine={review.id === currentUserId}
					onUpdate={onEdit}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
}
