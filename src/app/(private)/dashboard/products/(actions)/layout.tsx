import { Metadata } from "next";
import NextLink from "views/components/NextLink";

const PAGE_TITLE = "Products";
export const metadata: Metadata = { title: PAGE_TITLE };

type Props = { children?: React.ReactNode | undefined };

const ProductsActionsLayout = async ({ children }: Props) => {
	return (
		<>
			<div className="hstack gap-gutter flex-nowrap justify-content-between">
				<h1 className="display-5 text-capitalize">
					<strong>{PAGE_TITLE}</strong>
				</h1>
				<NextLink
					href="/dashboard/products/"
					className="btn btn-link text-capitalize text-decoration-none icon-link icon-link-hover icon-link-hover-reversed">
					<svg className="bi w-16px h-16px" width="16" height="16">
						<use href="#icon-chevron-left" />
					</svg>
					<strong>Back</strong>
				</NextLink>
			</div>
			{children}
		</>
	);
};

export default ProductsActionsLayout;
