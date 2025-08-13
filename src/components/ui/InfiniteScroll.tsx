import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
	children: React.ReactNode;
	hasMore: boolean;
	onFetchNext: () => void;
	delay?: number;
}

export default function InfiniteScroll({
	children,
	hasMore,
	onFetchNext,
	delay,
}: InfiniteScrollProps) {
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		let observer: IntersectionObserver | null = null;
		const currentRef = bottomRef.current;

		if (currentRef && hasMore) {
			observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						if (timerRef.current) clearTimeout(timerRef.current);
						timerRef.current = setTimeout(() => {
							onFetchNext();
						}, delay);
					}
				},
				{ threshold: 1 }
			);
			observer.observe(currentRef);
		}

		return () => {
			if (observer && currentRef) {
				observer.unobserve(currentRef);
				observer.disconnect();
			}
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [hasMore, onFetchNext, delay]);

	return (
		<div>
			{children}
			{hasMore && <div ref={bottomRef} data-testid="scroll-loader" />}
		</div>
	);
}
