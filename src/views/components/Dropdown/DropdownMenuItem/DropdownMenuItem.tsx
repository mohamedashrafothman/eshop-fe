"use client";

import classNames from "classnames";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = ({ isDivider: true } | { children: ReactNode; isDivider?: false | undefined }) &
	ComponentPropsWithoutRef<"li">;

const DropdownMenuItem = ({ children, className, isDivider, ...rest }: Props) => (
	<li className={classNames("p-1", className)} {...rest}>
		{isDivider ? <hr className="dropdown-divider"></hr> : children}
	</li>
);

export default DropdownMenuItem;
