export default function SeatSelectPage() {
	return (
		<main className="bg-[#FBFBFB]">
			<div className="mx-auto max-w-7xl px-8 py-12">
				<div className="flex gap-x-16">
					<div className="flex-1">
						<h1 className="text-4xl font-bold text-gray-900">오페라 유령</h1>
						<h2 className="mt-2 text-2xl font-semibold text-gray-700">
							좌석 선택
						</h2>

						{/* 좌석 선택 UI가 들어갈 빈 칸 */}
						<div className="mt-20 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 py-64" />
					</div>

					{/* 오른쪽 예약 패널 */}
					<div className="w-[380px] flex-shrink-0 rounded-lg bg-gray-50 p-6">
						{/* 공연 일정 */}
						<section>
							<h3 className="text-lg font-bold">공연 일정</h3>
							<div className="mt-4">
								<div className="flex items-center justify-between">
									<button
										type="button"
										className="rounded-full p-1 hover:bg-gray-200">
										{/* 왼쪽 화살표 아이콘 */}
										<svg
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor">
											<path d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" />
										</svg>
									</button>
									<p className="font-semibold">9월 2025</p>
									<button
										type="button"
										className="rounded-full p-1 hover:bg-gray-200">
										{/* 오른쪽 화살표 아이콘 */}
										<svg
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor">
											<path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
										</svg>
									</button>
								</div>
								{/* 요일 */}
								<div className="mt-4 grid grid-cols-7 text-center text-sm font-medium text-gray-500">
									<p>S</p>
									<p>M</p>
									<p>T</p>
									<p>W</p>
									<p>T</p>
									<p>F</p>
									<p>S</p>
								</div>
								{/* 날짜 */}
								<div className="mt-2 grid grid-cols-7 text-center text-sm">
									<p className="py-1" />
									<p className="py-1">1</p>
									<p className="py-1">2</p>
									<p className="py-1">3</p>
									<p className="py-1">4</p>
									<p className="py-1">
										<span className="mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-white">
											5
										</span>
									</p>
									<p className="py-1">6</p>
									<p className="py-1">7</p>
									<p className="py-1">8</p>
									<p className="py-1">9</p>
									<p className="py-1">10</p>
									<p className="py-1">11</p>
									<p className="py-1">12</p>
									<p className="py-1">13</p>
									<p className="py-1">14</p>
									<p className="py-1">15</p>
									<p className="py-1">16</p>
									<p className="py-1">17</p>
									<p className="py-1">18</p>
									<p className="py-1">19</p>
									<p className="py-1">20</p>
									<p className="py-1">21</p>
									<p className="py-1">22</p>
									<p className="py-1">23</p>
									<p className="py-1">24</p>
									<p className="py-1">25</p>
									<p className="py-1">26</p>
									<p className="py-1">27</p>
									<p className="py-1">28</p>
									<p className="py-1">29</p>
									<p className="py-1">30</p>
									<p className="py-1">31</p>
								</div>
							</div>
						</section>

						{/* 관람 선택 시간 */}
						<section className="mt-8 border-t border-gray-200 pt-6">
							<h3 className="text-lg font-bold">관람 선택 시간</h3>
							<div className="mt-4">
								<button
									type="button"
									className="flex w-full items-center gap-x-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-left">
									<div className="flex h-4 w-4 items-center justify-center rounded-full border border-blue-600">
										<div className="h-2 w-2 rounded-full bg-blue-600" />
									</div>
									<span className="font-semibold text-blue-800">19:00</span>
								</button>
							</div>
						</section>

						{/* 좌석 가격 안내 */}
						<section className="mt-8 border-t border-gray-200 pt-6">
							<h3 className="text-lg font-bold">좌석 가격 안내</h3>
							<div className="mt-4 grid grid-cols-2 gap-4">
								<div>
									<p className="text-sm text-gray-500">A석</p>
									<p className="font-semibold">120,000원</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">B석</p>
									<p className="font-semibold">100,000원</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">C석</p>
									<p className="font-semibold">80,000원</p>
								</div>
							</div>
						</section>

						{/* 결제하기 버튼 */}
						<div className="mt-8">
							<button
								type="button"
								className="w-full rounded-lg bg-gray-200 py-3 text-base font-bold text-gray-800 hover:bg-gray-300">
								결제하기
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
