import Dropdown from "bootstrap/js/dist/dropdown";
import { RefObject, useEffect, useRef } from "react";

type RefOrRefs<T extends HTMLElement> =
	| RefObject<T | null>
	| RefObject<T | null>[]
	| RefObject<(T | null)[] | null>;

const useBootstrapDropdown = <T extends HTMLElement = HTMLElement>(
	refOrRefs: RefOrRefs<T>,
	isActive: boolean = true
) => {
	const lastOpenedBy = useRef<"hover" | "click" | null>(null);

	useEffect(() => {
		if (!isActive) return;

		let elements: (T | null)[] = [];

		if (Array.isArray(refOrRefs)) {
			elements = refOrRefs.map((ref) => ref.current);
		} else if (refOrRefs.current instanceof HTMLElement) {
			elements = [refOrRefs.current];
		} else if (Array.isArray(refOrRefs.current)) {
			elements = refOrRefs.current;
		}

		const validElements = elements.filter((el): el is T => !!el);
		const instances: Dropdown[] = [];

		const listeners: {
			el: HTMLElement;
			mouseOver: EventListener;
			mouseOut: EventListener;
			click: EventListener;
		}[] = [];

		validElements.forEach((el) => {
			const parentDropdown = el.closest(
				".dropdown, .dropup, .dropend, .dropstart"
			) as HTMLElement;
			if (!parentDropdown) return;

			const instance = Dropdown.getOrCreateInstance(el);
			instances.push(instance);

			let timeout: ReturnType<typeof setTimeout> | null = null;

			const handleMouseOver = (mouseEvent: Event) => {
				const e = mouseEvent as MouseEvent;
				if (!(e.currentTarget instanceof HTMLElement)) return;

				if (timeout) clearTimeout(timeout);

				// Only show on initial hover
				if (!el.classList.contains("show")) {
					instance.show();
					lastOpenedBy.current = "hover";
				}
			};

			const handleMouseOut = (mouseEvent: Event) => {
				const e = mouseEvent as MouseEvent;
				if (!(e.currentTarget instanceof HTMLElement)) return;

				const related = e.relatedTarget as HTMLElement;
				if (related && parentDropdown.contains(related)) {
					// Pointer is still inside dropdown area
					return;
				}

				if (lastOpenedBy.current === "hover") {
					timeout = setTimeout(() => instance.hide(), 100);
				}
			};

			const handleClick = () => (lastOpenedBy.current = "click");

			parentDropdown.addEventListener("mouseover", handleMouseOver);
			parentDropdown.addEventListener("mouseout", handleMouseOut);
			el.addEventListener("click", handleClick);

			listeners.push({
				el: parentDropdown,
				mouseOver: handleMouseOver,
				mouseOut: handleMouseOut,
				click: handleClick,
			});
		});

		return () => {
			listeners.forEach(({ el, mouseOver, mouseOut, click }) => {
				el.removeEventListener("mouseover", mouseOver);
				el.removeEventListener("mouseout", mouseOut);
				el.removeEventListener("click", click);
			});
			instances.forEach((instance) => instance.dispose());
		};
	}, [refOrRefs, isActive]);
};

export default useBootstrapDropdown;
