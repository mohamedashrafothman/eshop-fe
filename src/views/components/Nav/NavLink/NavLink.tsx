"use client";

import NextLink from "views/components/NextLink";

type Props = { href: string; title: string };

const NavLink = ({ title, href }: Props) => (
	<NextLink href={href} className="nav-link text-capitalize">
		{title}
	</NextLink>
);

export default NavLink;
