const NonPublicLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<>
		<header>Non Public Header</header>
		<main>
			<p>Non Public Main section</p>
			{children}
		</main>
		<footer>Non Public Footer</footer>
	</>
);

export default NonPublicLayout;
