import { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { getStarValueFromClick } from "../../../../utils/StarRating.ts";

interface Props {
	onChange: (star: number) => void;
	initialValue: number;
}

export default function ReviewRating({ onChange, initialValue = 0 }: Props) {
	const [rating, setRating] = useState<number>(initialValue);

	useEffect(() => {
		setRating(initialValue);
	}, [initialValue]);

	const handleRating = (star: number) => {
		const v = Math.max(0, Math.min(5, star));
		setRating(v);
		onChange(v);
	};

	// 별점 선택 색상 변경
	const changeStarIcon = (index: number) => {
		const startValue = index + 1;
		if (rating >= startValue) return <FaStar className="text-yellow-400" />;
		if (rating >= startValue - 0.5)
			return <FaStarHalfAlt className="text-yellow-400" />;
		return <FaRegStar className="text-yellow-400" />;
	};

	return (
		<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
			<span className="text-sm sm:text-base font-semibold text-gray-700">
				별점:
			</span>

			<div className="flex items-center gap-1">
				{Array.from({ length: 5 }, (_, i) => (
					<button
						type="button"
						key={i}
						onClick={(e) => handleRating(getStarValueFromClick(e, i))}
						className="transition-transform hover:scale-110 active:scale-95 touch-manipulation">
						<span className="text-2xl sm:text-3xl">{changeStarIcon(i)}</span>
					</button>
				))}
			</div>
		</div>
	);
}
