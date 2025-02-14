import { PayloadAction } from "@reduxjs/toolkit";
import { SliceState, initialState, type ResetEmailTimer } from "store/resetEmailTimer/slice";

export const reset = (): SliceState => initialState;
export const set = (
	state: SliceState,
	{ payload }: PayloadAction<Partial<ResetEmailTimer>>
): SliceState => ({
	...(state || {}),
	...((payload && payload) || {}),
});
