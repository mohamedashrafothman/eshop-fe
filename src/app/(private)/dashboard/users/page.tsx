import { Metadata } from "next";
import Breadcrumb from "views/components/Breadcrumb";

const PAGE_TITLE = "Users";
export const metadata: Metadata = { title: PAGE_TITLE };

const Users = () => (
	<>
		<div className="py-2">
			<Breadcrumb
				home={{ href: "/dashboard", title: "Dashboard" }}
				items={[{ href: "/dashboard/users", title: PAGE_TITLE }]}
			/>
		</div>
		<h1 className="text-capitalize">
			<strong>{PAGE_TITLE}</strong>
		</h1>
	</>
);

export default Users;
