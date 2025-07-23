import { FormEvent, useState } from "react";
import { reviewList } from "../../../types/ApiDataTypes.ts";

interface ReviewItemProps {
	review: reviewList;
	isMine: boolean;
	onUpdate: (id: string, content: string) => void;
	onDelete: (id: string) => void;
}

export default function ReviewItem({
	review,
	isMine,
	onDelete,
	onUpdate,
}: ReviewItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(review.content);

	const handleSave = (e: FormEvent) => {
		e.preventDefault();
		if (!editedContent.trim()) return;

		onUpdate(review.id, editedContent);
		setIsEditing(false);
	};

	return (
		<div>
			<img
				src={review.writerProfileImage}
				alt={`${review.writerName} 프로필`}
			/>
			<div>
				<p>{review.writerName}</p>
				<p>{review.createdAt}</p>
			</div>
			{isEditing ? (
				<form onSubmit={handleSave}>
					<textarea
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
					/>
					<div>
						<button type="submit">저장</button>
						<button
							type="button"
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
					<p>{review.content}</p>
					{/* ReviewLikeButton.tsx 들어갈 자리 */}
					{review.likeCount >= 20 && (
						<span data-testid={`${review.id}`}>Best Review</span>
					)}

					{isMine && (
						<>
							<button type="button" onClick={() => setIsEditing(true)}>
								수정
							</button>
							<button type="button" onClick={() => onDelete(review.id)}>
								삭제
							</button>
						</>
					)}
				</>
			)}
		</div>
	);
}
