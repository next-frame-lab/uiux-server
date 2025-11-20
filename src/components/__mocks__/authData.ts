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
			"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjOTY4ZDUzYS1kZTg1LTQ1Y2ItOWE4ZS1kMTM1YTVhMzg3NzMiLCJpYXQiOjE3NjM2MjQ5ODksImV4cCI6MTc2MzYyODU4OX0.zIi3Z_ZcTHZvgSXGTf1hkcoJItmKhBsX5bR0sdjeWOlX3bagZJR0n992hfSVhftPrZu4k0I2-J37NRn2TvFb4A",
		refreshToken:
			"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjOTY4ZDUzYS1kZTg1LTQ1Y2ItOWE4ZS1kMTM1YTVhMzg3NzMiLCJpYXQiOjE3NjM2MjQ5ODksImV4cCI6MTc2NDgzNDU4OX0.LFhvGqmnRIagihF1N11LjBC-M8q_k8O0V7hQFmbRdpQ7GDAJN75EkMpcmgGVuYB8Lp9xgV5WJxiM_h2XZ8Nnhw",
		...mockUserData,
	},
};
