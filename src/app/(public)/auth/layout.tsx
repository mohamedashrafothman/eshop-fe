import { getSession } from "config/next-auth";
import { redirect } from "next/navigation";

type Props = { children: React.ReactNode };

const AuthLayout = async ({ children }: Props) => {
	// Check if the user is authenticated.
	const session = await getSession();

	// If the user is authenticated, redirect them to the main page.
	if (session) redirect("/");

	// If the user is not authenticated, let them stay on the page.
	return children;
};

export default AuthLayout;
