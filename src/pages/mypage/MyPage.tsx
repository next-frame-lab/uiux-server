import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/auth.ts";
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";

export default function MyPage() {
	// Recoil selector를 통해 현재 로그인한 사용자 정보를 가져옵니다.
	const { user } = useRecoilValue(authState);

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1 flex items-center justify-center bg-gray-50">
				<div className="text-center p-8 bg-white rounded-lg shadow-md">
					<h1 className="text-3xl font-bold mb-4">마이페이지</h1>
					{user ? (
						<div className="space-y-3">
							<img
								src={user.imageUrl}
								alt={`${user.name}의 프로필 이미지`}
								className="w-24 h-24 rounded-full mx-auto border-4 border-black"
							/>
							<p className="text-xl">이름: {user.name}</p>
							<p className="text-lg text-gray-600">이메일: {user.email}</p>
							<p className="text-lg text-gray-600">나이: {user.age}세</p>
						</div>
					) : (
						<p>로그인 정보가 없습니다. 로그인 페이지로 이동해주세요.</p>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}
