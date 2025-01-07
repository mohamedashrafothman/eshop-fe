"use client";

import { useEffect, useRef } from "react";
import { getNodeHeight, getWindowScrollingValue } from "utils/helpers";
import Logo from "views/components/Logo";

export const PROPS_TYPES = { PUBLIC: "public", DASHBOARD: "dashboard" } as const;
type Props = { type?: (typeof PROPS_TYPES)[keyof typeof PROPS_TYPES] };

const Header = ({ type = "public" }: Props) => {
	// ref hook
	const headerRef = useRef<HTMLElement | null>(null);

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
		<header className={`app-header app-header-${type} sticky-top bg-white`} ref={headerRef}>
			<div className="app-header-content py-22px py-lg-32px">
				<div className="container">
					<div className="row justify-content-between align-items-center flex-nowrap w-100">
						<div className="col-auto">
							<Logo />
						</div>
						<div className="col-12 col-lg-7 col-xxl-5">
							<div className="text-bg-dark text-center p-3">search form</div>
						</div>
						<div className="col-auto">
							<div className="text-bg-dark text-center p-3">nav</div>
						</div>
					</div>
				</div>
			</div>
			<div className="app-header-categories py-10px py-lg-16px bg-gray-400">
				<div className="container">
					<div className="text-bg-dark text-center p-3">Categories nav list</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
