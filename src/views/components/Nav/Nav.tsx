"use client";

import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";
import NavLink from "./NavLink";
import NavList from "./NavList";
import NavListItem from "./NavListItem";

export const PROPS_TYPES = { MENUBAR: "menubar" } as const;
type Props = {
	children?: ReactNode | undefined;
	type: (typeof PROPS_TYPES)[keyof typeof PROPS_TYPES];
} & HTMLAttributes<HTMLDivElement>;

const Nav = ({ children, type = PROPS_TYPES.MENUBAR, className = "", ...props }: Props) => (
	<nav className={classNames("app-nav", `app-nav-${type}`, className)} {...props}>
		{children}
	</nav>
);

export default Object.assign(Nav, { List: NavList, ListItem: NavListItem, Link: NavLink });
