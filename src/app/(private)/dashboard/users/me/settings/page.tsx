import { Metadata } from "next";
import Breadcrumb from "views/components/Breadcrumb";

const PAGE_TITLE = "Profile Settings";
export const metadata: Metadata = { title: PAGE_TITLE };

const ProfileSettings = () => (
	<>
		<div className="py-2">
			<Breadcrumb
				home={{ href: "/dashboard", title: "Dashboard" }}
				items={[{ href: "/dashboard/users/me/settings", title: PAGE_TITLE }]}
			/>
		</div>
		<h1 className="text-capitalize">
			<strong>{PAGE_TITLE}</strong>
		</h1>
	</>
);

export default ProfileSettings;
