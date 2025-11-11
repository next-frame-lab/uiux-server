import { useEffect, useState } from "react";

interface CountdownProps {
	duration: number; // ms 단위로 전달받음
	onDone: () => void;
}

export default function Countdown({ duration, onDone }: CountdownProps) {
	const [msLeft, setMsLeft] = useState(duration);

	useEffect(() => {
		if (msLeft <= 0) {
			onDone();
		}

		const id = setInterval(() => {
			setMsLeft((prev) => {
				const next = Math.max(prev - 250, 0);
				if (next === 0) onDone();
				return next;
			});
		}, 250);

		return () => clearInterval(id);
	}, [onDone, msLeft]);

	const totalSec = Math.ceil(msLeft / 1000);
	const m = Math.floor(totalSec / 60);
	const s = totalSec % 60;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
			<div className="flex flex-col items-center gap-3 py-4">
				<div className="animate-pulse text-gray-600">
					예매 시작까지 대기 중입니다.
				</div>
				<div className="text-4xl tabular-nums">
					{m}:{String(s).padStart(2, "0")}
				</div>
				<div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
			</div>
		</div>
	);
}
