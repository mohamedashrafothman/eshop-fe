"use client";

import classNames from "classnames";
import { HTMLAttributes } from "react";

export const PROPS_TYPES = { PUBLIC: "public", DASHBOARD: "dashboard" } as const;
type Props = {
	type?: (typeof PROPS_TYPES)[keyof typeof PROPS_TYPES];
} & HTMLAttributes<HTMLElement>;

const Footer = ({ type = "public", className = "", ...props }: Props) => (
	<footer
		className={classNames(
			"app-footer",
			{
				"app-footer-public": type === PROPS_TYPES.PUBLIC,
				"app-footer-dashboard": type === PROPS_TYPES.DASHBOARD,
			},
			className
		)}
		{...props}>
		Footer
	</footer>
);

export default Footer;
