import Dropdown from "bootstrap/js/dist/dropdown";
import { useRouter } from "next/navigation";
import { RefObject, useEffect, useRef } from "react";
import { isFunction } from "utils/helpers";

type RefOrRefs<T extends HTMLElement> =
	| RefObject<T | null>
	| RefObject<T | null>[]
	| RefObject<(T | null)[] | null>;

const useBootstrapDropdown = <T extends HTMLElement = HTMLElement>(
	refOrRefs: RefOrRefs<T>,
	options?: any | undefined
) => {
	const { push } = useRouter();
	const lastOpenedBy = useRef<"hover" | "click" | null>(null);
	const { isActive = true, allowTouch = true, ...restOfOptions } = options || {};

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
			mouseOver?: EventListener | undefined;
			mouseOut?: EventListener | undefined;
			click: EventListener;
		}[] = [];

		validElements.forEach((el) => {
			const parentDropdown = el.closest(
				".dropdown, .dropup, .dropend, .dropstart"
			) as HTMLElement;
			if (!parentDropdown) return;

			const instance = Dropdown.getOrCreateInstance(el, restOfOptions);
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

			const handleClick = (e: Event) => {
				lastOpenedBy.current = "click";
				if (!(e.currentTarget instanceof HTMLElement)) return;

				if (e.currentTarget.nodeName !== "A" || !e.currentTarget.hasAttribute("href"))
					return;

				push(e.currentTarget.getAttribute("href") as string);
			};

			if (allowTouch) parentDropdown.addEventListener("mouseover", handleMouseOver);
			if (allowTouch) parentDropdown.addEventListener("mouseout", handleMouseOut);
			el.addEventListener("click", handleClick);

			listeners.push({
				el: parentDropdown,
				click: handleClick,
				...(allowTouch
					? {
							mouseOver: handleMouseOver,
							mouseOut: handleMouseOut,
						}
					: {}),
			});
		});

		return () => {
			listeners.forEach(({ el, mouseOver, mouseOut, click }) => {
				if (mouseOver && isFunction(mouseOver))
					el.removeEventListener("mouseover", mouseOver);
				if (mouseOut && isFunction(mouseOut)) el.removeEventListener("mouseout", mouseOut);
				if (click && isFunction(click)) el.removeEventListener("click", click);
			});
			instances.forEach((instance) => instance.dispose());
		};
	}, [refOrRefs, isActive]);
};

export default useBootstrapDropdown;
