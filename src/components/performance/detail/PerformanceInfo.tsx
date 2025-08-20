import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PerformanceDetailData } from "../../../types/ApiDataTypes.ts";
import ReviewSection from "./ReviewSection.tsx";

interface Props {
	performance: PerformanceDetailData;
}

export default function PerformanceInfo({ performance }: Props) {
	const [selectedSchedule, setSelectedSchedule] = useState<string>("");
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/performances/${performance.id}/seats`);
	};

	return (
		<div>
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-x-12 grid-cols-3">
					{/* 공연 포스터 + 기본 정보 */}
					<div className="sticky top-8 self-start">
						<img
							src={performance.image}
							alt={`${performance.name} 포스터`}
							className="aspect-[3/4] h-[700px] bg-gray-200 rounded-2xl object-cover cursor-pointer"
						/>
					</div>

					{/* 공연 상세 정보 */}
					<div className="mt-2 col-span-2">
						<p className="text-4xl font-bold text-gray-900">
							{performance.name}
						</p>
						<p className="font-bold mt-4 gap-y-2 text-sm text-gray-600">
							평점 : {performance.averageStar}점
						</p>
						<p className="mt-4 text-sm text-gray-600">
							타입 : {performance.type}
						</p>
						<p className="mt-4 text-sm text-gray-600">
							장르 : {performance.genre}
						</p>
						<p className="mt-4 text-sm text-gray-600">
							공연 시간 : {performance.runningTime}분
						</p>
						<p className="mt-4 text-sm text-gray-600">
							장소 : {performance.stadium.name} {performance.stadium.address}
						</p>
						<p className="mt-4 text-sm text-gray-600">
							공연 날짜 :{" "}
							{performance.scheduleList
								.map((s) => s.date)
								.filter((v, i, arr) => arr.indexOf(v) === i) // 중복 제거
								.join("~")}
						</p>

						{/* 좌석 가격 */}
						<div className="mt-16">
							<h2 className="text-xl font-bold">좌석 가격</h2>
							<div className="mt-2 flex flex-col text-gray-800 gap-1">
								{performance.seatPrices.map((seat) => (
									<p key={seat.section}>
										{seat.section}석 : {seat.price.toLocaleString()}원
									</p>
								))}
							</div>
						</div>

						{/* 관람 일정 & 시간 선택 */}
						<div className="mt-16">
							<h2 className="text-xl font-bold">관람 일정 & 시간 선택</h2>
							<select
								value={selectedSchedule}
								onChange={(e) => setSelectedSchedule(e.target.value)}
								className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3">
								{performance.scheduleList.map((s) => (
									<option key={s.id} value={`${s.date} - ${s.time}`}>
										{s.date} {s.time}
									</option>
								))}
							</select>
						</div>

						{/* 티켓 예매하기 버튼 */}
						<div className="mt-20 flex justify-end">
							<button
								type="button"
								onClick={handleClick}
								className="rounded-lg bg-gray-200 px-6 py-2 font-semibold text-gray-700 hover:bg-gray-300">
								티켓 예매하기
							</button>
						</div>

						{/* 공연 소개 */}
						<div className="mt-16">
							<div className="pt-10">
								<p className="text-2xl font-bold">공연 소개</p>
								<p className="mt-4 text-gray-700">{performance.description}</p>
							</div>
						</div>

						{/* 리뷰 */}
						<ReviewSection
							performanceId={performance.id}
							currentUserId="c8d1e2a7-4a5b-437b-9d90-7b1a2c3f1235"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
