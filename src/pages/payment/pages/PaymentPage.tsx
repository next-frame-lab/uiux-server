import PayInformation from "../../../components/layout/PayInformation.tsx";

export default function PaymentPage() {
	return (
		<main className="bg-[#FBFBFB] py-5">
			<div className="mx-auto flex max-w-2xl flex-col items-center gap-y-6">
				<div className="max-w-7xl mx-auto py-40">
					<h1 className="text-center text-5xl font-bold pb-28">결제</h1>

					<h2 className="text-center text-3xl font-bold pb-10">결제 수단</h2>

					{/* 결제 수단 */}
					<div className="flex gap-x-10 py-5 pb-15">
						{/* 카카오 */}
						<button
							type="button"
							className="rounded-lg border border-gray-300 bg-white px-10 py-3 hover:bg-gray-100">
							<img
								src="/icons/payment_kakao.png"
								alt="kakao"
								className="w-25 h-10"
							/>
						</button>

						{/* 네이버 */}
						<button
							type="button"
							className="rounded-lg border border-gray-300 bg-white px-10 py-3 hover:bg-gray-100">
							<img
								src="/icons/payment_naver.png"
								alt="naver"
								className="w-25 h-9"
							/>
						</button>

						{/* 토스 */}
						<button
							type="button"
							className="rounded-lg border border-gray-300 bg-white px-10 py-3 hover:bg-gray-100">
							<img
								src="/icons/payment_toss.png"
								alt="toss"
								className="w-28 h-6"
							/>
						</button>
					</div>

					<PayInformation />

					{/* 결제 버튼 */}
					<div className="py-15">
						<button
							type="button"
							className="w-full rounded-lg bg-gray-200 py-3 text-lg font-bold text-shadow-black hover:bg-blue-200">
							결제
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
