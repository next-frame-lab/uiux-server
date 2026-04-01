import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const IMAGE_URL =
	"https://images.unsplash.com/photo-1515100398104-f7221da41f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1Mjg1NDMwfDA&ixlib=rb-4.1.0&q=80&w=1080";

const teamMembers = [
	{
		name: "김민서",
		role: "Lead Backend Engineer",
		github: "git-mesome",
		responsibilities: [
			"좌석 결제 및 환불 프로세스 구현",
			"티켓(QR 코드) 발급 시스템",
			"공연 검색 기능 고도화 (QueryDSL)",
			"DB/배포/모니터링 환경 구축 및 DB 설계",
		],
	},
	{
		name: "안진표",
		role: "Backend Engineer",
		github: "Jinpyo-An",
		responsibilities: [
			"공연 좌석 및 예매 프로세스 구현",
			"소셜 로그인(OAuth2) 및 JWT 인증/인가",
			"공연 검색 및 리뷰(좋아요) 기능",
			"배포 환경 구축 및 API 설계",
		],
	},
	{
		name: "박근원",
		role: "Lead Frontend Engineer",
		github: "Geunone2",
		responsibilities: [
			"GitHub Actions CI/CD 구축",
			"결제, 공연, 좌석 등 핵심 도메인 기능 구현",
			"결제, 공연, 좌석 등 핵심 도메인 기능 단위 테스트 진행",
			"OAuth Bearer 토큰 인증을 통한 페이지 접근 제한 & 승인 구현",
		],
	},
	{
		name: "강은현",
		role: "Frontend Engineer",
		github: "kaeuhy",
		responsibilities: [
			"정적 페이지 및 반응형 CSS 구현",
			"메인 페이지 공연 목록 API 연동",
			"카카오 로그인/회원가입 OAuth 구현",
			"Recoil 상태 관리를 통한 토큰 관리",
			"Zustand 라이브러리 도입 및 마이그레이션",
		],
	},
];

export default function AboutPage() {
	const location = useLocation();

	useEffect(() => {
		// 해시가 있으면 해당 요소로 스크롤
		if (location.hash) {
			const element = document.querySelector(location.hash);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		} else {
			// 해시가 없으면 페이지 상단으로
			window.scrollTo(0, 0);
		}
	}, [location]);
	return (
		<>
			<section className="relative bg-blue-400 py-20 md:py-32 overflow-hidden mb-16 md:mb-24">
				<div className="absolute inset-0 opacity-20">
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{ backgroundImage: `url(${IMAGE_URL})` }}
					/>
				</div>
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
						<span className="text-white text-sm">About NextFrame</span>
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
						차세대 공연 플랫폼을
						<br />
						만들어갑니다
					</h1>
					<p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
						시네마틱 UX와 인터랙티브 기술을 결합해
						<br className="hidden md:block" />
						공연 예매의 새로운 기준을 제시합니다
					</p>
				</div>
			</section>

			<section id="team" className="py-16 md:py-24 mb-16 md:mb-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
							개발 팀
						</h2>
						<p className="text-gray-600 text-lg">NextFrame을 만드는 개발자들</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{teamMembers.map((member) => (
							<div
								key={member.github}
								className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#2E2356]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
								<div className="relative overflow-hidden">
									<div className="absolute inset-0 bg-gradient-to-t from-[#2E2356] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10" />
									<img
										src={`https://github.com/${member.github}.png`}
										alt={member.name}
										className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
									/>
								</div>
								<div className="p-6">
									<div className="inline-block px-4 py-2 bg-purple-100 rounded-full mb-3">
										<span className="text-[#2E2356] text-sm font-medium">
											{member.role}
										</span>
									</div>
									<h3 className="text-2xl font-bold text-blue-950 mb-3">
										{member.name}
									</h3>
									<a
										href={`https://github.com/${member.github}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-base text-gray-500 hover:text-[#2E2356] transition-colors mb-4 inline-block">
										@{member.github}
									</a>
									<ul className="space-y-3">
										{member.responsibilities.map((task) => (
											<li
												key={task}
												className="text-gray-600 text-base flex items-start">
												<span className="text-[#2E2356] mr-2 mt-1">•</span>
												<span>{task}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-16 md:py-24 bg-blue-400">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
						프로젝트에 참여하세요 !
					</h2>
					<p className="text-white/80 text-lg mb-8">
						함께 더 나은 공연 플랫폼을 만들어갈 수 있습니다
					</p>
					<a
						href="https://github.com/next-frame-lab"
						target="_blank"
						rel="noopener noreferrer"
						className="px-8 py-3 bg-white text-blue-950 font-medium rounded-lg hover:bg-white/90 transition-all inline-block">
						기여하기
					</a>
				</div>
			</section>
		</>
	);
}
