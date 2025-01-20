"use client";

import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type Props = { children?: ReactNode | undefined } & HTMLAttributes<HTMLUListElement>;

const NavList = ({ children, className = "", role = "menubar", ...props }: Props) => (
	<ul className={classNames("nav mb-0", className)} role={role} {...props}>
		{children}
	</ul>
);

export default NavList;
