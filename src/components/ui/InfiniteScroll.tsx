import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
	children: React.ReactNode;
	hasMore: boolean;
	onFetchNext: () => void;
}

export default function InfiniteScroll({
	children,
	hasMore,
	onFetchNext,
}: InfiniteScrollProps) {
	const bottomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let observer: IntersectionObserver | null = null;
		const currentRef = bottomRef.current;

		if (currentRef && hasMore) {
			observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						onFetchNext();
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
		};
	}, [hasMore, onFetchNext]);

	return (
		<div>
			{children}
			{hasMore && <div ref={bottomRef} data-testid="scroll-loader" />}
		</div>
	);
}
