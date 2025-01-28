import { getSession } from "config/next-auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import vars from "utils/vars";

const PAGE_TITLE = "Users";
export const metadata: Metadata = { title: PAGE_TITLE };

type Props = { children?: React.ReactNode | undefined };

const UsersLayout = async ({ children }: Props) => {
	// Check if the user is authenticated.
	const session = await getSession();

	// If the user is not super admin, redirect them to the dashboard page.
	if (session?.user?.role !== vars.roles.superAdmin) redirect("/dashboard");

	// If the user is super admin, let them stay on the page.
	return (
		<>
			<h1 className="display-5 text-capitalize mb-0">
				<strong>{PAGE_TITLE}</strong>
			</h1>
			{children}
		</>
	);
};

export default UsersLayout;
