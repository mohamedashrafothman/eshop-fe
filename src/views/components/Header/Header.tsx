"use client";

import classNames from "classnames";
import { useSession } from "next-auth/react";
import { HTMLAttributes, useEffect, useRef } from "react";
import { getNodeHeight, getWindowScrollingValue } from "utils/helpers";
import Logo from "views/components/Logo";
import Nav, { PROPS_TYPES as NAV_PROPS_TYPES } from "views/components/Nav";
import UserDropdown from "views/components/UserDropdown";
import { default as DashboardSideOffcanvas } from "views/offcanvas/DashboardSide";
import { default as PublicHeaderOffcanvas } from "views/offcanvas/PublicHeader";
import { default as SearchOffcanvas } from "views/offcanvas/Search";

export const PROPS_TYPES = { PUBLIC: "public", DASHBOARD: "dashboard" } as const;
type Props = {
	type?: (typeof PROPS_TYPES)[keyof typeof PROPS_TYPES];
} & HTMLAttributes<HTMLElement>;

const Header = ({ type = "public", className = "", ...props }: Props) => {
	const session = useSession();

	// ref hook
	const headerRef = useRef<HTMLElement | null>(null);

	// constants
	const isAuthenticated = session?.status === "authenticated";

	// effect hook
	useEffect(() => {
		let lastScrollTop: number = headerRef?.current?.offsetTop || 0;
		let headerHeight: number | Error;
		let headerChangePoint: number;
		const scrollingClassName: string = "app-header-scrolling";
		const scrollingUpClassName: string = "app-header-scrolling-up";
		const scrollingDownClassName: string = "app-header-scrolling-down";

		/**
		 * Calculate the maximum heights of different sections and assign them to corresponding variables.
		 */
		const calculateHeights = () => {
			headerHeight = headerRef?.current ? getNodeHeight(headerRef.current) : 0;
			headerChangePoint = !(headerHeight instanceof Error) ? headerHeight : 0;
		};

		/**
		 * A function to handle the scrolling behavior.
		 *
		 * @return {void}
		 */
		const handleScroll = () => {
			const windowScroll = getWindowScrollingValue();

			if (windowScroll > headerChangePoint) {
				headerRef?.current?.classList.add(scrollingClassName);
				if (
					windowScroll < lastScrollTop ||
					window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight
				) {
					headerRef?.current?.classList.remove(scrollingDownClassName);
					headerRef?.current?.classList.add(scrollingUpClassName);
				} else {
					headerRef?.current?.classList.remove(scrollingUpClassName);
					headerRef?.current?.classList.add(scrollingDownClassName);
				}
			} else {
				headerRef?.current?.classList.remove(
					scrollingClassName,
					scrollingDownClassName,
					scrollingUpClassName
				);
			}
			lastScrollTop = windowScroll;
		};

		/**
		 * A function that scrolls the header.
		 */
		const scrollHeader = () => {
			calculateHeights();
			handleScroll();
		};

		scrollHeader();
		["scroll"].map((eventName) => window.addEventListener(eventName, handleScroll));
		["resize", "orientationchange", "focus", "blur", "visibilitychange"].map((eventName) =>
			window.addEventListener(eventName, scrollHeader)
		);

		return () => {
			["scroll"].map((eventName) => window.removeEventListener(eventName, handleScroll));
			["resize", "orientationchange", "focus", "blur", "visibilitychange"].map((eventName) =>
				window.removeEventListener(eventName, scrollHeader)
			);
		};
	}, [headerRef]);

	return (
		<header
			className={classNames(
				"app-header sticky-top",
				{
					"app-header-public": type === PROPS_TYPES.PUBLIC,
					"app-header-dashboard": type === PROPS_TYPES.DASHBOARD,
				},
				className
			)}
			ref={headerRef}
			{...props}>
			<div className="app-header-content">
				{type === PROPS_TYPES.PUBLIC && (
					<div className="container">
						<div className="row justify-content-between align-items-center flex-nowrap">
							<div className="col-auto">
								<Logo />
							</div>
							<div className="col d-none d-lg-block">
								<div className="text-bg-dark text-center p-3">search</div>
							</div>
							<div className="col-auto">
								<div className="hstack gap-1 flex-nowrap">
									<Nav
										type={NAV_PROPS_TYPES.MENUBAR}
										className="d-none d-lg-block"
										role="menubar">
										<Nav.List>
											<Nav.ListItem>
												<Nav.Link
													href={
														!isAuthenticated
															? "/auth/login"
															: "/dashboard"
													}
													className="link-dark"
													title={
														!isAuthenticated
															? "Login"
															: "Go to dashboard"
													}>
													<svg
														className="bi w-22px h-22px"
														width="22"
														height="22">
														<use href="#icon-person" />
													</svg>
												</Nav.Link>
											</Nav.ListItem>
											<Nav.ListItem>
												<Nav.Link
													href="/cart"
													className="link-dark"
													title="Cart">
													<svg
														className="bi w-22px h-22px"
														width="22"
														height="22">
														<use href="#icon-cart" />
													</svg>
												</Nav.Link>
											</Nav.ListItem>
										</Nav.List>
									</Nav>
									<button
										className="btn btn-link link-dark rounded-0 text-decoration-none border-0 d-lg-none"
										type="button"
										data-bs-toggle="offcanvas"
										data-bs-target="#search-offcanvas">
										<svg className="bi" width="16" height="16">
											<use href="#icon-search" />
										</svg>
									</button>
									<SearchOffcanvas />
									<button
										className="btn btn-link link-dark rounded-0 text-decoration-none border-0 d-lg-none"
										type="button"
										data-bs-toggle="offcanvas"
										data-bs-target="#public-header-offcanvas">
										<svg className="bi w-22px h-22px" width="22" height="22">
											<use href="#icon-menu" />
										</svg>
									</button>
									<PublicHeaderOffcanvas />
								</div>
							</div>
						</div>
					</div>
				)}
				{type === PROPS_TYPES.DASHBOARD && (
					<div className="row flex-nowrap align-items-center">
						<div className="col col-md-auto d-lg-none">
							<Logo />
						</div>
						<div className="col col-lg-5 d-none d-lg-block">
							<div className="text-bg-dark text-center p-3">search</div>
						</div>
						<div className="col-auto d-lg-none ms-auto">
							<div className="hstack gap-1 flex-nowrap">
								<UserDropdown />
								<button
									className="btn btn-link link-dark px-2 px-lg-3 rounded-0 text-decoration-none border-0 d-lg-none"
									type="button"
									data-bs-toggle="offcanvas"
									data-bs-target="#search-offcanvas">
									<svg className="bi" width="16" height="16">
										<use href="#icon-search" />
									</svg>
								</button>
								<SearchOffcanvas />
								<button
									className="btn btn-link link-dark px-2 px-lg-3 rounded-0 text-decoration-none border-0 d-lg-none"
									type="button"
									data-bs-toggle="offcanvas"
									data-bs-target="#dashboard-side-offcanvas">
									<svg className="bi w-22px h-22px" width="22" height="22">
										<use href="#icon-menu" />
									</svg>
								</button>
								<DashboardSideOffcanvas />
							</div>
						</div>
					</div>
				)}
			</div>
			{type === PROPS_TYPES.PUBLIC && (
				<div className="app-header-categories py-lg-16px d-none d-lg-block">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="text-bg-dark text-center p-3">
									Categories nav list
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
