"use client";

import classNames from "classnames";
import useBootstrapDropdown from "hooks/useBootstrapDropdown";
import {
	ComponentPropsWithRef,
	forwardRef,
	useRef,
	type ElementType,
	type ReactNode,
	type Ref,
} from "react";
import { isFunction } from "utils/helpers";

type Props = {
	as?: ElementType | undefined;
	children: ReactNode;
	withRotation?: boolean | undefined;
	dropdownOptions?: object | undefined;
} & ComponentPropsWithRef<"button" | "a">;

const DropdownToggle = (
	{ as, children, className = "", withRotation, dropdownOptions, ...rest }: Props,
	ref: Ref<HTMLButtonElement | HTMLAnchorElement> | undefined
) => {
	const Component = as || "button";

	// ref hook
	const dropdownRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

	// custom hooks
	useBootstrapDropdown(dropdownRef, dropdownOptions);

	return (
		<Component
			className={classNames("dropdown-toggle", className, {
				"dropdown-toggle-with-rotate-icon icon-link": withRotation,
			})}
			role="button"
			data-bs-toggle="dropdown"
			ref={(node: any) => {
				dropdownRef.current = node;
				if (isFunction(ref)) ref(node);
				else if (ref) (ref as React.MutableRefObject<any>).current = node;
			}}
			{...rest}>
			{children}
		</Component>
	);
};

export default forwardRef(DropdownToggle);
