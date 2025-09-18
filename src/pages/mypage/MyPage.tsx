import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/auth.ts";
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";

export default function MyPage() {
	const { user } = useRecoilValue(authState);

	return (
		<div className="min-h-screen flex flex-col bg-[#FBFBFB]">
			<Header />
			<main className="flex-1 flex justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
				<div className="w-8/12 max-w-sm space-y-6">
					<div>
						<h1 className="text-center text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
							My Profile
						</h1>
					</div>

					{user ? (
						<div className="space-y-6 pt-2">
							{/* 프로필 */}
							<div className="flex items-center space-x-4">
								<img
									src={user.imageUrl}
									alt={`${user.name}의 프로필 이미지`}
									className="w-14 h-16 sm:w-17 sm:h-20 rounded-full"
								/>
								<div>
									<p className="text-xl sm:text-2xl font-bold text-gray-900">
										{user.name}
									</p>
									<p className="text-sm text-gray-500">NextFrame Member</p>
								</div>
							</div>

							{/* 상세 정보 */}
							<div className="space-y-4">
								{/* 이메일 */}
								<div>
									<p className="block text-sm font-medium text-gray-700">
										Email
									</p>
									<div
										id="email"
										className="mt-1 block w-full px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-gray-600">
										{user.email}
									</div>
								</div>
								{/* 나이 */}
								<div>
									<p className="block text-sm font-medium text-gray-700">Age</p>
									<div
										id="age"
										className="mt-1 block w-full px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-gray-600">
										{user.age}세
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="text-center p-8 bg-white rounded-lg shadow-md">
							<p>로그인 정보가 없습니다. 로그인 페이지로 이동해주세요.</p>
						</div>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}
