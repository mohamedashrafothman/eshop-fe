/**
 * Checks if the given element is a Node object.
 *
 * @param {HTMLElement} ele - The element to be checked
 * @return {boolean} Whether the element is a Node object
 */
export const isNode = (ele: HTMLElement): boolean =>
	typeof Node === "object"
		? ele instanceof Node
		: ele &&
			typeof ele === "object" &&
			typeof ele.nodeType === "number" &&
			typeof ele.nodeName === "string";

/**
 * Get the height of the given DOM node element.
 *
 * @param {HTMLElement} ele - the DOM node element
 * @return {number} the height of the DOM node element
 */
export const getNodeHeight = (ele: HTMLElement): number | Error => {
	if (!isNode(ele)) return new Error("element isn't DOM node!");
	return ele.getBoundingClientRect().height || ele.clientHeight || 0;
};

/**
 * Get the width of the given DOM node element.
 *
 * @param {HTMLElement} ele - the DOM node element
 * @return {number} the width of the DOM node element
 */
export const getNodeWidth = (ele: HTMLElement): number | Error => {
	if (!isNode(ele)) return new Error("element isn't DOM node!");
	return ele.getBoundingClientRect().width || ele.clientWidth || 0;
};

/**
 * Get the value of a specified CSS property for a given DOM node.
 *
 * @param {HTMLElement} ele - The DOM node to retrieve the CSS property value from
 * @param {string} valueName - The name of the CSS property to retrieve
 * @return {string} The value of the specified CSS property
 */
export const getNodeCSSPropertyValue = (ele: HTMLElement, valueName: string): string | Error => {
	if (!isNode(ele)) return new Error("element isn't DOM node!");
	if (!valueName) return new Error("you should pass css value name");
	if (!window) return "";
	return window.getComputedStyle(ele, null).getPropertyValue(valueName);
};

/**
 * Calculates the scrolling value of the window.
 *
 * @return {number} The scrolling value of the window.
 */
export const getWindowScrollingValue = () =>
	(window.pageYOffset || document.documentElement.scrollTop) -
	(document.documentElement.clientTop || 0);

/**
 * Scrolls the window to the top, removing focus from any focused element.
 *
 * @return {void}
 */
export const scrollToTop = () => {
	window.scrollTo({ behavior: "smooth", top: 0 });
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	if (document.activeElement && document.activeElement !== document.body)
		(document.activeElement as HTMLElement).blur(); // Remove focus from any focused element
};
