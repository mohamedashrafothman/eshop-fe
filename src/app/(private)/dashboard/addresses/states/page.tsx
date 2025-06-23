import { Metadata } from "next";
import NextLink from "views/components/NextLink";
import { default as StatesListSection } from "views/sections/StatesList";

const PAGE_TITLE = "States";
export const metadata: Metadata = { title: PAGE_TITLE };

const States = () => (
	<>
		<div className="hstack gap-gutter flex-nowrap justify-content-between">
			<h1 className="display-5 text-capitalize">
				<strong>{PAGE_TITLE}</strong>
			</h1>
			<NextLink
				href="/dashboard/addresses/states/store"
				className="btn btn-primary border-primary-dark text-capitalize icon-link">
				<svg className="bi w-22px h-22px" width="22" height="22">
					<use href="#icon-plus" />
				</svg>
				<strong>Add new State</strong>
			</NextLink>
		</div>
		<StatesListSection />
	</>
);

export default States;
