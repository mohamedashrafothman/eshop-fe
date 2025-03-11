import { Metadata } from "next";
import NextLink from "views/components/NextLink";

const PAGE_TITLE = "Address";
export const metadata: Metadata = { title: PAGE_TITLE };

const Address = () => (
	<>
		<div className="hstack gap-gutter flex-nowrap justify-content-between">
			<h1 className="display-5 text-capitalize">
				<strong>{PAGE_TITLE}</strong>
			</h1>
			<NextLink
				href="/dashboard/address/store"
				className="btn btn-primary border-primary-dark text-capitalize icon-link">
				<svg className="bi w-22px h-22px" width="22" height="22">
					<use href="#icon-plus" />
				</svg>
				<strong>Add new User</strong>
			</NextLink>
		</div>
		<p className="mb-0">Address List</p>
	</>
);

export default Address;
