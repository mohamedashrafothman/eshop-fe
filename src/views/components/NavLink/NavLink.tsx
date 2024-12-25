"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, exact, children, ...props }: any): JSX.Element => {
	const pathname = usePathname();
	const active = "active";
	const isActive = exact ? pathname === href : pathname.startsWith(href);

	// add active class
	if (isActive) props.className = [props?.className || "", active].filter(Boolean).join(" ");

	return (
		<Link href={href} {...props}>
			{children}
		</Link>
	);
};

export default NavLink;
