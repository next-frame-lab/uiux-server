import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { getStarValueFromClick } from "../../../utils/StarRating.ts";

interface Props {
	onChange: (star: number) => void;
}

export default function ReviewRating({ onChange }: Props) {
	const [rating, setRating] = useState<number>(0);

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
		<div className="flex items-center gap-1">
			별점:
			{Array.from({ length: 5 }, (_, i) => (
				<button
					type="button"
					key={i}
					onClick={(e) => handleRating(getStarValueFromClick(e, i))}>
					{changeStarIcon(i)}
				</button>
			))}
		</div>
	);
}
