import { useEffect, useState } from "react";

export default function useElapsedTime(): number {
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		const start = Date.now();

		const interval = setInterval(() => {
			const now = Date.now();
			const seconds = Math.floor((now - start) / 1000);
			setElapsedTime(seconds);
		}, 1000);

		return () => {
			clearInterval(interval); // 컴포넌트 언마운트 시 정리
		};
	}, []);

	return elapsedTime;
}
