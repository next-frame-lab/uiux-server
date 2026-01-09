import { ReservationResponse } from "../../types/ApiDataTypes.ts";

export default function PayInformation({
	reservation,
}: {
	reservation: ReservationResponse;
}) {
	const { performance, seats, totalAmount } = reservation.data;

	const seatText = seats
		.map((s) => `${s.section}-${s.row}-${s.column}`)
		.join(", ");

	return (
		<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
			{/* 헤더 */}
			<div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
				<h2 className="text-xl font-bold text-white flex items-center gap-2">
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					예매 정보
				</h2>
			</div>

			{/* 내용 */}
			<div className="p-6 space-y-6">
				{/* 공연명 */}
				<div className="pb-6 border-b border-gray-200">
					<div className="flex items-start gap-3">
						<svg
							className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
							/>
						</svg>
						<div className="flex-1">
							<p className="text-sm text-gray-500 mb-1">공연명</p>
							<p className="text-xl font-bold text-gray-900">
								{performance.name}
							</p>
						</div>
					</div>
				</div>

				{/* 공연 날짜 */}
				<div className="pb-6 border-b border-gray-200">
					<div className="flex items-start gap-3">
						<svg
							className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<div className="flex-1">
							<p className="text-sm text-gray-500 mb-1">공연 날짜</p>
							<p className="text-lg font-semibold text-gray-900">
								{performance.scheduleDate}
							</p>
						</div>
					</div>
				</div>

				{/* 공연 시간 */}
				<div className="pb-6 border-b border-gray-200">
					<div className="flex items-start gap-3">
						<svg
							className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<div className="flex-1">
							<p className="text-sm text-gray-500 mb-1">공연 시간</p>
							<p className="text-lg font-semibold text-gray-900">
								{performance.scheduleTime}
							</p>
						</div>
					</div>
				</div>

				{/* 선택 좌석 */}
				<div className="pb-6 border-b border-gray-200">
					<div className="flex items-start gap-3">
						<svg
							className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
						<div className="flex-1">
							<p className="text-sm text-gray-500 mb-1">선택 좌석</p>
							<p className="text-lg font-semibold text-gray-900">{seatText}</p>
						</div>
					</div>
				</div>

				{/* 총 금액 */}
				<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<svg
								className="w-6 h-6 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span className="text-lg font-semibold text-gray-700">
								총 결제금액
							</span>
						</div>
						<div className="text-right">
							<div className="text-3xl font-bold text-blue-600">
								{totalAmount.toLocaleString()}
								<span className="text-lg text-gray-600 ml-1">원</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
