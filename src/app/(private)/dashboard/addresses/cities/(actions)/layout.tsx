import { Metadata } from "next";
import NextLink from "views/components/NextLink";

const PAGE_TITLE = "cities";
export const metadata: Metadata = { title: PAGE_TITLE };

type Props = { children?: React.ReactNode | undefined };

const CitiesActionsLayout = async ({ children }: Props) => (
	<>
		<div className="hstack gap-gutter flex-nowrap justify-content-between">
			<h1 className="display-5 text-capitalize">
				<strong>{PAGE_TITLE}</strong>
			</h1>
			<NextLink
				href="/dashboard/addresses/cities/"
				className="btn btn-link text-capitalize text-decoration-none icon-link icon-link-hover icon-link-hover-reversed">
				<svg className="bi w-22px h-22px" width="22" height="22">
					<use href="#icon-chevron-left" />
				</svg>
				<strong>Back</strong>
			</NextLink>
		</div>
		{children}
	</>
);

export default CitiesActionsLayout;
