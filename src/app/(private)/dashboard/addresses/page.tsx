import { Metadata } from "next";
import NextLink from "views/components/NextLink";
import { default as AddressesListSection } from "views/sections/AddressesList";

const PAGE_TITLE = "Addresses";
export const metadata: Metadata = { title: PAGE_TITLE };

const Addresses = () => (
	<>
		<div className="hstack gap-gutter flex-nowrap justify-content-between">
			<h1 className="display-5 text-capitalize">
				<strong>{PAGE_TITLE}</strong>
			</h1>
			<NextLink
				href="/dashboard/addresses/store"
				className="btn btn-primary border-primary-dark text-capitalize icon-link icon-link-hover icon-link-hover-rotate">
				<svg className="bi w-22px h-22px" width="22" height="22">
					<use href="#icon-plus" />
				</svg>
				<strong>Add new Address</strong>
			</NextLink>
		</div>
		<AddressesListSection />
	</>
);

export default Addresses;
