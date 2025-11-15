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

type Props = {
	as?: ElementType | undefined;
	children: ReactNode;
	withRotation?: boolean | undefined;
	dropdownOptions?: object | undefined;
} & ComponentPropsWithRef<"button"> &
	ComponentPropsWithRef<"a">;

function DropdownToggle(
	{ as, children, className = "", withRotation, dropdownOptions, ...rest }: Props,
	ref: Ref<HTMLButtonElement | HTMLAnchorElement>
) {
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
			ref={(node: HTMLButtonElement | HTMLAnchorElement | null) => {
				dropdownRef.current = node;

				// Callback ref
				if (typeof ref === "function") {
					ref(node);
					return;
				}

				// Object ref (may be readonly)
				if (ref && "current" in ref) {
					(
						ref as React.MutableRefObject<HTMLButtonElement | HTMLAnchorElement | null>
					).current = node;
				}
			}}
			{...rest}>
			{children}
		</Component>
	);
}

export default forwardRef(DropdownToggle);
