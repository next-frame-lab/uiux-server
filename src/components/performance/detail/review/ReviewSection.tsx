import ReviewList from "./ReviewList.tsx";
import ReviewForm from "./ReviewForm.tsx";
import useReviews from "../../../../hooks/useReviews.ts";
import { AppErrorCode } from "../../../../lib/apiClient.ts";

interface ReviewSectionProps {
	performanceId: string;
	currentUserName: string;
	isAuthenticated: boolean;
	onRequireLogin: () => void;
}

export default function ReviewSection({
	performanceId,
	currentUserName,
	isAuthenticated,
	onRequireLogin,
}: ReviewSectionProps) {
	const { reviews, status, error, onEdit, onSubmit, onDelete, onLikeToggle } =
		useReviews(performanceId);

	const hasMyReview = reviews.some(
		(review) => review.writerName === currentUserName
	);
	const renderReviewList = () => {
		if (status === "loading") {
			return (
				<div className="w-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-sm p-6 sm:p-8 mb-4 sm:mb-6">
					<div className="flex items-center justify-center gap-3">
						<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
						<p className="text-gray-600 text-sm font-medium">
							리뷰를 불러오는 중입니다...
						</p>
					</div>
				</div>
			);
		}

		if (status === "error") {
			const code = error?.status as AppErrorCode | undefined;
			return (
				<div className="w-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200 shadow-md p-6 sm:p-8 mb-4 sm:mb-6">
					<div className="flex items-start gap-3">
						<svg
							className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<div className="flex-1 min-w-0">
							<p className="text-red-700 text-sm font-semibold mb-2 break-words">
								{code
									? `리뷰를 불러오지 못했습니다.`
									: "리뷰를 불러오는 도중 오류가 발생했습니다."}
							</p>
							<button
								type="button"
								onClick={() => window.location.reload()}
								className="mt-2 px-4 py-2 bg-white text-red-600 text-sm font-medium border border-red-300 rounded-lg hover:bg-red-50 transition-colors shadow-sm w-full sm:w-auto">
								다시 시도
							</button>
						</div>
					</div>
				</div>
			);
		}

		if (Array.isArray(reviews) && reviews.length > 0) {
			return (
				<ReviewList
					reviews={reviews}
					currentUserName={currentUserName}
					onEdit={onEdit}
					onDelete={onDelete}
					onLikeToggle={onLikeToggle}
					isAuthenticated={isAuthenticated}
					onRequireLogin={onRequireLogin}
				/>
			);
		}

		return (
			<div className="w-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 shadow-md p-6 sm:p-8 mb-4 sm:mb-6 mt-4 sm:mt-6">
				<div className="text-center">
					<svg
						className="w-12 sm:w-16 h-12 sm:h-16 text-blue-300 mx-auto mb-3 sm:mb-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
						/>
					</svg>
					<p className="text-gray-600 text-sm sm:text-base mb-1">
						아직 등록된 리뷰가 없습니다.
					</p>
					<p className="font-semibold text-blue-600 text-base sm:text-lg">
						첫 번째 리뷰를 작성해보세요! ✨
					</p>
				</div>
			</div>
		);
	};

	return (
		<div className="mt-2 sm:mt-8 pt-8 border-t-2 border-gray-200">
			<div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-4 sm:px-0">
				<svg
					className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 flex-shrink-0"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
					/>
				</svg>
				<h2 className="text-2xl sm:text-3xl font-bold text-gray-900">리뷰</h2>
				{Array.isArray(reviews) && reviews.length > 0 && (
					<span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold rounded-full">
						{reviews.length}개
					</span>
				)}
			</div>

			<div>{renderReviewList()}</div>

			<div className="mt-4 sm:mt-6 sm:px-0">
				{isAuthenticated ? (
					!hasMyReview && <ReviewForm onSubmit={onSubmit} />
				) : (
					<div className="w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 mb-4 sm:mb-6 border-2 border-amber-200">
						<div className="flex flex-col sm:flex-row items-start gap-4">
							<div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
								<svg
									className="w-6 h-6 text-amber-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-gray-800 font-semibold mb-2 text-sm sm:text-base">
									리뷰를 작성하려면 로그인이 필요합니다
								</p>
								<p className="text-gray-600 text-xs sm:text-sm mb-4">
									로그인 후 이 공연에 대한 소중한 의견을 남겨주세요!
								</p>
								<button
									type="button"
									onClick={onRequireLogin}
									className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-amber-500 text-white font-semibold text-sm rounded-lg hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto">
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
										/>
									</svg>
									로그인하기
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
