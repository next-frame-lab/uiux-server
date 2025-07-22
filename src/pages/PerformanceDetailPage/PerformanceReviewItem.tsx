import { useState } from "react";
import { reviewList } from "../../types/ApiDataTypes.ts";

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

	const handleSave = () => {
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
				<>
					<textarea
						value={editedContent}
						onChange={(e) => setEditedContent(e.target.value)}
					/>
					<div>
						<button type="button" onClick={handleSave}>
							저장
						</button>
						<button type="button" onClick={() => setIsEditing(false)}>
							취소
						</button>
					</div>
				</>
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
