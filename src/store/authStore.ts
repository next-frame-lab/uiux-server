// 인증 관련 전역 상태 정의
import { create } from "zustand";
import { persist, devtools, combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

export interface User {
    id: string;
    imageUrl: string;
    name: string;
    age: number;
    email: string;
}

export const useAuthStore = create(
    devtools(
        persist(
            immer(
                combine(
                    {
                        user: null as User | null,
                        isKakaoSdkReady: false,
                    },
                    (set) => ({
                        setUser: (user: User) =>
                            set(
                                (state) => {
                                    state.user = user;
                                },
                                // 상태 교체 여부
                                false,
                                // DevTools에 표시될 액션 이름
                                "auth/setUser"
                            ),

                        resetUser: () =>
                            set(
                                (state) => {
                                    state.user = null;
                                },
                                false,
                                "auth/resetUser"
                            ),

                        setKakaoSdkReady: (isReady: boolean) =>
                            set(
                                (state) => {
                                    state.isKakaoSdkReady = isReady;
                                },
                                false,
                                "auth/setKakaoSdkReady"
                            ),
                    })
                )
            ),
            {
                name: "auth-storage",
                partialize: (state) => ({ user: state.user }),
            }
        ),
        { name: "AuthStore" }
    )
);

// 재렌더링 최적화를 위한 커스텀 훅
export const useUser = () => useAuthStore((state) => state.user);

export const useIsLoggedIn = () => {
    const user = useAuthStore((state) => state.user);
    const accessToken = localStorage.getItem("accessToken");
    return !!(accessToken && user);
};

export const useIsKakaoSdkReady = () =>
    useAuthStore((state) => state.isKakaoSdkReady);

export const useAuthState = () => {
    const user = useAuthStore((state) => state.user);
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && user) {
        return { isLoggedIn: true, user };
    }
    return { isLoggedIn: false, user: null };
};

export const useAuthActions = () =>
    useAuthStore(
        useShallow((state) => ({
            setUser: state.setUser,
            resetUser: state.resetUser,
            setKakaoSdkReady: state.setKakaoSdkReady,
        }))
    );
