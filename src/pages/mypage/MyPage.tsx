import {
	EnvelopeIcon,
	CalendarIcon,
	TicketIcon,
	TagIcon,
} from "@heroicons/react/24/solid";
import { FilmIcon, HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuthState } from "../../store/authStore.ts";

const KEYWORDS = [
	{ id: "concert", label: "콘서트", path: "/performances?type=concert" },
	{ id: "musical", label: "뮤지컬", path: "/performances?type=musical" },
	{
		id: "children_theater",
		label: "어린이극",
		path: "/performances?type=children_theater",
	},
	{ id: "dance", label: "무용", path: "/performances?type=dance" },
	{ id: "play", label: "연극", path: "/performances?type=play" },
	{ id: "opera", label: "오페라", path: "/performances?type=opera" },
];

const STATS = [
	{
		icon: FilmIcon,
		count: 5,
		label: "관람한 공연",
		bgColor: "bg-blue-50",
		iconColor: "text-blue-600",
		hoverBorder: "hover:border-blue-300",
	},
	{
		icon: HeartIcon,
		count: 24,
		label: "관심 공연",
		bgColor: "bg-pink-50",
		iconColor: "text-pink-600",
		hoverBorder: "hover:border-pink-300",
	},
	{
		icon: StarIcon,
		count: 11,
		label: "작성한 리뷰",
		bgColor: "bg-purple-50",
		iconColor: "text-purple-600",
		hoverBorder: "hover:border-purple-300",
	},
];

export default function MyPage() {
	const { user } = useAuthState();

	if (!user) {
		return (
			<div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
					<p className="text-gray-600">
						로그인 정보가 없습니다. 로그인 페이지로 이동해주세요.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
			{/* 프로필 */}
			<div className="mb-16 mt-6 rounded-xl bg-white border border-gray-200 p-8 md:p-12 hover:shadow-lg transition-all max-w-5xl mx-auto">
				<div className="flex flex-col md:flex-row items-center gap-8">
					<img
						src={user.imageUrl}
						alt={`${user.name}의 프로필 이미지`}
						className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
					/>

					<div className="flex-1 text-center md:text-left">
						<h1 className="text-3xl font-bold text-blue-950 mb-2">
							{user.name}
						</h1>
						<p className="text-gray-500 mb-4">NextFrame 회원</p>

						<div className="flex items-center gap-2 justify-center md:justify-start mb-3">
							<TagIcon className="w-4 h-4 text-gray-400" />
							<p className="text-sm text-gray-500 font-medium">
								관심 공연 키워드
							</p>
						</div>

						<div className="flex flex-wrap gap-2 justify-center md:justify-start">
							{KEYWORDS.map((keyword) => (
								<Link
									key={keyword.id}
									to={keyword.path}
									className="px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-500 text-white text-sm font-medium rounded-full border border-purple-400 hover:from-purple-500 hover:to-purple-600 transition-all">
									{keyword.label}
								</Link>
							))}
						</div>
					</div>

					<div className="hidden lg:flex">
						<div className="px-6 py-4 bg-purple-50 rounded-xl border border-purple-200">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
									<TicketIcon className="w-5 h-5 text-purple-600" />
								</div>
								<div>
									<p className="text-gray-500 text-xs">이번 달 예매</p>
									<p className="text-blue-950 text-xl font-semibold">3건</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 개인 정보 */}
			<div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-w-5xl mx-auto mb-16">
				<div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
					<h3 className="text-lg font-semibold text-blue-950">개인 정보</h3>
				</div>
				<div className="p-6">
					<div className="grid md:grid-cols-2 gap-6">
						<div className="flex items-start gap-4">
							<div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
								<EnvelopeIcon className="w-5 h-5 text-blue-600" />
							</div>
							<div>
								<p className="text-blue-950/60 text-sm mb-1">이메일</p>
								<p className="text-blue-950 font-medium">{user.email}</p>
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center">
								<CalendarIcon className="w-5 h-5 text-pink-600" />
							</div>
							<div>
								<p className="text-blue-950/60 text-sm mb-1">나이</p>
								<p className="text-blue-950 font-medium">{user.age}세</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 통계 카드 */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
				{STATS.map((stat) => (
					<div
						key={stat.label}
						className={`bg-white rounded-xl p-6 border border-gray-200 ${stat.hoverBorder} hover:shadow-lg hover:-translate-y-1 transition-all`}>
						<div
							className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}>
							<stat.icon className={`w-7 h-7 ${stat.iconColor} stroke-2`} />
						</div>
						<p className="text-3xl font-bold text-blue-950 mb-1">
							{stat.count}
						</p>
						<p className="text-gray-500 text-sm">{stat.label}</p>
					</div>
				))}
			</div>
		</div>
	);
}
