"use client";

import Offcanvas from "bootstrap/js/dist/offcanvas";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Logo from "views/components/Logo";
import Nav, { PROPS_TYPES as NAV_PROPS_TYPES } from "views/components/Nav";

const PublicHeader = () => {
	const { data: session } = useSession();

	// portal dom element
	let portalsRoot = document.getElementById("portals") || null;
	if (!portalsRoot) {
		portalsRoot = document.createElement("div");
		portalsRoot.setAttribute("id", "portals");
		document.body.appendChild(portalsRoot);
	}

	// ref hook
	const offCanvasRef = useRef<HTMLDivElement | null>(null);

	// effect hook
	useEffect(() => {
		const offCanvasCurrentElement = offCanvasRef?.current;
		let offcanvas: Offcanvas | null;
		if (offCanvasCurrentElement) {
			offcanvas = Offcanvas.getOrCreateInstance(offCanvasCurrentElement);
		}

		return () => {
			if (offCanvasCurrentElement && offcanvas) {
				Offcanvas.getInstance(offCanvasCurrentElement)?.dispose();
			}
		};
	}, []);

	return (
		portalsRoot &&
		ReactDOM.createPortal(
			<div
				id="public-header-offcanvas"
				className="offcanvas offcanvas-end border-0 shadow"
				tabIndex={-1}
				aria-labelledby="public-header-offcanvas-label"
				ref={offCanvasRef}>
				<div className="offcanvas-header pb-0">
					<div className="row align-items-center flex-nowrap flex-grow-1">
						<div className="col-auto">
							<Logo width={100} height={28} />
						</div>
						<div className="col-auto ms-auto">
							<div className="hstack gap-1 flex-nowrap">
								<Nav type={NAV_PROPS_TYPES.MENUBAR} role="menubar">
									<Nav.List>
										<Nav.ListItem>
											<Nav.Link
												href={!session ? "/auth/login" : "/dashboard"}
												className="link-dark"
												title={!session ? "Login" : "Go to dashboard"}>
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
									type="button"
									className="btn btn-link link-dark rounded-0 text-decoration-none border-0 d-lg-none"
									data-bs-dismiss="offcanvas"
									aria-label="Close">
									<svg className="bi w-22px h-22px" width="22" height="22">
										<use href="#icon-close" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="offcanvas-body">
					<div className="text-bg-dark text-center p-3">Categories nav list</div>
				</div>
			</div>,
			portalsRoot
		)
	);
};

export default PublicHeader;
