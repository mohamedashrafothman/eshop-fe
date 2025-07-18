"use client";

import classNames from "classnames";
import useBootstrapCollapse from "hooks/useBootstrapCollapse";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo, useRef } from "react";
import { isUserRoleSuperAdmin, isUserRoleUser } from "utils/helpers";
import NextLink from "views/components/NextLink";

type singleNavLinkProps = {
	title: string;
	href?: string | undefined;
	icon?: string | undefined;
	exact?: boolean | undefined;
};
type navLinkProps = (singleNavLinkProps & {
	children?: Omit<singleNavLinkProps, "icon">[] | undefined;
})[];

const DashboardSideNav = () => {
	const pathname = usePathname();
	const { data: session } = useSession();

	// constants
	const IS_USER_ROLE_SUPER_ADMIN = isUserRoleSuperAdmin(session?.user?.role || "");
	const IS_USER_ROLE_USER = isUserRoleUser(session?.user?.role || "");
	const NAVIGATION_LINKS: navLinkProps = useMemo(
		() => [
			{ title: "Dashboard", href: "/dashboard", icon: "icon-dashboard", exact: true },
			{
				title: "Account Information",
				href: "/dashboard/me",
				icon: "icon-person",
				...(IS_USER_ROLE_USER
					? {
							children: [
								{ title: "Edit Information", href: "/dashboard/me", exact: true },
								{
									title: "Social Connections",
									href: "/dashboard/me/connections",
									exact: true,
								},
							],
						}
					: {}),
			},
			...(IS_USER_ROLE_SUPER_ADMIN
				? [
						{ title: "Users", href: "/dashboard/users", icon: "icon-people" },
						{ title: "Brands", href: "/dashboard/brands", icon: "icon-tags" },
						{
							title: "Categories",
							href: "/dashboard/categories",
							icon: "icon-collection",
						},
						{
							title: "Products",
							href: "/dashboard/products",
							icon: "icon-cart",
						},
					]
				: []),
			{
				title: "Addresses",
				icon: "icon-house",
				...(IS_USER_ROLE_USER ? { href: "/dashboard/addresses" } : {}),
				...(IS_USER_ROLE_SUPER_ADMIN
					? {
							children: [
								{
									title: "Countries",
									href: "/dashboard/addresses/countries",
								},
								{ title: "States", href: "/dashboard/addresses/states" },
								{ title: "Cities", href: "/dashboard/addresses/cities" },
							],
						}
					: {}),
			},
		],
		[IS_USER_ROLE_SUPER_ADMIN, IS_USER_ROLE_USER]
	);
	const NAVIGATION_LINKS_WITH_CHILDREN_LENGTH: number =
		NAVIGATION_LINKS.filter(({ children }) => children && children.length > 0).length || 0;

	// ref hook
	const collapseRefs = useRef<(HTMLButtonElement | null)[]>(
		Array.from({ length: NAVIGATION_LINKS_WITH_CHILDREN_LENGTH }, () => null)
	);

	// custom hooks
	useBootstrapCollapse(collapseRefs);

	return (
		<nav className="dashboard-side-nav" aria-label="Dashboard side nav">
			<ul
				className="nav list-group list-group-flush accordion flex-column align-items-start"
				role="menu">
				<li
					className="nav-item list-group-item text-reset rounded-0 border-0 p-0 w-100"
					role="menuitem">
					<a
						className="nav-link text-capitalize text-decoration-none lh-1 text-reset py-3 px-gutter visually-hidden-focusable"
						href="#main">
						<strong>Skip to content</strong>
					</a>
				</li>
				{NAVIGATION_LINKS.map(({ href = "", icon, title, children = [], exact }, index) => {
					const isHasChildren = children?.length > 0;
					const isAccordionItemCollapsed =
						isHasChildren &&
						!children
							.map(({ href }) => href)
							.some((href) => href && pathname.startsWith(href));
					const AccordionItemLinkComponent = isHasChildren && href ? NextLink : "button";
					return (
						<li
							className={classNames(
								"nav-item list-group-item text-reset bg-transparent p-0 w-100",
								{ "accordion-item": isHasChildren }
							)}
							role="menuitem"
							key={href || title}>
							{isHasChildren ? (
								<>
									<AccordionItemLinkComponent
										href={href}
										type={!isHasChildren || !href ? "button" : undefined}
										className={classNames(
											"nav-link accordion-button text-capitalize text-decoration-none lh-1 text-reset py-3 px-gutter hstack gap-2 align-items-center flex-nowrap",
											{
												collapsed: isAccordionItemCollapsed,
											}
										)}
										data-bs-target={`#dashboard-side-nav-collapse-${index}`}
										data-bs-toggle="collapse"
										aria-expanded="false"
										aria-controls={`dashboard-side-nav-collapse-${index}`}
										ref={(el: any) => (collapseRefs.current[index] = el)}>
										{icon && (
											<span className="flex-shrink-0">
												<svg
													className="bi w-22px h-22px"
													width="22"
													height="22">
													<use href={`#${icon}`}></use>
												</svg>
											</span>
										)}
										<strong className="flex-grow-1"> {title}</strong>
									</AccordionItemLinkComponent>
									<div
										id={`dashboard-side-nav-collapse-${index}`}
										className={classNames(
											"accordion-collapse px-0 pt-2 ms-4 collapse border border-bottom-0 border-end-0 border-top-0 border-gray rounded-0",
											{ show: !isAccordionItemCollapsed }
										)}>
										<ul className="nav flex-column">
											{children.map(
												({
													href: childHref,
													title: childTitle,
													exact: childExact,
												}) => (
													<li
														className="nav-item list-group-item px-2 py-0 my-1 text-reset border-0 bg-transparent w-100"
														role="menuitem"
														key={childHref || childTitle}>
														{childHref && (
															<NextLink
																className="nav-link text-capitalize text-decoration-none lh-1 rounded text-reset py-3 px-gutter hstack gap-2 align-items-center flex-nowrap"
																href={childHref}
																exact={childExact}>
																<strong className="flex-grow-1">
																	{childTitle}
																</strong>
															</NextLink>
														)}
													</li>
												)
											)}
										</ul>
									</div>
								</>
							) : (
								(href && (
									<NextLink
										className="nav-link text-capitalize text-decoration-none lh-1 text-reset py-3 px-gutter hstack gap-2 align-items-center flex-nowrap"
										href={href}
										exact={exact}>
										{icon && (
											<svg
												className="bi w-20px h-20px"
												width="20"
												height="20">
												<use href={`#${icon}`}></use>
											</svg>
										)}
										<strong className="flex-grow-1"> {title}</strong>
									</NextLink>
								)) ||
								null
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default DashboardSideNav;
