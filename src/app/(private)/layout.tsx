import { getSession } from "config/next-auth";
import { redirect } from "next/navigation";

type Props = { children?: React.ReactNode | undefined };

const NonPublicLayout = async ({ children }: Props) => {
	// Check if the user is authenticated.
	const session = await getSession();

	// If the user is not authenticated, redirect them to the login page.
	if (!session) redirect("/auth/login");

	// If the user is authenticated, let them stay on the page.
	return children;
};

export default NonPublicLayout;
