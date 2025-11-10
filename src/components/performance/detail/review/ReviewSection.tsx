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

	const renderReviewList = () => {
		if (status === "loading") {
			return (
				<div className="w-full rounded-xl bg-gray-50 border border-gray-200 shadow-sm p-6 mb-6 animate-pulse">
					<p className="text-gray-500 text-sm text-center">
						리뷰를 불러오는 중입니다...
					</p>
				</div>
			);
		}

		if (status === "error") {
			const code = error?.status as AppErrorCode | undefined;
			return (
				<div className="w-full rounded-xl bg-red-50 border border-red-200 shadow-md p-6 mb-6">
					<p className="text-red-600 text-sm font-medium">
						{code
							? `리뷰를 불러오지 못했습니다. (${statusMessage[code]})`
							: "리뷰를 불러오는 도중 오류가 발생했습니다."}
					</p>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="mt-4 px-3 py-1.5 bg-white text-sm border border-red-300 rounded-md hover:bg-red-100 transition">
						다시 시도
					</button>
				</div>
			);
		}

		if (Array.isArray(reviews) && reviews.length > 0) {
			return (
				<ReviewList
					reviews={reviews}
					currentUserId={currentUserId}
					onEdit={onEdit}
					onDelete={onDelete}
					isAuthenticated={isAuthenticated}
					onRequireLogin={onRequireLogin}
				/>
			);
		}

		return (
			<div className="w-full rounded-xl  border border-gray-200 shadow-md p-6 mb-4 mt-4">
				<p className="text-gray-600 text-sm">
					아직 등록된 리뷰가 없습니다.{" "}
					<span className="font-medium text-gray-700">
						첫 번째 리뷰를 작성해보세요!
					</span>
				</p>
			</div>
		);
	};

	return (
		<div className="mt-4 pt-10">
			<p className="text-2xl font-bold">리뷰</p>
			<div>{renderReviewList()}</div>
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
