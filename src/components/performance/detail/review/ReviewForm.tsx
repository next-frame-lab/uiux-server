import { FormEvent, useState } from "react";
import ReviewRating from "./ReviewRating.tsx";

interface ReviewFormProps {
	onSubmit: (content: string, star: number) => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
	const [content, setContent] = useState("");
	const [star, setStar] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isValid = content.trim().length >= 10 && star > 0;

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (content.trim().length < 10) {
			alert("리뷰는 최소 10글자 이상 작성해주세요.");
			return;
		}

		if (star === 0) {
			alert("별점을 선택해주세요.");
			return;
		}

		setIsSubmitting(true);

		try {
			await onSubmit(content.trim(), star);
			setContent("");
			setStar(0);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-gray-200  sm:mx-0">
			<div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
				<svg
					className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600 flex-shrink-0"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
					/>
				</svg>
				<h3 className="text-lg sm:text-xl font-bold text-gray-900">
					리뷰 작성
				</h3>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
				{/* 별점 선택 */}
				<div className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border-2 border-blue-100">
					<ReviewRating onChange={setStar} initialValue={star} />
					{star === 0 && (
						<p className="text-xs text-gray-500 mt-2">별점을 선택해주세요</p>
					)}
				</div>

				{/* 리뷰 내용 입력 */}
				<div>
					<p className="block text-sm font-semibold text-gray-700 mb-2">
						리뷰 내용
					</p>
					<textarea
						id="review-content"
						className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 p-3 sm:p-4 resize-none transition-all text-sm sm:text-base placeholder:text-gray-400"
						rows={5}
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="이 공연에 대한 솔직한 후기를 남겨주세요. 다른 관람객들에게 큰 도움이 됩니다! ✨"
						maxLength={1000}
						disabled={isSubmitting}
					/>
					<div className="flex justify-between items-center mt-2">
						<p className="text-xs text-gray-500">최소 10자 이상 작성해주세요</p>
						<p className="text-xs text-gray-500">
							<span
								className={
									content.length > 900 ? "text-red-500 font-semibold" : ""
								}>
								{content.length}
							</span>
							<span className="text-gray-400"> / 1000자</span>
						</p>
					</div>
				</div>

				{/* 제출 버튼 */}
				<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
					<button
						type="submit"
						disabled={isSubmitting || !isValid}
						className="w-full sm:flex-1 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-bold hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none">
						{isSubmitting ? (
							<span className="flex items-center justify-center gap-2">
								<svg
									className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
									fill="none"
									viewBox="0 0 24 24">
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
								제출 중...
							</span>
						) : (
							<span className="flex items-center justify-center gap-2">
								<svg
									className="w-4 h-4 sm:w-5 sm:h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								리뷰 등록하기
							</span>
						)}
					</button>

					<button
						type="button"
						onClick={() => {
							setContent("");
							setStar(0);
						}}
						disabled={isSubmitting}
						className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-gray-100 text-gray-700 text-sm sm:text-base font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
						초기화
					</button>
				</div>
			</form>
		</div>
	);
}
