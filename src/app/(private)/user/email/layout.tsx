import { getSession } from "config/next-auth";
import { redirect } from "next/navigation";
import Footer from "views/components/Footer";
import Header from "views/components/Header";
import Main from "views/components/Main";

type Props = { children?: React.ReactNode | undefined };

const UsersEmailVerificationLayout = async ({ children }: Props) => {
	// Check if the user is authenticated.
	const session = await getSession();

	// If the user is not super admin, redirect them to the dashboard page.
	if (session?.user?.emailVerified) redirect("/dashboard");

	// If the user is super admin, let them stay on the page.
	return (
		<>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</>
	);
};

export default UsersEmailVerificationLayout;
