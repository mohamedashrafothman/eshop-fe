"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NextLink = ({ href, exact, children, ...props }: any) => {
	const pathname = usePathname();
	const activeClass = "active";
	const isActive = exact ? href === pathname : pathname.startsWith(href);

	// add active class
	if (isActive) props.className = [props?.className || "", activeClass].filter(Boolean).join(" ");

	return (
		<Link href={href} aria-current={isActive ? "page" : undefined} {...props}>
			{children}
		</Link>
	);
};

export default NextLink;
