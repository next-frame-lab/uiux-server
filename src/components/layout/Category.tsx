export default function Category() {
	return (
		<nav className="sticky top-[96px] z-40 flex items-center justify-start overflow-x-auto border-b border-[#E8EDF5] bg-gray-100 py-4 flex-nowrap md:justify-center">
			<div className="flex items-center divide-x divide-gray-300">
				{["전체", "로맨스", "호러", "스릴러", "다큐", "코미디", "유머"].map(
					(genre) => (
						<button
							type="button"
							className="flex-shrink-0 px-6 py-2 font-semibold hover:bg-gray-200 md:px-18"
							key={genre}>
							{genre}
						</button>
					)
				)}
			</div>
		</nav>
	);
}
