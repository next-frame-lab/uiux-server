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
			className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-sm ${
				liked
					? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600"
					: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
			}`}>
			<svg
				className="w-5 h-5"
				fill={liked ? "currentColor" : "none"}
				stroke="currentColor"
				viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
				/>
			</svg>
			<span className="font-bold">{likeCount}</span>
		</button>
	);
}
