import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";

export default function FailPage() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/payments`);
	};

	return (
		<div>
			<Header />
			<main className="bg-[#FBFBFB]">
				<div className="mx-auto flex max-w-2xl flex-col items-center gap-y-6">
					<div className="max-w-7xl mx-auto py-40">
						<h1 className="text-center text-5xl font-bold pb-28">결제 실패</h1>

						<h2 className="text-center text-xl pb-10">
							결제 실패하였습니다. 다시 시도해주세요.
						</h2>

						{/* 확인 버튼 */}
						<div className="py-20">
							<button
								type="button"
								onClick={handleClick}
								className="w-full rounded-lg bg-gray-200 py-3 text-lg font-bold text-shadow-black hover:bg-blue-200">
								돌아가기
							</button>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
