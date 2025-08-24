import { useEffect, useMemo, useState } from "react";

interface CountDownProps {
	target: Date | string;
	onDone: () => void;
}

export default function Countdown({ target, onDone }: CountDownProps) {
	const targetMs = useMemo(
		() =>
			typeof target === "string"
				? new Date(target).getTime()
				: target.getTime(),
		[target]
	);

	const [msLeft, setMsLeft] = useState(Math.max(targetMs - Date.now(), 0));

	useEffect(() => {
		const id = setInterval(() => {
			const left = Math.max(targetMs - Date.now(), 0);
			setMsLeft(left);
			if (left === 0 && onDone) onDone();
		}, 250);
		return () => clearInterval(id);
	}, [targetMs, onDone]);

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
