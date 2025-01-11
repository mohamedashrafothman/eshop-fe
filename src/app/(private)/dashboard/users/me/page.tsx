import { Metadata } from "next";
import Breadcrumb from "views/components/Breadcrumb";

const PAGE_TITLE = "Profile";
export const metadata: Metadata = { title: PAGE_TITLE };

const DashboardProfile = () => (
	<>
		<div className="py-2">
			<Breadcrumb
				items={[
					{ href: "/dashboard", title: "Dashboard" },
					{ href: "/dashboard/users/me", title: PAGE_TITLE },
				]}
			/>
		</div>
		<h1 className="text-capitalize">
			<strong>{PAGE_TITLE}</strong>
		</h1>
	</>
);

export default DashboardProfile;
