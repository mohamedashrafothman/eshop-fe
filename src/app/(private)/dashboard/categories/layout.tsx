import { getSession } from "config/next-auth";
import { redirect } from "next/navigation";
import vars from "utils/vars";

type Props = { children?: React.ReactNode | undefined };

const CategoriesLayout = async ({ children }: Props) => {
	// Check if the user is authenticated.
	const session = await getSession();

	// If the user is not super admin, redirect them to the dashboard page.
	if (session?.user?.role !== vars.roles.superAdmin) redirect("/dashboard");

	// If the user is super admin, let them stay on the page.
	return <>{children}</>;
};

export default CategoriesLayout;
