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
			"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjOTY4ZDUzYS1kZTg1LTQ1Y2ItOWE4ZS1kMTM1YTVhMzg3NzMiLCJpYXQiOjE3Njc5NTU1NzcsImV4cCI6MTc2Nzk1OTE3N30.5-pw6-ry3eOTg-TRdy0_wgpD5pgI4e752hL74guEm_MoIVAUXtkxFMSO4gLFbE-Nduz56hDGtIiAGNJVLVCY4A",
		refreshToken:
			"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjOTY4ZDUzYS1kZTg1LTQ1Y2ItOWE4ZS1kMTM1YTVhMzg3NzMiLCJpYXQiOjE3Njc5NTU1NzcsImV4cCI6MTc2OTE2NTE3N30.Uv8_cjMNvFSZdBqINapgwjY-PDcYKxxAQ5mogr2wi6z0lFBKfv8_QtKjx8B8XRL7ileLhLeR_vwHMpCeSGnDpA",
		...mockUserData,
	},
};
