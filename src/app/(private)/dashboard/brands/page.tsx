import { Metadata } from "next";
import NextLink from "views/components/NextLink";
import { default as BrandsListSection } from "views/sections/BrandsList";

const PAGE_TITLE = "Brands";
export const metadata: Metadata = { title: PAGE_TITLE };

const Brands = () => (
	<>
		<div className="hstack gap-gutter flex-nowrap justify-content-between">
			<h1 className="display-5 text-capitalize">
				<strong>{PAGE_TITLE}</strong>
			</h1>
			<NextLink
				href="/dashboard/brands/store"
				className="btn btn-primary border-primary-dark text-capitalize icon-link icon-link-hover icon-link-hover-rotate">
				<svg className="bi w-22px h-22px" width="22" height="22">
					<use href="#icon-plus" />
				</svg>
				<strong>Add new Brand</strong>
			</NextLink>
		</div>
		<BrandsListSection />
	</>
);

export default Brands;
