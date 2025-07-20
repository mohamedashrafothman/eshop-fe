"use client";

import classNames from "classnames";
import type { ComponentPropsWithoutRef, ElementType, JSX, ReactNode } from "react";
import DropdownLink from "views/components/Dropdown/DropdownLink";
import DropdownMenu from "views/components/Dropdown/DropdownMenu";
import DropdownMenuItem from "views/components/Dropdown/DropdownMenuItem";
import DropdownToggle from "views/components/Dropdown/DropdownToggle";

export const DIRECTIONS_TYPES = { UP: "up", DOWN: "down", START: "start", END: "end" } as const;

type Props<T extends ElementType> = {
	as?: T | undefined;
	children: ReactNode;
	direction?: (typeof DIRECTIONS_TYPES)[keyof typeof DIRECTIONS_TYPES] | undefined;
} & ComponentPropsWithoutRef<T>;

const Dropdown = <T extends ElementType>({
	as,
	className = "",
	children,
	direction = DIRECTIONS_TYPES.DOWN,
	...rest
}: Props<T>): JSX.Element => {
	const Component = as || "div";
	const directionClassMap = {
		[DIRECTIONS_TYPES.UP]: "dropup",
		[DIRECTIONS_TYPES.DOWN]: "dropdown",
		[DIRECTIONS_TYPES.START]: "dropstart",
		[DIRECTIONS_TYPES.END]: "dropend",
	};

	return (
		<Component
			className={classNames(directionClassMap[direction], className)}
			{...(rest as any)}>
			{children}
		</Component>
	);
};

export default Object.assign(Dropdown, {
	Toggle: DropdownToggle,
	Menu: DropdownMenu,
	MenuItem: DropdownMenuItem,
	Link: DropdownLink,
});
