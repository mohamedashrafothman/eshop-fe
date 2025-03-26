import { Metadata } from "next";
import NextLink from "views/components/NextLink";
import { default as CountriesListSection } from "views/sections/CountriesList";

const PAGE_TITLE = "Countries";
export const metadata: Metadata = { title: PAGE_TITLE };

const Countries = () => (
	<>
		<div className="hstack gap-gutter flex-nowrap justify-content-between">
			<h1 className="display-5 text-capitalize">
				<strong>{PAGE_TITLE}</strong>
			</h1>
			<NextLink
				href="/dashboard/addresses/countries/store"
				className="btn btn-primary border-primary-dark text-capitalize icon-link">
				<svg className="bi w-22px h-22px" width="22" height="22">
					<use href="#icon-plus" />
				</svg>
				<strong>Add new Country</strong>
			</NextLink>
		</div>
		<CountriesListSection />
	</>
);

export default Countries;
