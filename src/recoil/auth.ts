import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom<User | null>({
	key: "userState",
	default: null,
	effects_UNSTABLE: [persistAtom],
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
