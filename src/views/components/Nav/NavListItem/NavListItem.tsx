"use client";

import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type Props = { children?: ReactNode | undefined } & HTMLAttributes<HTMLLIElement>;

const NavListItem = ({ children, className = "", role = "menuitem", ...props }: Props) => (
	<li className={classNames("nav-item", className)} role={role} {...props}>
		{children}
	</li>
);

export default NavListItem;
