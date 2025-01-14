"use client";

import Collapse from "bootstrap/js/dist/collapse";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import NextLink from "views/components/NextLink";

type singleNavLinkProps = {
	href?: string;
	title: string;
	icon?: () => JSX.Element;
};
type NavLinkProps = (singleNavLinkProps & { children?: singleNavLinkProps[] })[];

const DashboardSideNav = () => {
	const pathname = usePathname();

	// Constants
	const navigationLinks: NavLinkProps = [
		{
			title: "Dashboard",
			href: "/dashboard",
			icon: () => (
				<svg width="20" height="20" className="w-20px h-20px">
					<use href="#icon-dashboard"></use>
				</svg>
			),
		},
		{
			title: "Account",
			icon: () => (
				<svg width="20" height="20" className="w-20px h-20px">
					<use href="#icon-person"></use>
				</svg>
			),
			children: [
				{ title: "Account overview", href: "/dashboard/users/me" },
				{ title: "Account settings", href: "/dashboard/users/me/settings" },
			],
		},
	];

	// ref hook
	const collapseRefs = useRef<(HTMLButtonElement | null)[]>(
		Array.from(
			{
				length: navigationLinks.filter(({ children }) => children && children.length > 0)
					.length,
			},
			() => null
		)
	);

	// effect hooks
	useEffect(() => {
		const collapseRefsCurrent = collapseRefs.current;
		collapseRefsCurrent?.forEach(
			(item) => item && new Collapse(item, { toggle: false }).hide()
		);

		return () => {
			collapseRefsCurrent?.forEach((item) => item && Collapse.getInstance(item)?.dispose());
		};
	}, []);

	return (
		<nav className="dashboard-side-nav" aria-label="Dashboard side nav">
			<ul className="nav list-group accordion flex-column align-items-start" role="menu">
				<li
					className="nav-item list-group-item text-reset rounded-0 p-0 border-0 w-100"
					role="menuitem">
					<a
						className="nav-link text-capitalize text-decoration-none lh-1 text-reset py-3 px-gutter visually-hidden-focusable"
						href="#main">
						<strong>Skip to content</strong>
					</a>
				</li>
				{navigationLinks.map(({ href, icon: Icon, title, children = [] }, index) => (
					<li
						className={classNames(
							"nav-item list-group-item text-reset bg-transparent mt-2 p-0 border-0 w-100",
							{ "accordion-item": children?.length > 0 }
						)}
						role="menuitem"
						key={href || title}>
						{children?.length > 0 ? (
							<>
								<button
									type="button"
									className={classNames(
										"nav-link accordion-button text-capitalize text-decoration-none lh-1 text-reset py-3 px-gutter hstack gap-2 align-items-center flex-nowrap",
										{
											collapsed: !children
												.map(({ href }) => href)
												.includes(pathname),
										}
									)}
									data-bs-target={`#dashboard-side-nav-collapse-${index}`}
									data-bs-toggle="collapse"
									aria-expanded="false"
									aria-controls={`dashboard-side-nav-collapse-${index}`}
									ref={(el) => {
										collapseRefs.current[index] = el;
									}}>
									{Icon && (
										<span className="flex-shrink-0">
											<Icon />
										</span>
									)}
									<strong className="flex-grow-1"> {title}</strong>
								</button>
								<div
									id={`dashboard-side-nav-collapse-${index}`}
									className={classNames(
										"accordion-collapse px-0 pt-2 ms-4 collapse border border-bottom-0 border-end-0 border-top-0 border-gray rounded-0",
										{
											show: children
												.map(({ href }) => href)
												.includes(pathname),
										}
									)}>
									<ul className="nav flex-column">
										{children.map(({ href, icon: Icon, title }) => (
											<li
												className="nav-item list-group-item px-2 py-0 text-reset bg-transparent mt-2 border-0 w-100"
												role="menuitem"
												key={href || title}>
												{href && (
													<NextLink
														className="nav-link text-capitalize text-decoration-none lh-1 rounded text-reset py-3 px-gutter hstack gap-2 align-items-center flex-nowrap"
														href={href}
														exact>
														{Icon && (
															<span className="flex-shrink-0">
																<Icon />
															</span>
														)}
														<strong className="flex-grow-1">
															{title}
														</strong>
													</NextLink>
												)}
											</li>
										))}
									</ul>
								</div>
							</>
						) : (
							(href && (
								<NextLink
									className="nav-link text-capitalize text-decoration-none lh-1 text-reset py-3 px-gutter hstack gap-2 align-items-center flex-nowrap"
									href={href}
									exact={children?.length === 0}>
									{Icon && (
										<span className="flex-shrink-0">
											<Icon />
										</span>
									)}
									<strong className="flex-grow-1"> {title}</strong>
								</NextLink>
							)) ||
							null
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default DashboardSideNav;
