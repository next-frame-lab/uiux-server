import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PerformanceDetailData } from "../../../types/ApiDataTypes.ts";
import ReviewSection from "./review/ReviewSection.tsx";
import { useUser } from "../../../store/authStore";
import scheduleRange from "../../../utils/ScheduleRange.ts";

interface Props {
	performance: PerformanceDetailData;
}

export default function PerformanceInfo({ performance }: Props) {
	const navigate = useNavigate();
	const location = useLocation();
	const [selectedScheduleId, setSelectedScheduleId] = useState<string>("");

	const user = useUser();

	const token = localStorage.getItem("accessToken");
	const isAuthenticated = !!token;

	useEffect(() => {
		setSelectedScheduleId(performance.data.performanceSchedules[0]?.id ?? "");
	}, [performance.data.id]);

	const handleClick = () => {
		navigate(`/performances/${performance.data.id}/seats`, {
			state: {
				performanceId: performance.data.id,
				performanceName: performance.data.name,
				scheduleId: selectedScheduleId,
				seatPrices: performance.data.seatSectionPrices,
				stadiumId: performance.data.stadium.id,
				performanceSchedules: performance.data.performanceSchedules,
			},
		});
	};

	const onRequireLogin = () => {
		navigate("/login", {
			state: { redirectTo: location.pathname },
			replace: false,
		});
	};

	return (
		<div className="bg-gradient-to-b from-gray-50 to-white">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
					{/* 공연 포스터 */}
					<div className="lg:sticky lg:top-28 lg:self-start">
						<div className="relative group">
							<img
								src={performance.data.imageUrl}
								alt={`${performance.data.name} 포스터`}
								className="w-full aspect-[3/4] rounded-2xl object-cover shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
							/>
							{performance.data.adultOnly && (
								<div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
									19+
								</div>
							)}
						</div>
					</div>

					{/* 공연 상세 정보 */}
					<div className="lg:col-span-2 space-y-8 -mb-5">
						{/* 제목 & 평점 */}
						<div className="space-y-4">
							<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
								{performance.data.name}
							</h1>
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
									<svg
										className="w-5 h-5 text-yellow-500"
										fill="currentColor"
										viewBox="0 0 20 20">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
									<span className="font-bold text-gray-900">
										{performance.data.averageStar}
									</span>
								</div>
							</div>
						</div>

						{/* 기본 정보 카드 */}
						<div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
							<h2 className="text-xl font-bold text-gray-900 mb-4">
								공연 정보
							</h2>

							<div className="grid gap-4">
								{/* 타입 & 장르 */}
								<div className="flex items-start gap-3">
									<svg
										className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
										/>
									</svg>
									<div>
										<p className="text-sm text-gray-500">타입 / 장르</p>
										<p className="font-semibold text-gray-900">
											{performance.data.type} · {performance.data.genre}
										</p>
									</div>
								</div>

								{/* 공연 시간 */}
								<div className="flex items-start gap-3">
									<svg
										className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
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
									<div>
										<p className="text-sm text-gray-500">공연 시간</p>
										<p className="font-semibold text-gray-900">
											{performance.data.runningTime}분
										</p>
									</div>
								</div>

								{/* 장소 */}
								<div className="flex items-start gap-3">
									<svg
										className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									<div>
										<p className="text-sm text-gray-500">장소</p>
										<p className="font-semibold text-gray-900">
											{performance.data.stadium.name}
										</p>
										<p className="text-sm text-gray-600 mt-1">
											{performance.data.stadium.address}
										</p>
									</div>
								</div>

								{/* 공연 기간 */}
								<div className="flex items-start gap-3">
									<svg
										className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
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
									<div>
										<p className="text-sm text-gray-500">공연 기간</p>
										<p className="font-semibold text-gray-900">
											{scheduleRange(performance.data.performanceSchedules)}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* 좌석 가격 */}
						<div className="bg-white rounded-2xl shadow-lg p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-4">
								좌석 가격
							</h2>
							<div className="grid sm:grid-cols-2 gap-3">
								{performance.data.seatSectionPrices.map((seat) => (
									<div
										key={seat.section}
										className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
										<span className="font-semibold text-gray-900">
											{seat.section}석
										</span>
										<span className="font-bold text-blue-600">
											{seat.price.toLocaleString()}원
										</span>
									</div>
								))}
							</div>
						</div>

						{/* 관람 일정 & 시간 선택 */}
						<div className="bg-white rounded-2xl shadow-lg p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-4">
								관람 일정 & 시간 선택
							</h2>
							<select
								value={selectedScheduleId}
								onChange={(e) => setSelectedScheduleId(e.target.value)}
								className="w-full rounded-xl border-2 border-gray-200 bg-white p-4 text-base font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer">
								{performance.data.performanceSchedules.map((s) => (
									<option key={s.id} value={s.id}>
										{s.date} {s.time}
									</option>
								))}
							</select>
						</div>

						{/* 티켓 예매하기 버튼 */}
						<div className="flex justify-end">
							<button
								type="button"
								onClick={handleClick}
								disabled={!selectedScheduleId}
								className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105">
								티켓 예매하기
							</button>
						</div>

						{/* 공연 소개 */}
						<div className="bg-white rounded-2xl shadow-lg p-6">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								공연 소개
							</h2>
							<p className="text-gray-700 leading-relaxed whitespace-pre-line">
								{performance.data.description}
							</p>
						</div>

						{/* 리뷰 */}
						<ReviewSection
							performanceId={performance.data.id}
							currentUserId={user?.id || ""}
							isAuthenticated={isAuthenticated}
							onRequireLogin={onRequireLogin}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
