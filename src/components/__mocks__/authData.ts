// MOCK 사용자 데이터 정의
import { LoginResponse } from "../../types/ApiDataTypes.ts";

export const mockUserData = {
	imageUrl:
		"http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg",
	name: "박근원",
	age: 27,
	email: "rmsdnjsaos@naver.com",
};

export const mockLoginResponse: LoginResponse = {
	code: "SUCCESS",
	data: {
		accessToken:
			"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjOTY4ZDUzYS1kZTg1LTQ1Y2ItOWE4ZS1kMTM1YTVhMzg3NzMiLCJpYXQiOjE3NzA2Mjg2NTIsImV4cCI6MTc3MDYzMjI1Mn0.uxHhHYPC5mle4JicKvdgdlXa-P40i1ZyIMMoJH14BrgvmVLZXxh-IgC8yWaTh7rlgGDlslEG5Ds9sYprMy7x0A",
		refreshToken:
			"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjOTY4ZDUzYS1kZTg1LTQ1Y2ItOWE4ZS1kMTM1YTVhMzg3NzMiLCJpYXQiOjE3NzA2Mjg2NTIsImV4cCI6MTc3MTgzODI1Mn0.glmEl58keciaJtyAbUgj5HZYWkoXmergnKDwaNzQ2mWjWOce_XBzQAHa_ztRLViZJQMX5swYYnH2s3vrH4ZQ9A",
		...mockUserData,
	},
};
