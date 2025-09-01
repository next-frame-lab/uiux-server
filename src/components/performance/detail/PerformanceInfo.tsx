import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PerformanceDetailData } from "../../../types/ApiDataTypes.ts";
import ReviewSection from "./ReviewSection.tsx";

interface Props {
	performance: PerformanceDetailData;
}

export default function PerformanceInfo({ performance }: Props) {
	const [selectedScheduleId, setSelectedScheduleId] = useState<string>("");

	useEffect(() => {
		setSelectedScheduleId(performance.data.performanceSchedules[0].id ?? "");
	}, [performance.data.id]);

	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/performances/${performance.data.id}/seats`, {
			state: {
				performanceId: performance.data.id,
				scheduleId: selectedScheduleId,
				seatPrices: performance.data.seatSectionPrices,
				stadiumId: performance.data.stadium.id,
			},
		});
	};

	return (
		<div>
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-x-12 grid-cols-3">
					{/* 공연 포스터 + 기본 정보 */}
					<div className="sticky top-8 self-start">
						<img
							src={performance.data.imageUrl}
							alt={`${performance.data.name} 포스터`}
							className="aspect-[3/4] h-[700px] bg-gray-200 rounded-2xl object-cover cursor-pointer"
						/>
					</div>

					{/* 공연 상세 정보 */}
					<div className="mt-2 col-span-2">
						<p className="text-4xl font-bold text-gray-900">
							{performance.data.name}
						</p>
						<p className="font-bold mt-4 gap-y-2 text-sm text-gray-600">
							평점 : {performance.data.averageStar}점
						</p>
						<p className="mt-4 text-sm text-gray-600">
							타입 : {performance.data.type}
						</p>
						<p className="mt-4 text-sm text-gray-600">
							장르 : {performance.data.genre}
						</p>
						<p className="mt-4 text-sm text-gray-600">
							공연 시간 : {performance.data.runningTime}분
						</p>
						<p className="mt-4 text-sm text-gray-600">
							장소 : {performance.data.stadium.name}{" "}
							{performance.data.stadium.address}
						</p>
						<p className="mt-4 text-sm text-gray-600">
							공연 날짜 :{" "}
							{performance.data.performanceSchedules
								.map((s) => s.date)
								.filter((v, i, arr) => arr.indexOf(v) === i)
								.join(" ~ ")}
						</p>

						{/* 좌석 가격 */}
						<div className="mt-16">
							<h2 className="text-xl font-bold">좌석 가격</h2>
							<div className="mt-2 flex flex-col text-gray-800 gap-1">
								{performance.data.seatSectionPrices.map((seat) => (
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
								value={selectedScheduleId}
								onChange={(e) => setSelectedScheduleId(e.target.value)}
								className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3">
								{performance.data.performanceSchedules.map((s) => (
									<option key={s.id} value={s.id}>
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
								disabled={!selectedScheduleId}
								className="rounded-lg bg-gray-200 px-6 py-2 font-semibold text-gray-700 hover:bg-gray-300">
								티켓 예매하기
							</button>
						</div>

						{/* 공연 소개 */}
						<div className="mt-16">
							<div className="pt-10">
								<p className="text-2xl font-bold">공연 소개</p>
								<p className="mt-4 text-gray-700">
									{performance.data.description}
								</p>
							</div>
						</div>

						{/* 리뷰 */}
						<ReviewSection
							performanceId={performance.data.id}
							currentUserId="c8d1e2a7-4a5b-437b-9d90-7b1a2c3f1235"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
