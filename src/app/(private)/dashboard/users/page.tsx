import { Metadata } from "next";
import Breadcrumb from "views/components/Breadcrumb";

const PAGE_TITLE = "Users";
export const metadata: Metadata = { title: PAGE_TITLE };

const Users = () => (
	<>
		<Breadcrumb
			home={{ href: "/dashboard", title: "Dashboard" }}
			items={[{ href: "/dashboard/users", title: PAGE_TITLE }]}
		/>
		<h1 className="text-capitalize mb-0">
			<strong>{PAGE_TITLE}</strong>
		</h1>
	</>
);

export default Users;
