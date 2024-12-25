import type { Metadata } from "next";

export const metadata: Metadata = { title: { default: "Dashboard", template: "%s | Dashboard" } };

const DashboardLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<>
		<header>Dashboard Header</header>
		<main>
			<aside>
				<nav>
					<p>Dashboard Nav section</p>
				</nav>
			</aside>
			{children}
		</main>
		<footer>Dashboard Footer</footer>
	</>
);

export default DashboardLayout;
