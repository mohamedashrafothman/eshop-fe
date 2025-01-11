"use client";

import classNames from "classnames";
import NextLink, { type NextLinkProps } from "views/components/NextLink";

type Props = { href: string } & NextLinkProps;

const NavLink = ({ children, className = "", ...props }: Props) => (
	<NextLink className={classNames("nav-link text-capitalize", className)} {...props}>
		{children}
	</NextLink>
);

export default NavLink;
