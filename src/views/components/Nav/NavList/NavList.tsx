"use client";

import NavListItem from "views/components/Nav/NavListItem";

type Props = { navList: Array<{ title: string; href: string }> };

const NavList = ({ navList = [] }: Props) => (
	<ul className="nav mb-0" role="menubar">
		{navList.map((navListItem) => (
			<NavListItem key={navListItem.href} link={navListItem} />
		))}
	</ul>
);

export default NavList;
