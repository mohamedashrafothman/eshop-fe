"use client";

import classNames from "classnames";
import {
	forwardRef,
	type ComponentPropsWithRef,
	type ElementType,
	type ReactNode,
	type Ref,
} from "react";

type Props = {
	as?: ElementType | undefined;
	children: ReactNode;
} & ComponentPropsWithRef<"ul" | "div">;

const DropdownMenu = (
	{ as, children, className = "", ...rest }: Props,
	ref: Ref<HTMLUListElement | HTMLDivElement> | undefined
) => {
	const Component = as || "ul";

	return (
		<Component className={classNames("dropdown-menu", className)} ref={ref} {...rest}>
			{children}
		</Component>
	);
};

DropdownMenu.displayName = "DropdownMenu";

export default forwardRef(DropdownMenu);
