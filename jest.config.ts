// jest.config.ts
import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.app.json" }],
	},
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

	moduleNameMapper: {
		"\\.(gif|png|jpe?g|svg|webp|bmp)$":
			"<rootDir>/src/components/__mocks__/fileMock.ts",
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
};

export default config;
