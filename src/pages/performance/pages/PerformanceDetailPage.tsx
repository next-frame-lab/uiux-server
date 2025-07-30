import Header from "../../../components/layout/Header.tsx";
import Footer from "../../../components/layout/Footer.tsx";

export default function PerformanceDetailPage() {
	return (
		<div>
			<Header />

			<main className="bg-[#FBFBFB]">
				<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<div className="grid gap-x-12 md:grid-cols-3">
						{/* 공연 포스터 */}
						<div>
							<p className="text-4xl font-bold text-gray-900">오페라 유령</p>
							<p className="font-bold mt-4 flex flex-col gap-y-2 text-sm text-gray-600">
								평점 : 4.6
							</p>
							<div className="mt-8 aspect-[3/4] h-120 bg-gray-200 rounded-2xl mb-3" />
						</div>

						{/* 공연 상세 정보 */}
						<div className="mt-8 flex flex-col md:col-span-2 md:mt-0">
							<p className="mt-28 flex flex-col gap-y-2 text-sm text-gray-600">
								타입 : 로맨스
							</p>
							<p className="mt-4 flex flex-col gap-y-2 text-sm text-gray-600">
								장르 : 오페라
							</p>
							<p className="mt-4 flex flex-col gap-y-2 text-sm text-gray-600">
								공연 시간 : 130분
							</p>
							<p className="mt-4 flex flex-col gap-y-2 text-sm text-gray-600">
								장소 : 부산문화회관 부산광역시 남구 유엔로 123
							</p>
							<p className="mt-4 flex flex-col gap-y-2 text-sm text-gray-600">
								공연 날짜 : 2025-09-10, 2025-09-13
							</p>

							{/* 좌석 가격 */}
							<div className="mt-15">
								<h2 className="text-xl font-bold">좌석 가격</h2>
								<div className="mt-2 flex flex-col text-gray-800">
									<p>A석 : 120,000원</p>
									<p>B석 : 150,000원</p>
								</div>
							</div>

							{/* 관람 일정 & 시간 선택 */}
							<div className="mt-15">
								<h2 className="text-xl font-bold">관람 일정 & 시간 선택</h2>
								<button
									type="button"
									className="mt-2 flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left">
									<div>
										<p className="font-medium text-gray-800">2025-09-10</p>
										<p className="text-sm text-gray-500">19:00 시</p>
									</div>
								</button>
							</div>

							{/* 티켓 예매하기 버튼 */}
							<div className="mt-20 flex justify-end">
								<button
									type="button"
									className="rounded-lg bg-gray-200 px-6 py-2 font-semibold text-gray-700 hover:bg-gray-300">
									티켓 예매하기
								</button>
							</div>

							{/* 공연 소개 부분 */}
							<div className="mt-16">
								<div className="  pt-10">
									<p className="text-2xl font-bold">공연 소개</p>
									<p className="mt-4 text-gray-700">
										전설적인 오페라의 유령이 다시 돌아옵니다.
									</p>
								</div>
							</div>

							{/* 리뷰 부분 */}
							<div className="mt-12 pt-10">
								<p className="text-2xl font-bold">리뷰</p>
								<p className="mt-4 mb-100 text-gray-700">
									해당 칸은 리뷰 작성을 위한 칸입니다.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
