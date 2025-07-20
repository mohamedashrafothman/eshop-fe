"use client";

import classNames from "classnames";
import { ComponentPropsWithRef, ElementType, forwardRef, ReactNode, Ref } from "react";
import NextLink from "views/components/NextLink";

type NavLinkProps = {
	as?: ElementType | undefined;
	children: ReactNode;
} & ComponentPropsWithRef<"a">;

const NavLink = (
	{ as, className = "", children, ...rest }: NavLinkProps,
	ref: Ref<HTMLAnchorElement> | undefined
) => {
	const Component = as || NextLink;

	return (
		<Component className={classNames("nav-link", className)} ref={ref} {...(rest as any)}>
			{children}
		</Component>
	);
};

NavLink.displayName = "NavLink";

export default forwardRef(NavLink);
