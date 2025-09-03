import { FormEvent, useState } from "react";
import { reviewList } from "../../../types/ApiDataTypes.ts";
import ReviewLikeButton from "./ReviewLikeButton.tsx";
import fetchReviewLikes from "../../../api/ReviewLikes.ts";

interface ReviewItemProps {
	review: reviewList;
	isMine: boolean;
	onUpdate: (id: string, content: string) => void;
	onDelete: (id: string) => void;
	isAuthenticated: boolean;
	onRequireLogin: () => void;
}

export default function ReviewItem({
	review,
	isMine,
	onDelete,
	onUpdate,
	isAuthenticated,
	onRequireLogin,
}: ReviewItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(review.content);

	const handleSave = (e: FormEvent) => {
		e.preventDefault();
		if (!editedContent.trim()) return;

		onUpdate(review.id, editedContent);
		setIsEditing(false);
	};

	const handleToggleLike = async (reviewId: string, newLiked: boolean) => {
		if (!isAuthenticated) {
			onRequireLogin();
			return;
		}
		try {
			await fetchReviewLikes(reviewId, newLiked);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
			<div className="flex items-center gap-4 mb-4">
				<img
					className="h-10 w-10 rounded-full object-cover"
					src={review.writerProfileImageUrl}
					alt={`${review.writerName} 프로필`}
				/>
				<div className="flex flex-col">
					<p className="text-sm font-semibold text-gray-900">
						{review.writerName}
					</p>
					<p className="text-xs text-gray-500">{review.createdAt}</p>
				</div>
				{review.likeCount >= 20 && (
					<span
						data-testid={`${review.id}`}
						className="inline-block text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full ml-auto">
						Best Review
					</span>
				)}
			</div>

			{isEditing ? (
				<form onSubmit={handleSave} className="space-y-3">
					<textarea
						className="w-full rounded-lg border border-gray-300 p-2 resize-none"
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
					/>
					<div className="flex gap-2 justify-end">
						<button
							type="submit"
							className="px-4 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600">
							저장
						</button>
						<button
							type="button"
							className="px-4 py-1 rounded-md bg-gray-300 text-sm hover:bg-gray-400"
							onClick={() => {
								setEditedContent(review.content);
								setIsEditing(false);
							}}>
							취소
						</button>
					</div>
				</form>
			) : (
				<>
					<p className="text-sm text-gray-800 mb-2">{review.content}</p>
					{/* 좋아요 버튼 들어갈 위치 */}
					<ReviewLikeButton
						reviewId={review.id}
						initialLiked={review.likeStatus}
						initialLikeCount={review.likeCount}
						onToggleLike={handleToggleLike}
					/>
					{isMine && (
						<div className="flex gap-2 justify-end">
							<button
								type="button"
								className="px-3 py-1 text-sm rounded-md bg-green-500 text-white hover:bg-green-600"
								onClick={() => setIsEditing(true)}>
								수정
							</button>
							<button
								type="button"
								className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
								onClick={() => onDelete(review.id)}>
								삭제
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
