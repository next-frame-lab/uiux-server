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
			"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjOTY4ZDUzYS1kZTg1LTQ1Y2ItOWE4ZS1kMTM1YTVhMzg3NzMiLCJpYXQiOjE3NjI4NDQwMjAsImV4cCI6MTc2Mjg0NzYyMH0.pWecY2fz1Nb5rc9Pu1bfIcr9PdsPHo_B7LCrWHgP3ykhySejzihPlpGLXB8JnofjNvVO5MRzQHivQLIpbUrZqQ",
		refreshToken:
			"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjOTY4ZDUzYS1kZTg1LTQ1Y2ItOWE4ZS1kMTM1YTVhMzg3NzMiLCJpYXQiOjE3NjI4NDQwMjAsImV4cCI6MTc2NDA1MzYyMH0.7h5jAWrWGIVqnHRJKEZBUuejGb2i5ps7c8G6qV8xWCWtOxFZxcq96HNNfptQJQ625dyDa9jqLJw04MOt0OYvRA",
		...mockUserData,
	},
};
