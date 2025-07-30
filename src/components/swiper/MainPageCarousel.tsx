import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Autoplay,
	Pagination,
	Navigation,
	Keyboard,
	A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Item = {
	id: number;
	description: string;
	button: string;
	backgroundColor: string;
	path: string;
	image: string;
};

export default function MainPageCarousel() {
	const items: Item[] = [
		{
			id: 1,
			description: "웃음이 빵빵! 터지는 코미디 공연들",
			button: "코미디 보러가기",
			backgroundColor:
				"bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500",
			path: "/performances?type=comedy",
			image: "/icons/main/comedy.svg",
		},
		{
			id: 2,
			description: "꿈에 나올 것만 같은",
			button: "호러 보러가기",
			backgroundColor:
				"bg-gradient-to-b from-neutral-600 via-zinc-900 to-black",
			path: "/performances?type=horror",
			image: "/icons/main/horror.svg",
		},
		{
			id: 3,
			description: "오늘 설레이고 싶어요",
			button: "로맨스 보러가기",
			backgroundColor:
				"bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-300",
			path: "/performances?type=romance",
			image: "/icons/main/romance.svg",
		},
		{
			id: 4,
			description: "식은땀이 흐르는",
			button: "스릴러 보러가기",
			backgroundColor:
				"bg-gradient-to-br from-slate-900 via-slate-800 to-stone-900",
			path: "/performances?type=thriller",
			image: "/icons/main/thriller.svg",
		},
		{
			id: 5,
			description: "감동과 전율을 주는",
			button: "다큐멘터리 보러가기",
			backgroundColor: "bg-gradient-to-r from-teal-700 via-cyan-700 to-sky-700",
			path: "/performances?type=documentary",
			image: "/icons/main/documentary.svg",
		},
	];

	return (
		<div className="mb-8 md:mb-12">
			<Swiper
				modules={[Autoplay, Pagination, Navigation, Keyboard, A11y]}
				loop
				autoplay={{ delay: 2500, disableOnInteraction: false }}
				pagination={{ clickable: true }}
				navigation
				keyboard={{ enabled: true }}
				className="h-56 sm:h-64 md:h-96">
				{items.map((v) => (
					<SwiperSlide key={v.id}>
						<div
							className={`flex h-auto w-full flex-row items-center justify-between gap-6 px-6 py-8 md:h-full md:flex-row md:px-20 ${v.backgroundColor}`}>
							<div className="flex flex-col gap-3 text-center md:text-left">
								<p className="text-base font-semibold text-white sm:text-lg md:text-2xl">
									{v.description}
								</p>
								<Link
									to={v.path}
									className="inline-block self-center rounded-xl border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:self-start">
									{v.button}
								</Link>
							</div>

							<img
								src={v.image}
								alt={`${v.description} 카테고리 이미지`}
								className="h-48 w-48 object-contain sm:h-64 sm:w-64 md:h-80 md:w-80"
								loading="lazy"
								draggable={false}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
