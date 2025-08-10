import ReviewList from "./ReviewList.tsx";
import ReviewForm from "./ReviewForm.tsx";
import useReviews from "../../../hooks/useReviews.ts";

interface ReviewSectionProps {
	performanceId: string;
	currentUserId: string;
}

export default function ReviewSection({
	performanceId,
	currentUserId,
}: ReviewSectionProps) {
	const {
		reviews,
		isLoading: reviewLoading,
		isError: reviewError,
		onEdit,
		onSubmit,
		onDelete,
	} = useReviews(performanceId);
	return (
		<div className="mt-4 pt-10">
			<p className="text-2xl font-bold">리뷰</p>
			<div>
				{reviewLoading && <p>리뷰 로딩 중 ...</p>}
				{reviewError && <p>리뷰 오류 발생</p>}
				{reviews && (
					<ReviewList
						reviews={reviews}
						currentUserId={currentUserId}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				)}
			</div>
			<div>
				<ReviewForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}
