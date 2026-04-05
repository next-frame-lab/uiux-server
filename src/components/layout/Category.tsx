import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const categories = [
	{ id: "all", label: "전체", path: "/performances" },
	{ id: "CONCERT", label: "콘서트", path: "/performances?genre=CONCERT" },
	{ id: "MUSICAL", label: "뮤지컬", path: "/performances?genre=MUSICAL" },
	{
		id: "CHILDREN_THEATER",
		label: "어린이극",
		path: "/performances?genre=CHILDREN_THEATER",
	},
	{
		id: "DANCE",
		label: "무용",
		path: "/performances?genre=DANCE",
	},
	{ id: "PLAY", label: "연극", path: "/performances?genre=PLAY" },
	{ id: "OPERA", label: "오페라", path: "/performances?genre=OPERA" },
];

export default function Category() {
	const location = useLocation();
	const [activeCategory, setActiveCategory] = useState("all");

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const genre = params.get("genre");
		setActiveCategory(genre || "all");
	}, [location]);

	return (
		<div className="bg-[#FBFBFB] border-b border-gray-200">
			<div className="container mx-auto px-4">
				<nav className="flex items-center gap-1 overflow-x-auto md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
					{categories.map(({ id, label, path }) => (
						<Link
							key={id}
							to={path}
							onClick={() => setActiveCategory(id)}
							className={`flex-shrink-0 px-6 py-4 text-sm md:text-base relative transition-colors whitespace-nowrap ${
								activeCategory === id
									? "text-gray-900 font-semibold"
									: "text-gray-500 hover:text-gray-700"
							}`}>
							{label}
							{activeCategory === id && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
							)}
						</Link>
					))}
				</nav>
			</div>
		</div>
	);
}
