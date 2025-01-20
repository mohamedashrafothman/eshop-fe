"use client";

import Offcanvas from "bootstrap/js/dist/offcanvas";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Search = () => {
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
				id="search-offcanvas"
				className="offcanvas offcanvas-top border-0 h-fit-content shadow"
				tabIndex={-1}
				aria-labelledby="search-offcanvas-label"
				ref={offCanvasRef}>
				<div className="offcanvas-body py-5">
					<div className="container">
						<div className="row g-0 align-items-center flex-nowrap">
							<div className="col">
								<div className="text-bg-dark text-center p-3">Search</div>
							</div>
							<div className="col-auto">
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
			</div>,
			portalsRoot
		)
	);
};

export default Search;
