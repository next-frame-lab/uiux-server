import ReviewList from "./ReviewList.tsx";
import ReviewForm from "./ReviewForm.tsx";
import useReviews from "../../../hooks/useReviews.ts";
import { AppErrorCode, statusMessage } from "../../../lib/apiClient.ts";

interface ReviewSectionProps {
	performanceId: string;
	currentUserId: string;
}

export default function ReviewSection({
	performanceId,
	currentUserId,
}: ReviewSectionProps) {
	const { reviews, status, error, onEdit, onSubmit, onDelete } =
		useReviews(performanceId);

	if (status === "loading") return <p>로딩 중</p>;
	if (status === "error") {
		const code = error?.status as AppErrorCode | undefined;

		if (code) {
			return <p>에러 발생: {statusMessage[code]}</p>;
		}
		return <p> 알 수 없는 오류가 발생했습니다.</p>;
	}
	return (
		<div className="mt-4 pt-10">
			<p className="text-2xl font-bold">리뷰</p>
			<div>
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
