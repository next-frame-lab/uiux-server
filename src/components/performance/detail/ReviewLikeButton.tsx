import { useState } from "react";

interface ReviewLikeButtonProps {
	reviewId: string;
	initialLiked: boolean;
	initialLikeCount: number;
	onToggleLike: (reviewId: string, newLiked: boolean) => void;
}

export default function ReviewLikeButton({
	reviewId,
	initialLiked,
	initialLikeCount,
	onToggleLike,
}: ReviewLikeButtonProps) {
	const [liked, setLiked] = useState(initialLiked);
	const [likeCount, setLikeCount] = useState(initialLikeCount);

	const handleToggleLike = () => {
		const newLiked = !liked;
		setLiked(newLiked);
		setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
		onToggleLike(reviewId, newLiked);
	};

	return (
		<button
			type="button"
			onClick={handleToggleLike}
			data-testid={`${reviewId}`}
			className={`${liked ? "text-red-500" : "text-gray-500"}`}>
			❤️ {likeCount}
		</button>
	);
}
