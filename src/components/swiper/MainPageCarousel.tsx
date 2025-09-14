import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function MainPageCarousel() {
	const slideImage = [
		"bg-blue-500", // 첫 번째 목업 이미지
		"bg-black", // 두 번째 목업 이미지
		"bg-yellow-400", // 세 번째 목업 이미지
		"bg-red-500", // 네 번째 목업 이미지
	];

	return (
		<div className="mb-8 md:mb-12">
			<Swiper
				modules={[Autoplay, Pagination, Navigation]}
				loop
				className="h-56 rounded-2xl sm:h-64 md:h-80"
				autoplay={{ delay: 2500 }}
				pagination={{ clickable: true }}
				navigation>
				{slideImage.map((color) => (
					<SwiperSlide key={color}>
						<div className={`w-full h-full ${color} rounded-2xl`} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
