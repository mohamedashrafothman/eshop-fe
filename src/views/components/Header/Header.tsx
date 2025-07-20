"use client";

import classNames from "classnames";
import useHeaderScroll from "hooks/useHeaderScroll";
import { useSession } from "next-auth/react";
import { HTMLAttributes, useRef } from "react";
import HeaderCategories from "views/components/Header/HeaderCategories";
import HeaderTop from "views/components/Header/HeaderTop";
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

	// custom hooks
	useHeaderScroll(headerRef);

	// constants
	const isAuthenticated = session?.status === "authenticated";

	return (
		<header
			className={classNames("app-header", className, {
				"app-header-public": type === PROPS_TYPES.PUBLIC,
				"app-header-dashboard": type === PROPS_TYPES.DASHBOARD,
			})}
			ref={headerRef}
			{...props}>
			{type === PROPS_TYPES.PUBLIC && (
				<>
					<div className="container">
						<div className="row">
							<div className="col-12 d-none d-lg-block">
								<HeaderTop />
							</div>
							<div className="col-12">
								<div className="app-header-content">
									<div className="row justify-content-between align-items-center flex-nowrap">
										<div className="col-auto">
											<Logo />
										</div>
										<div className="col-lg-6 d-none d-lg-block">Search</div>
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
																	className="bi w-24px h-24px"
																	width="24"
																	height="24">
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
																	className="bi w-24px h-24px"
																	width="24"
																	height="24">
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
													<svg
														className="bi w-22px h-22px"
														width="22"
														height="22">
														<use href="#icon-menu" />
													</svg>
												</button>
												<PublicHeaderOffcanvas />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<HeaderCategories />
				</>
			)}
			{type === PROPS_TYPES.DASHBOARD && (
				<div className="app-header-content">
					<div className="row flex-nowrap align-items-center">
						<div className="col col-md-auto d-lg-none">
							<Logo />
						</div>
						<div className="col col-lg-5 d-none d-lg-block">Search</div>
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
				</div>
			)}
		</header>
	);
};

export default Header;
