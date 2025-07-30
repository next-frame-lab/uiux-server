export default function Footer() {
	return (
		<footer className="bg-black">
			<div className="mx-auto w-full max-w-screen-xl px-6 py-10 md:px-8 md:py-16">
				<div className="flex flex-col items-center gap-y-8 text-center text-white">
					<div className="flex flex-col gap-y-4 md:flex-row md:gap-x-12">
						<p>About</p>
						<p>Contact</p>
						<p>Privacy Policy</p>
						<p>Terms of Service</p>
					</div>
					<div>
						<p>@2025 Stage Access. All rights reserved.</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
