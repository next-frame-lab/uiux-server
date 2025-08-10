const clamp = (v: number, min: number, max: number) =>
	Math.max(min, Math.min(max, v));
const snap = (v: number, step: number) => Math.round(v / step) * step;

/* 드래그 속도가 생각보다 느려, 추후 수정 예정 */
const getStarValueFromDrag = (
	clientX: number,
	container: HTMLDivElement | null,
	maxStars = 5,
	step = 0.5
): number => {
	if (!container) return 0;
	const rect = container.getBoundingClientRect();
	const x = clamp(clientX - rect.left, 0, rect.width);
	const raw = (x / rect.width) * maxStars;
	return clamp(snap(raw, step), 0, maxStars);
};

const getStarValueFromClick = (
	e: React.MouseEvent<HTMLButtonElement>,
	index: number,
	maxStars = 5,
	step = 0.5
): number => {
	const rect = e.currentTarget.getBoundingClientRect();
	const isHalf = e.clientX - rect.left < rect.width / 2;
	const base = index + (isHalf && step <= 0.5 ? step : 1);
	return clamp(base, 0, maxStars);
};

export { getStarValueFromDrag, getStarValueFromClick };
