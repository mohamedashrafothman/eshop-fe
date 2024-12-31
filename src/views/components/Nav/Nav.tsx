"use client";

import NavList from "views/components/Nav/NavList";

export const PROPS_TYPES = { MENUBAR: "menubar" } as const;
type Props = {
	type: (typeof PROPS_TYPES)[keyof typeof PROPS_TYPES];
	navList: Array<{ title: string; href: string }>;
	labelledby?: string;
	label?: string;
};

const Nav = ({ type, navList = [], labelledby = undefined, label = undefined }: Props) => (
	<nav
		className={`app-nav app-nav-${type}`}
		aria-labelledby={labelledby}
		aria-label={(!labelledby && label) || undefined}>
		{navList.length > 0 && <NavList navList={navList} />}
	</nav>
);

export default Nav;
