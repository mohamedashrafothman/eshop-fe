"use client";

import classNames from "classnames";
import { Link } from "next-view-transitions";
import { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, HTMLAttributes, ReactNode, Ref } from "react";
import type { UrlObject } from "url";

export const ACTIVE_CLASS = "active" as const;
export type Props = {
	exact?: boolean | undefined;
	children?: ReactNode | undefined;
	ref?: Ref<HTMLAnchorElement> | undefined;
} & LinkProps &
	HTMLAttributes<HTMLAnchorElement>;

const NextLink = forwardRef(
	({ ref, children, className = "", href, exact, ...props }: Props): JSX.Element => {
		const pathname = usePathname();
		const isActive = exact
			? href === pathname
			: pathname.startsWith(
					String(typeof href === "string" ? href : (href as UrlObject)?.pathname)
				);

		return (
			<Link
				href={href}
				ref={ref}
				className={classNames(className, { [ACTIVE_CLASS]: isActive })}
				aria-current={isActive ? "page" : undefined}
				{...props}>
				{children}
			</Link>
		);
	}
);

NextLink.displayName = "NextLink";

export default NextLink;
