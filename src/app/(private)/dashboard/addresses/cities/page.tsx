import { Metadata } from "next";
import NextLink from "views/components/NextLink";
import { default as CitiesListSection } from "views/sections/CitiesList";

const PAGE_TITLE = "Cities";
export const metadata: Metadata = { title: PAGE_TITLE };

const Cities = () => (
	<>
		<div className="hstack gap-gutter flex-nowrap justify-content-between">
			<h1 className="display-5 text-capitalize">
				<strong>{PAGE_TITLE}</strong>
			</h1>
			<NextLink
				href="/dashboard/addresses/cities/store"
				className="btn btn-primary border-primary-dark text-capitalize icon-link icon-link-hover icon-link-hover-rotate">
				<svg className="bi w-22px h-22px" width="22" height="22">
					<use href="#icon-plus" />
				</svg>
				<strong>Add new City</strong>
			</NextLink>
		</div>
		<CitiesListSection />
	</>
);

export default Cities;
