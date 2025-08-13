import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom<User | null>({
	key: "userState",
	default: null,
	effects_UNSTABLE: [persistAtom],
});

export const authState = selector({
	key: "authState",
	get: ({ get }) => {
		const accessToken = localStorage.getItem("accessToken");
		const user = get(userState);

		// 토큰과 사용자 정보가 모두 존재하면, 로그인 상태입니다.
		if (accessToken && user) {
			return {
				isLoggedIn: true,
				user,
			};
		}

		return {
			isLoggedIn: false,
			user: null,
		};
	},
});

export interface User {
	imageUrl: string;
	name: string;
	age: number;
	email: string;
}

export const isLoggedInState = atom<boolean>({
	key: "isLoggedInState",
	default: false,
	effects_UNSTABLE: [persistAtom],
});

export const kakaoSdkReadyState = atom<boolean>({
	key: "kakaoSdkReadyState",
	default: false,
});
