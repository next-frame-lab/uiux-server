import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

export default function Footer() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className="bg-[#FBFBFB] pt-16 pb-8  border-gray-100">
			<div className="mx-auto w-full max-w-screen-xl px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{/* 프로젝트 설명 */}
					<div className="lg:col-span-2">
						<h2 className="text-xl font-bold text-blue-950 mb-4">NextFrame</h2>
						<p className="text-gray-500 text-sm leading-relaxed mb-6 pr-4">
							시네마틱 UX와 인터랙티브 기술을 결합해
							<br />
							차세대 영화 플랫폼을 설계합니다.
						</p>
						<div className="flex gap-x-4">
							<a
								href="https://github.com/next-frame-lab"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
								aria-label="GitHub">
								<FaGithub className="w-5 h-5" />
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noreferrer"
								className="p-2 bg-blue-50 text-blue-400 rounded-lg hover:bg-blue-100 transition-colors"
								aria-label="Twitter">
								<FaTwitter className="w-5 h-5" />
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noreferrer"
								className="p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
								aria-label="LinkedIn">
								<FaLinkedin className="w-5 h-5" />
							</a>
							<a
								href="mailto:contact@nextframe.com"
								className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-colors"
								aria-label="Email">
								<FaEnvelope className="w-5 h-5" />
							</a>
						</div>
					</div>

					{/* 회사 */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-4">회사</h3>
						<ul className="space-y-3 text-sm text-gray-500">
							<li>
								<a href="/" className="hover:text-blue-600">
									회사 소개
								</a>
							</li>
							<li>
								<a href="/" className="hover:text-blue-600">
									팀
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* 구독 섹션 */}
				<div className="bg-gray-100 rounded-2xl p-6 md:p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="text-center md:text-left">
						<h3 className="text-lg font-bold text-gray-900 mb-1">
							프리미어 셀렉션
						</h3>
						<p className="text-sm text-gray-500">
							큐레이션된 최신 영화 정보를 누구보다 먼저 만나보세요
						</p>
					</div>
					<form className="flex w-full md:w-auto gap-2">
						<input
							type="email"
							placeholder="이메일 주소"
							className="flex-1 w-full md:w-64 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
						/>
						<button
							type="button"
							className="px-6 py-3 bg-blue-100 text-blue-600 font-semibold rounded-xl text-sm hover:bg-blue-200 transition-colors whitespace-nowrap">
							구독하기
						</button>
					</form>
				</div>

				{/* 위로 가기 버튼 */}
				<div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-sm text-gray-400">
						© 2026 NextFrame. Crafted with dedication and vision by our team
					</p>
					<button
						type="button"
						onClick={scrollToTop}
						className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
						aria-label="맨 위로 이동">
						<ArrowUpIcon className="w-5 h-5" />
					</button>
				</div>
			</div>
		</footer>
	);
}
