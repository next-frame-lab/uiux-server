import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Item = {
	id: number;
	description: string;
	button: string;
	path: string;
	image: string;
};

const items: Item[] = [
	{
		id: 1,
		description: "무대를 채우는 라이브의 열기",
		button: "콘서트 보러가기",
		path: "/performances?type=concert",
		image: "/icons/main/concert.png",
	},
	{
		id: 2,
		description: "이야기와 음악이 만나는 순간",
		button: "뮤지컬 보러가기",
		path: "/performances?type=musical",
		image: "/icons/main/musical.png",
	},
	{
		id: 3,
		description: "아이들의 상상이\n무대가 되는 시간",
		button: "어린이극 보러가기",
		path: "/performances?type=children_theater",
		image: "/icons/main/children_theater.png",
	},
	{
		id: 4,
		description: "몸으로 그려내는 예술",
		button: "무용 보러가기",
		path: "/performances?type=dance",
		image: "/icons/main/dance.png",
	},
	{
		id: 5,
		description: "대사와 감정으로\n완성되는 무대",
		button: "연극 보러가기",
		path: "/performances?type=play",
		image: "/icons/main/play.png",
	},
	{
		id: 6,
		description: "클래식이 울려 퍼지는 밤",
		button: "오페라 보러가기",
		path: "/performances?type=opera",
		image: "/icons/main/opera.png",
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

	return (
		<div className="relative overflow-hidden">
			<div className="relative aspect-[4.5/2]">
				{items.map((item, index) => {
					let position = "translate-x-full";
					if (index === currentSlide) {
						position = "translate-x-0";
					} else if (index < currentSlide) {
						position = "-translate-x-full";
					}

					return (
						<div
							key={item.id}
							className={`absolute inset-0 transition-transform duration-500 ease-out ${position}`}>
							{/* 배경 이미지 */}
							<div className="absolute inset-0">
								<img
									src={item.image}
									alt=""
									className="w-full h-full object-cover"
									loading="lazy"
								/>
								{/* 어두운 오버레이 */}
								<div className="absolute inset-0 bg-black/40" />
							</div>

							{/* 메인 컨텐츠 */}
							<div className="relative flex h-full items-center">
								<div className="container mx-auto px-6 md:px-12 lg:px-16">
									<div className="grid md:grid-cols-2 gap-12 items-center">
										{/* 텍스트 영역 */}
										<div className="space-y-6 md:space-y-8">
											<div className="space-y-4">
												<h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg whitespace-pre-line">
													{item.description}
												</h2>
												<p className="text-lg md:text-xl text-white/90 drop-shadow">
													올해의 대작들, 지금 바로 만나보세요
												</p>
											</div>

											{/* 버튼 */}
											<div className="flex flex-wrap gap-3">
												<Link
													to={item.path}
													className="px-8 py-3.5 bg-white text-gray-900 rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-sm">
													{item.button}
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* 썸네일 네비게이션 인디케이터 - PC */}
			<div className="hidden md:block absolute bottom-6 left-0 right-0 z-10">
				<div className="container mx-auto px-6 md:px-12 lg:px-16">
					<div className="flex gap-4">
						{items.map((item, index) => (
							<button
								key={item.id}
								type="button"
								onClick={() => goToSlide(index)}
								aria-label={`${index + 1}번째 배너로 이동`}
								className={`relative rounded-lg overflow-hidden transition-all ${
									index === currentSlide
										? "w-16 h-12 ring-2 ring-white"
										: "w-12 h-10 opacity-60 hover:opacity-100"
								}`}>
								<img
									src={item.image}
									alt={item.description}
									className="w-full h-full object-cover"
								/>
								{index === currentSlide && (
									<div className="absolute inset-0 bg-white/10" />
								)}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* 페이지 인디케이터 - Mobile */}
			<div className="md:hidden absolute bottom-6 right-6 z-10">
				<div className="bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1">
					<span className="text-white text-sm">
						{currentSlide + 1} / {items.length}
					</span>
				</div>
			</div>
		</div>
	);
}
