import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const categories = [
	{ id: "all", label: "전체", path: "/" },
	{ id: "romance", label: "로맨스", path: "/performances?type=romance" },
	{ id: "horror", label: "호러", path: "/performances?type=horror" },
	{ id: "thriller", label: "스릴러", path: "/performances?type=thriller" },
	{
		id: "documentary",
		label: "다큐멘터리",
		path: "/performances?type=documentary",
	},
	{ id: "comedy", label: "코미디", path: "/performances?type=comedy" },
];

export default function Category() {
	const location = useLocation();
	const [activeCategory, setActiveCategory] = useState("all");

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const type = params.get("type");
		if (type) {
			setActiveCategory(type);
		} else {
			setActiveCategory("all");
		}
	}, [location]);

	return (
		<div className="bg-[#FBFBFB] border-b border-gray-200">
			<div className="container mx-auto px-4">
				<nav className="flex items-center justify-center gap-1">
					{categories.map(({ id, label, path }) => (
						<Link
							key={id}
							to={path}
							onClick={() => setActiveCategory(id)}
							className={`px-8 py-4 relative transition-colors ${
								activeCategory === id
									? "text-gray-900"
									: "text-gray-500 hover:text-gray-700"
							}`}>
							{label}
							{activeCategory === id && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
							)}
						</Link>
					))}
				</nav>
			</div>
		</div>
	);
}
