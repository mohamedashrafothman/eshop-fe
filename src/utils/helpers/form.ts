export const isSameValueAsInitialValue = (v: any, init: any) =>
	JSON.stringify(v) === JSON.stringify(init);
