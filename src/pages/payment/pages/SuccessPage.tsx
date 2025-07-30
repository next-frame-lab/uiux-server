import Header from "../../../components/layout/Header.tsx";
import Footer from "../../../components/layout/Footer.tsx";
import PayInformation from "../../../components/layout/PayInformation.tsx";

export default function SuccessPage() {
	return (
		<div>
			<Header />
			<main className="bg-[#FBFBFB]">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-y-6">
					<div className="max-w-7xl mx-auto py-40">
						<h1 className="text-center text-5xl font-bold pb-28">결제 성공!</h1>

						<h2 className="text-center text-xl pb-10">
							결제 완료되었습니다! 마이 페이지나 이메일을 통해 QR코드를 확인할
							수 있습니다.
						</h2>

						<PayInformation />

						{/* 확인 버튼 */}
						<div className="py-20">
							<button
								type="button"
								className="w-full rounded-lg bg-gray-200 py-3 text-lg font-bold text-shadow-black hover:bg-blue-200">
								확인하기
							</button>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
