import { RefObject, useEffect } from "react";
import { getNodeHeight, getWindowScrollingValue } from "utils/helpers";

const useHeaderScroll = <T extends HTMLElement = HTMLElement>(ref: RefObject<T | null>) => {
	useEffect(() => {
		let lastScrollTop: number = ref?.current?.offsetTop || 0;
		let headerHeight: number | Error;
		let headerChangePoint: number;
		const scrollingClassName: string = "app-header-scrolling";
		const scrollingUpClassName: string = "app-header-scrolling-up";
		const scrollingDownClassName: string = "app-header-scrolling-down";

		/**
		 * Calculate the maximum heights of different sections and assign them to corresponding variables.
		 */
		const calculateHeights = () => {
			headerHeight = ref?.current ? getNodeHeight(ref.current) : 0;
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
				ref?.current?.classList.add(scrollingClassName);
				if (
					windowScroll < lastScrollTop ||
					window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight
				) {
					ref?.current?.classList.remove(scrollingDownClassName);
					ref?.current?.classList.add(scrollingUpClassName);
				} else {
					ref?.current?.classList.remove(scrollingUpClassName);
					ref?.current?.classList.add(scrollingDownClassName);
				}
			} else {
				ref?.current?.classList.remove(
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
	}, [ref]);
};

export default useHeaderScroll;
