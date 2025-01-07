import { getSession } from "config/next-auth";
import { redirect } from "next/navigation";

type Props = { children: React.ReactNode };

const NonPublicLayout = async ({ children }: Props) => {
	// Check if the user is authenticated.
	const session = await getSession();

	// If the user is not authenticated, redirect them to the login page.
	if (!session) redirect("/auth/login");

	// If the user is authenticated, let them stay on the page.
	return (
		<>
			<header>Non Public Header</header>
			<main>{children}</main>
			<footer>Non Public Footer</footer>
		</>
	);
};

export default NonPublicLayout;
