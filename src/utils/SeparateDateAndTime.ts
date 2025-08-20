function parseYMD(iso: string) {
	const [y, m, d] = iso.split("-").map(Number);
	return { y, m, d };
}

function getDaysInMonth(y: number, m: number) {
	return new Date(y, m, 0).getDate();
}

export { parseYMD, getDaysInMonth };
