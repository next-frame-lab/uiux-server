import ReviewList from "./ReviewList.tsx";
import ReviewForm from "./ReviewForm.tsx";
import useReviews from "../../../../hooks/useReviews.ts";
import { AppErrorCode, statusMessage } from "../../../../lib/apiClient.ts";

interface ReviewSectionProps {
	performanceId: string;
	currentUserId: string;
	isAuthenticated: boolean;
	onRequireLogin: () => void;
}

export default function ReviewSection({
	performanceId,
	currentUserId,
	isAuthenticated,
	onRequireLogin,
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
						isAuthenticated={isAuthenticated}
						onRequireLogin={onRequireLogin}
					/>
				)}
			</div>
			<div>
				{isAuthenticated ? (
					<ReviewForm onSubmit={onSubmit} />
				) : (
					<div className="w-full h-40 bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200 flex flex-col justify-between">
						<p className="text-sm text-gray-800">
							<strong>
								해당 리뷰 작성 폼을 사용하기 위해서는 로그인이 필요합니다.
							</strong>
						</p>
						<button
							type="button"
							onClick={onRequireLogin}
							className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 self-start">
							로그인하기
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
