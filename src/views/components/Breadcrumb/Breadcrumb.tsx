"use client";

import NextLink from "views/components/NextLink";
import BreadcrumbList from "./BreadcrumbList";
import BreadcrumbListItem from "./BreadcrumbListItem";
import BreadcrumbWrapper from "./BreadcrumbWrapper";

type Props = {
	home?: { href: string; title: string };
	items?: Array<{ href: string; title: string }>;
};

const Breadcrumb = ({ home = { href: "/", title: "Home" }, items = [] }: Props) => (
	<BreadcrumbWrapper>
		<BreadcrumbList>
			{[home, ...items].map(({ href, title }, index, array) => (
				<BreadcrumbListItem key={href} isActive={index + 1 < array.length}>
					{index + 1 < array.length ? (
						<NextLink
							href={href}
							className="link-gray-700 text-dark-hover text-dark-focus focus-ring link-underline-opacity-0 link-underline-opacity-100-hover link-underline-opacity-100-focus"
							exact>
							{title}
						</NextLink>
					) : (
						title
					)}
				</BreadcrumbListItem>
			))}
		</BreadcrumbList>
	</BreadcrumbWrapper>
);
export default Breadcrumb;
