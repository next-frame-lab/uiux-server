import { FormEvent, useState } from "react";
import ReviewRating from "./ReviewRating.tsx";
import type { ApiError } from "../../../../lib/apiClient.ts";

interface ReviewFormProps {
	onSubmit: (content: string, star: number) => void;
}

function isApiError(error: unknown): error is ApiError {
	return error instanceof Error && "status" in error;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
	const [content, setContent] = useState("");
	const [star, setStar] = useState(0);
	const [errorMsg, setErrorMsg] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!content.trim() || star <= 0) return;

		setIsSubmitting(true);
		setErrorMsg("");

		try {
			await onSubmit(content.trim(), star);
			setContent("");
			setStar(0);
		} catch (error: unknown) {
			if (isApiError(error) && error.status === 403) {
				setErrorMsg("리뷰 작성은 공연을 예매한 사용자만 가능합니다.");
			} else if (isApiError(error) && error.status) {
				setErrorMsg(error.message);
			} else {
				setErrorMsg("리뷰 작성 중 알 수 없는 오류가 발생했습니다.");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const disabledButton = content.trim().length === 0 || star <= 0;

	return (
		<form
			onSubmit={handleSubmit}
			className=" w-full bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
			{/* 별점 선택 */}
			<div className="mb-4">
				<ReviewRating onChange={setStar} />
			</div>
			{/* 리뷰 작성 */}
			<textarea
				value={content}
				className="w-full rounded-lg border border-gray-300 p-4 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
				onChange={(e) => setContent(e.target.value)}
				placeholder="후기를 작성해주세요."
				rows={4}
			/>
			{/* 오류 메시지 표시 */}
			{errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
			<div className="flex justify-end mt-4">
				<button
					type="submit"
					disabled={disabledButton}
					className={`px-2 py-0.5 rounded-lg font-semibold transition-colors duration-200 ${
						disabledButton
							? "bg-gray-300 text-gray-500 cursor-not-allowed"
							: "bg-blue-500 text-white hover:bg-blue-600"
					}`}>
					{isSubmitting ? "등록 중..." : "작성"}
				</button>
			</div>
		</form>
	);
}
