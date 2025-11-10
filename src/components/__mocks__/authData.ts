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
			"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjOTY4ZDUzYS1kZTg1LTQ1Y2ItOWE4ZS1kMTM1YTVhMzg3NzMiLCJpYXQiOjE3NjI3NjQyNzQsImV4cCI6MTc2Mjc2Nzg3NH0.6SngU6uBbHBPcvj1omNcxQE1OAlrGZCz0s10WnNtdkkTrFAgl02BEnUkdoAKsTRvblvo9ulDWFx78hHZMPBUYg",
		refreshToken:
			"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjOTY4ZDUzYS1kZTg1LTQ1Y2ItOWE4ZS1kMTM1YTVhMzg3NzMiLCJpYXQiOjE3NjI3NjQyNzQsImV4cCI6MTc2Mzk3Mzg3NH0.zgifYlsR-dkJXH_a3SlhdybH4LPYGQwVxsHPQF-haABOY36QaR5iFaFiXhFOr2FqIb4hf6bID30ZV3U42I6UKw",
		...mockUserData,
	},
};
