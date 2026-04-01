import { useNavigate } from "react-router-dom";

export default function FailPage() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/payments`);
	};

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4">
			<div className="max-w-2xl w-full">
				<div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
					{/* 에러 아이콘 */}
					<div className="flex justify-center mb-6">
						<div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
							<svg
								className="w-12 h-12 text-red-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</div>
					</div>

					{/* 제목 */}
					<h1 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						결제 실패
					</h1>

					{/* 설명 */}
					<p className="text-center text-lg text-gray-600 mb-8">
						결제가 정상적으로 처리되지 않았습니다.
						<br />
						다시 시도해주세요.
					</p>

					{/* 안내 박스 */}
					<div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
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
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
							<div className="flex-1">
								<p className="text-sm font-semibold text-red-900 mb-2">
									결제 실패 원인
								</p>
								<ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
									<li>카드 한도 초과</li>
									<li>잘못된 카드 정보 입력</li>
									<li>네트워크 오류</li>
									<li>결제 시스템 일시 장애</li>
								</ul>
							</div>
						</div>
					</div>

					{/* 버튼 그룹 */}
					<div className="space-y-3">
						<button
							type="button"
							onClick={handleClick}
							className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							<span>돌아가기</span>
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
