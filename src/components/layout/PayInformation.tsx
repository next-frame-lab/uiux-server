export default function PayInformation() {
	return (
		<div>
			<div className="grid grid-cols-2 gap-x-8">
				<h2 className="text-xl font-bold border-b border-gray-300 pb-5">
					결제 정보
				</h2>
				<div className="text-xl font-bold border-b border-gray-300 pb-5" />
			</div>

			<div className="grid grid-cols-2 gap-x-8">
				<div>
					{/* 공연명 */}
					<div className="border-b border-gray-300 py-3">
						<p className="text-gray-500 py-2">공연명</p>
						<p className="font-semibold text-xl text-gray-900">햄릿</p>
					</div>
				</div>

				<div>
					{/* 공연 날짜 */}
					<div className="border-b border-gray-300 py-3">
						<p className="text-gray-500 py-2">공연 날짜</p>
						<p className="font-semibold text-xl text-gray-900">2025-07-15</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-2 border-b border-gray-300 gap-x-8">
				<div>
					{/* 공연 시간 */}
					<div className="py-3">
						<p className="text-gray-500 py-2">공연 시간</p>
						<p className="font-semibold text-xl text-gray-900">19:30</p>
					</div>
				</div>

				<div>
					{/* 공연 좌석 */}
					<div className="py-3">
						<p className="text-gray-500 py-2">공연 좌석</p>
						<p className="font-semibold text-xl text-gray-900">
							A구역 1열 13좌석
						</p>
					</div>
				</div>
			</div>

			<div>
				{/* 공연 가격 */}
				<div className="gap-x-8 py-3">
					<p className="text-gray-500 py-2">공연 가격</p>
					<p className="font-semibold text-xl text-gray-900">13000원</p>
				</div>
			</div>
		</div>
	);
}
