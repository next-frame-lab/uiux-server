import { PerformancePagination } from "../../types/ApiDataTypes.ts";

interface PaginationProps {
	pagination: PerformancePagination;
	onPageChange: (page: number) => void;
}

export default function Pagination({
	pagination,
	onPageChange,
}: PaginationProps) {
	const { page, totalPages, hasNext, hasPrevious } = pagination;

	const handlePrev = () => {
		if (hasPrevious) onPageChange(page - 1);
	};

	const handleNext = () => {
		if (hasNext) onPageChange(page + 1);
	};

	return (
		<div>
			<button type="button" onClick={handlePrev} disabled={!hasPrevious}>
				{`<`}
			</button>
			<p>
				Page {page + 1} / {totalPages}
			</p>
			<button
				type="button"
				onClick={handleNext}
				disabled={!hasNext}>{`>`}</button>
		</div>
	);
}
