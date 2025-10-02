export default function getEnvVar(
	key: keyof ImportMetaEnv
): string | undefined {
	return process.env[key];
}
