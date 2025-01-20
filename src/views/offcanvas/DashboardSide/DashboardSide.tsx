"use client";

import Offcanvas from "bootstrap/js/dist/offcanvas";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Logo from "views/components/Logo";
import DashboardSideNav from "views/sections/DashboardSideNav";

const DashboardSide = () => {
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
				id="dashboard-side-offcanvas"
				className="offcanvas offcanvas-start border-0 shadow"
				tabIndex={-1}
				aria-labelledby="dashboard-side-offcanvas-label"
				ref={offCanvasRef}>
				<div className="offcanvas-header pb-0">
					<div className="row align-items-center flex-nowrap flex-grow-1">
						<div className="col-auto">
							<Logo width={100} height={28} />
						</div>
						<div className="col-auto ms-auto">
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
				<div className="offcanvas-body p-0">
					<DashboardSideNav />
				</div>
			</div>,
			portalsRoot
		)
	);
};

export default DashboardSide;
