import Collapse from "bootstrap/js/dist/collapse";
import { RefObject, useEffect } from "react";

type RefOrRefs<T extends HTMLElement> =
	| RefObject<T | null>
	| RefObject<T | null>[]
	| RefObject<(T | null)[] | null>;

const useBootstrapCollapse = <T extends HTMLElement = HTMLElement>(
	refOrRefs: RefOrRefs<T>,
	isActive: boolean = true
) => {
	useEffect(() => {
		if (!isActive) return;

		let elements: (T | null)[] = [];

		if (Array.isArray(refOrRefs)) {
			// If refOrRefs is an array of refs, get the current value of each ref
			elements = refOrRefs.map((ref) => ref.current);
		} else if (refOrRefs.current instanceof HTMLElement) {
			// If refOrRefs is a single ref, get the current value of the ref
			elements = [refOrRefs.current];
		} else if (Array.isArray(refOrRefs.current)) {
			// If refOrRefs is an array of elements, use the elements directly
			elements = refOrRefs.current;
		}

		// Remove any null or undefined elements from the array
		const validElements = elements.filter((el): el is T => !!el);

		// Create an array of Collapse instances
		const instances = validElements.map((el) =>
			Collapse.getOrCreateInstance(el, { toggle: false })
		);

		// Hide all Collapse elements
		instances.forEach((instance) => instance.hide());

		// Dispose of the Collapse instances when the component is unmounted
		return () => {
			instances.forEach((instance) => instance.dispose());
		};
	}, [refOrRefs, isActive]);
};

export default useBootstrapCollapse;
