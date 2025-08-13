import { useNavigate } from "react-router-dom";
import { PerformanceListItem } from "../../../types/ApiDataTypes.ts";

interface Props {
	performances: PerformanceListItem[];
}

export default function PerformanceCard({ performances }: Props) {
	const navigate = useNavigate();
	const handleClick = (id: string) => {
		navigate(`/performances/${id}`);
	};

	if (performances.length === 0) {
		return <p>공연이 존재하지 않습니다.</p>;
	}

	return (
		<div className="grid grid-cols-4 gap-6 mb-10">
			{performances.map((performance) => (
				<button
					type="button"
					key={performance.id}
					data-testid="performanceId"
					className="bg-white rounded-2xl shadow-md overflow-hidden text-left transition-transform transform hover:scale-105 hover:shadow-lg"
					onClick={() => handleClick(performance.id)}>
					<img
						className="w-full object-cover"
						src={performance.image}
						alt={`${performance.name} 포스터 이미지`}
					/>
					<div className="p-4 space-y-2">
						<div className="flex justify-between items-center">
							<h2 className="text-lg font-semibold truncate">
								{performance.name}
							</h2>
							<p className="text-yellow-500 font-bold">
								{performance.averageStar}
							</p>
						</div>
						<p className="text-sm text-gray-500">{performance.stadiumName}</p>
						<p className="text-xs text-gray-400">
							{performance.startDate} ~ {performance.endDate}
						</p>
					</div>
				</button>
			))}
		</div>
	);
}
