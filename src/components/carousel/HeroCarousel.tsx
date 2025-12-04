import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Item = {
	id: number;
	description: string;
	button: string;
	backgroundColor: string;
	path: string;
	image: string;
};

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
		description: "심장 쫄깃한 공포의 순간을 느껴보세요",
		button: "호러 보러가기",
		backgroundColor: "bg-gradient-to-b from-neutral-600 via-zinc-900 to-black",
		path: "/performances?type=horror",
		image: "/icons/main/horror.svg",
	},
	{
		id: 3,
		description: "두근거리는 설렘, 오늘은 로맨스 어때요?",
		button: "로맨스 보러가기",
		backgroundColor:
			"bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-300",
		path: "/performances?type=romance",
		image: "/icons/main/romance.svg",
	},
	{
		id: 4,
		description: "긴장감 폭발! 손에 땀나는 스릴러",
		button: "스릴러 보러가기",
		backgroundColor:
			"bg-gradient-to-br from-slate-900 via-slate-800 to-stone-900",
		path: "/performances?type=thriller",
		image: "/icons/main/thriller.svg",
	},
	{
		id: 5,
		description: "현실보다 더 깊이 있는 감동을 만나는 시간",
		button: "다큐멘터리 보러가기",
		backgroundColor: "bg-gradient-to-r from-teal-700 via-cyan-700 to-sky-700",
		path: "/performances?type=documentary",
		image: "/icons/main/documentary.svg",
	},
];

export default function HeroCarousel() {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setInterval(
			() => setCurrentSlide((prev) => (prev + 1) % items.length),
			4000
		);
		return () => clearInterval(timer);
	}, []);

	const goToSlide = (index: number) => setCurrentSlide(index);
	const goToPrevious = () =>
		setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
	const goToNext = () => setCurrentSlide((prev) => (prev + 1) % items.length);

	return (
		<div className="relative overflow-hidden bg-gray-900">
			<div className="relative h-[400px]">
				{items.map((item, index) => (
					<div
						key={item.id}
						className={`absolute inset-0 transition-opacity duration-500 ${
							index === currentSlide ? "opacity-100" : "opacity-0"
						}`}>
						<div
							className={`relative flex h-full items-center overflow-hidden ${item.backgroundColor}`}>
							<div className="container mx-auto px-4">
								<div className="max-w-2xl text-white">
									<p className="mb-5 text-2xl sm:text-4xl">
										{item.description}
									</p>
									<p className="mb-5">올해의 대작들, 지금 바로 만나보세요</p>
									<div className="flex gap-4">
										<Link
											to={item.path}
											className="rounded-lg bg-[#FBFBFB] px-6 py-3 text-base text-gray-900 transition-colors hover:bg-white">
											{item.button}
										</Link>
										<button
											type="button"
											className="rounded-lg border border-white/60 px-6 py-3 text-basetext-white transition-colors hover:bg-white/10">
											상세정보
										</button>
									</div>
								</div>
							</div>
							<img
								src={item.image}
								alt={item.description}
								className="pointer-events-none absolute right-8 bottom-6 h-40 w-40 object-contain sm:right-16 sm:bottom-10 sm:h-48 sm:w-48"
								loading="lazy"
							/>
						</div>
					</div>
				))}
			</div>

			<button
				type="button"
				onClick={goToPrevious}
				aria-label="이전 배너"
				className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-2xl font-bold text-gray-800 shadow-lg transition-all hover:scale-110 hover:bg-white">
				‹
			</button>
			<button
				type="button"
				onClick={goToNext}
				aria-label="다음 배너"
				className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-2xl font-bold text-gray-800 shadow-lg transition-all hover:scale-110 hover:bg-white">
				›
			</button>

			<div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
				<div className="flex gap-2">
					{items.map((item, index) => (
						<button
							key={item.id}
							type="button"
							onClick={() => goToSlide(index)}
							aria-label={`${index + 1}번째 배너로 이동`}
							className={`rounded-full transition-all ${
								index === currentSlide
									? "h-2 w-8 bg-white"
									: "h-2 w-2 bg-white/50"
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
