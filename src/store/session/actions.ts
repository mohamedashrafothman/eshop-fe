import { PayloadAction } from "@reduxjs/toolkit";
import { SliceState, initialState, type Session } from "store/session/slice";

export const logout = (): SliceState => initialState;
export const login = (
	state: SliceState,
	{ payload: { token, user } }: PayloadAction<Partial<Session>>
): SliceState => ({
	...(state || {}),
	...((user && { user }) || {}),
	...((token && { token, isAuthenticated: true }) || {}),
});
