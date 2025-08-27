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
						<p className="font-semibold text-xl text-gray-900">
							{performance.name}
						</p>
					</div>
				</div>

				<div>
					{/* 공연 날짜 */}
					<div className="border-b border-gray-300 py-3">
						<p className="text-gray-500 py-2">공연 날짜</p>
						<p className="font-semibold text-xl text-gray-900">
							{performance.scheduleDate}
						</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-2 border-b border-gray-300 gap-x-8">
				<div>
					{/* 공연 시간 */}
					<div className="py-3">
						<p className="text-gray-500 py-2">공연 시간</p>
						<p className="font-semibold text-xl text-gray-900">
							{performance.scheduleTime}
						</p>
					</div>
				</div>

				<div>
					{/* 공연 좌석 */}
					<div className="py-3">
						<p className="text-gray-500 py-2">공연 좌석</p>
						<p className="font-semibold text-xl text-gray-900">{seatText}</p>
					</div>
				</div>
			</div>

			<div>
				{/* 공연 가격 */}
				<div className="gap-x-8 py-3">
					<p className="text-gray-500 py-2">공연 가격</p>
					<p className="font-semibold text-xl text-gray-900">
						{totalAmount.toLocaleString()}원
					</p>
				</div>
			</div>
		</div>
	);
}
