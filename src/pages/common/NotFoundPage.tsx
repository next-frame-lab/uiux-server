import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/");
	};
	return (
		<section className="flex w-full h-screen items-center justify-center bg-white text-gray-600">
			<div className="flex flex-col md:flex-row items-center max-w-5xl px-8">
				<img
					src="/icons/404.svg"
					alt="404 Not Found"
					className="w-72 md:w-96 mb-10 md:mb-0 md:mr-14"
				/>
				<div className="text-center md:text-left">
					<h1 className="text-8xl font-extrabold text-black">404</h1>
					<p className="mt-3 text-2xl font-semibold text-gray-800">
						페이지를 찾을 수 없습니다
					</p>
					<p className="mt-5 text-lg text-gray-500 leading-relaxed">
						잘못된 주소로 접속하셨거나, 페이지가 삭제 또는 이동되었습니다.
						<br />
						불편을 드려 죄송합니다. 아래 버튼을 눌러 홈으로 돌아가주세요.
					</p>
					<button
						type="button"
						onClick={handleClick}
						className="mt-8 px-6 py-3 bg-black text-white text-lg rounded-lg hover:bg-gray-800 transition-colors">
						홈으로 돌아가기
					</button>
				</div>
			</div>
		</section>
	);
}
