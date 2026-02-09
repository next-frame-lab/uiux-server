import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FormEvent, useState } from "react";
import { reviewList } from "../../../../types/ApiDataTypes.ts";
import ReviewLikeButton from "./ReviewLikeButton.tsx";
import fetchReviewLikes from "../../../../api/ReviewLikes.ts";
import ReviewRating from "./ReviewRating.tsx";
import DeleteConfirmModal from "./DeleteConfirmModal.tsx";

interface ReviewItemProps {
	review: reviewList;
	isMine: boolean;
	onUpdate: (id: string, content: string, star: number) => void;
	onDelete: (id: string) => void;
	onLikeToggle: () => void;
	isAuthenticated: boolean;
	onRequireLogin: () => void;
}

export default function ReviewItem({
	review,
	isMine,
	onDelete,
	onUpdate,
	onLikeToggle,
	isAuthenticated,
	onRequireLogin,
}: ReviewItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(review.content);
	const [editedStar, setEditedStar] = useState(review.star);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleSave = async (e: FormEvent) => {
		e.preventDefault();
		if (!editedContent.trim()) return;

		try {
			await onUpdate(review.id, editedContent, editedStar);
			setIsEditing(false);
		} catch (err) {
			if (err instanceof Error) {
				alert(err.message);
			}
		}
	};

	const handleDelete = async () => {
		try {
			await onDelete(review.id);
			setShowDeleteModal(false);
		} catch (err) {
			if (err instanceof Error) {
				alert(err.message);
			}
		}
	};

	const handleToggleLike = async (reviewId: string, newLiked: boolean) => {
		if (!isAuthenticated) {
			onRequireLogin();
			return;
		}
		try {
			await fetchReviewLikes(reviewId, newLiked);
			onLikeToggle();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
			{/* 헤더 - 프로필 & 베스트 리뷰 배지 */}
			<div className="flex items-center gap-4 mb-4">
				<img
					className="h-12 w-12 rounded-full object-cover"
					src={review.writerProfileImageUrl}
					alt={`${review.writerName} 프로필`}
				/>
				<div className="flex flex-col flex-1">
					<p className="text-base font-semibold text-gray-900">
						{review.writerName}
					</p>
					<p className="text-sm text-gray-500">{review.createdAt}</p>
				</div>
				{review.likeCount >= 20 && (
					<span
						data-testid={`${review.id}`}
						className="inline-block text-xs font-medium text-yellow-600 bg-yellow-100 px-3 py-1.5 rounded-full">
						Best Review
					</span>
				)}
			</div>

			{isEditing ? (
				<form onSubmit={handleSave} className="space-y-4">
					<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
						<ReviewRating onChange={setEditedStar} initialValue={editedStar} />
					</div>
					<textarea
						className="w-full rounded-xl border-2 border-gray-200 p-4 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
						rows={4}
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
						placeholder="리뷰 내용을 입력해주세요..."
					/>
					<div className="flex gap-3 justify-end">
						<button
							type="submit"
							className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-md">
							저장
						</button>
						<button
							type="button"
							className="px-6 py-2.5 rounded-xl bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-all"
							onClick={() => {
								setEditedContent(review.content);
								setEditedStar(review.star);
								setIsEditing(false);
							}}>
							취소
						</button>
					</div>
				</form>
			) : (
				<>
					{/* 별점 표시 */}
					<div className="flex items-center gap-1 mb-3">
						{Array.from({ length: 5 }, (_, i) => {
							const starValue = i + 1;
							if (review.star >= starValue) {
								return <FaStar key={i} className="w-5 h-5 text-yellow-500" />;
							}
							if (review.star >= starValue - 0.5) {
								return (
									<FaStarHalfAlt key={i} className="w-5 h-5 text-yellow-500" />
								);
							}
							return <FaRegStar key={i} className="w-5 h-5 text-gray-300" />;
						})}
						<span className="ml-2 font-bold text-gray-900">
							{review.star.toFixed(1)}
						</span>
					</div>

					{/* 리뷰 내용 */}
					<p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
						{review.content}
					</p>

					{/* 하단 - 좋아요 & 수정/삭제 버튼 */}
					<div className="flex items-center justify-between pt-4 border-t border-gray-200">
						<ReviewLikeButton
							reviewId={review.id}
							initialLiked={review.likeStatus}
							initialLikeCount={review.likeCount}
							onToggleLike={handleToggleLike}
						/>

						{isMine && (
							<div className="flex gap-2">
								<button
									type="button"
									className="px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md"
									onClick={() => setIsEditing(true)}>
									수정
								</button>
								<button
									type="button"
									className="px-4 py-2 text-sm font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all shadow-md"
									onClick={() => setShowDeleteModal(true)}>
									삭제
								</button>
							</div>
						)}
					</div>
				</>
			)}

			<DeleteConfirmModal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleDelete}
			/>
		</div>
	);
}
