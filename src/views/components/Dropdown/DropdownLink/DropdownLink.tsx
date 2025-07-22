"use client";

import classNames from "classnames";
import { ComponentPropsWithRef, ElementType, forwardRef, ReactNode, Ref } from "react";
import NextLink, { type NextLinkProps } from "views/components/NextLink";

type DropdownLinkProps = {
	as?: ElementType | undefined;
	children: ReactNode;
} & ((ComponentPropsWithRef<"a"> & NextLinkProps) | ComponentPropsWithRef<"button">);

const DropdownLink = (
	{ as, className = "", children, ...rest }: DropdownLinkProps,
	ref: Ref<HTMLAnchorElement> | undefined
) => {
	const Component = as || NextLink;

	return (
		<Component
			className={classNames("dropdown-item rounded-2", className)}
			ref={ref}
			{...(rest as any)}>
			{children}
		</Component>
	);
};

DropdownLink.displayName = "DropdownLink";

export default forwardRef(DropdownLink);
