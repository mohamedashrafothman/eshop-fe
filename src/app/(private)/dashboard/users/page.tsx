import { Metadata } from "next";
import NextLink from "views/components/NextLink";
import { default as UsersListSection } from "views/sections/UsersList";

const PAGE_TITLE = "Users";
export const metadata: Metadata = { title: PAGE_TITLE };

const Users = () => (
	<>
		<div className="hstack gap-gutter flex-nowrap justify-content-between">
			<h1 className="display-5 text-capitalize">
				<strong>{PAGE_TITLE}</strong>
			</h1>
			<NextLink
				href="/dashboard/users/store"
				className="btn btn-primary border-primary-dark text-capitalize icon-link icon-link-hover icon-link-hover-rotate">
				<svg className="bi w-22px h-22px" width="22" height="22">
					<use href="#icon-plus" />
				</svg>
				<strong>Add new User</strong>
			</NextLink>
		</div>
		<UsersListSection />
	</>
);

export default Users;
