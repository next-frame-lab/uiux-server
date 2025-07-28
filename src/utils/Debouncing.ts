export default function Debouncing<T extends (...args: unknown[]) => void>(
	func: T,
	timeout: number
): (...args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout> | undefined;
	return (...args) => {
		if (!timer) {
			func(...args);
		}

		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = undefined;
		}, timeout);
	};
}
