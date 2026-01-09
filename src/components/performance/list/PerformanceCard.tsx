import { useNavigate } from "react-router-dom";
import { PerformanceListItem } from "../../../types/ApiDataTypes.ts";

interface Props {
	performances: PerformanceListItem[];
}

export default function PerformanceCard({ performances }: Props) {
	const navigate = useNavigate();

	const handleClick = (id: string, adultOnly: boolean) => {
		sessionStorage.setItem("adultOnly", String(adultOnly));
		navigate(`/performances/${id}`);
	};

	if (performances.length === 0) {
		return <p>공연이 존재하지 않습니다.</p>;
	}

	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
			{performances.map((performance) => (
				<div
					key={performance.id}
					data-testid="performanceId"
					className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
					{/* 이미지 영역 */}
					<div className="relative overflow-hidden">
						<img
							src={performance.imageUrl}
							alt={`${performance.name} 포스터 이미지`}
							className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
						/>

						{/* 호버 시 그라데이션 오버레이 */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

						{/* 성인 전용 뱃지 */}
						{performance.adultOnly && (
							<div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
								19+
							</div>
						)}
					</div>

					{/* 정보 영역 */}
					<div className="p-4 space-y-2">
						<h3 className="font-bold text-base md:text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
							{performance.name}
						</h3>

						<div className="flex items-center gap-2 text-sm text-gray-600">
							<svg
								className="w-4 h-4 flex-shrink-0"
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
							<span className="line-clamp-1">{performance.stadiumName}</span>
						</div>

						<div className="flex items-center gap-2 text-sm text-gray-500">
							<svg
								className="w-4 h-4 flex-shrink-0"
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
							<span className="text-xs line-clamp-1">
								{performance.startDate} ~ {performance.endDate}
							</span>
						</div>
					</div>

					{/* 하단 액션 영역 */}
					<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
						<button
							type="button"
							onClick={() => handleClick(performance.id, performance.adultOnly)}
							className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
							예매하기
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
