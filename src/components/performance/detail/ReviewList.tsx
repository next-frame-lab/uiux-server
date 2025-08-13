import { reviewList } from "../../../types/ApiDataTypes.ts";
import ReviewItem from "./ReviewItem.tsx";

interface ReviewListProps {
	reviews: reviewList[];
	currentUserId: string;
	onEdit: (id: string, newContent: string) => void;
	onDelete: (id: string) => void;
}

export default function ReviewList({
	reviews,
	currentUserId,
	onEdit,
	onDelete,
}: ReviewListProps) {
	return (
		<div className="mt-4">
			{reviews.map((review) => (
				<ReviewItem
					key={review.writerId}
					review={review}
					isMine={review.writerId === currentUserId}
					onUpdate={onEdit}
					onDelete={() => onDelete(review.writerId)}
				/>
			))}
		</div>
	);
}
