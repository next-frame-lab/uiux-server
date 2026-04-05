const categories = [
	{ id: "all", label: "전체" },
	{ id: "CONCERT", label: "콘서트" },
	{ id: "MUSICAL", label: "뮤지컬" },
	{ id: "CHILDREN_THEATER", label: "어린이극" },
	{ id: "DANCE", label: "무용" },
	{ id: "PLAY", label: "연극" },
	{ id: "OPERA", label: "오페라" },
];

interface MainCategoryBarProps {
	activeCategory: string;
	onCategoryChange: (categoryId: string) => void;
}

export default function MainCategoryBar({
	activeCategory,
	onCategoryChange,
}: MainCategoryBarProps) {
	return (
		<div className="bg-[#FBFBFB] border-b border-gray-200">
			<div className="container mx-auto px-4">
				<nav className="flex items-center gap-1 overflow-x-auto md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
					{categories.map(({ id, label }) => (
						<button
							key={id}
							type="button"
							onClick={() => onCategoryChange(id)}
							className={`flex-shrink-0 px-6 py-4 text-sm md:text-base relative transition-colors whitespace-nowrap ${
								activeCategory === id
									? "text-gray-900 font-semibold"
									: "text-gray-500 hover:text-gray-700"
							}`}>
							{label}
							{activeCategory === id && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
							)}
						</button>
					))}
				</nav>
			</div>
		</div>
	);
}
