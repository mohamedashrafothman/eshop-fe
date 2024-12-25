const PublicLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<>
		<header>Public Header</header>
		<main>
			<p>Public Main section</p>
			{children}
		</main>
		<footer>Public Footer</footer>
	</>
);

export default PublicLayout;
