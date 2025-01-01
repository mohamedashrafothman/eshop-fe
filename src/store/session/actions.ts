import { PayloadAction } from "@reduxjs/toolkit";
import { SliceState, initialState, type Session } from "store/session/slice";

export const logout = (): SliceState => initialState;
export const login = (
	state: SliceState,
	{ payload: { accessToken, refreshToken, tokenType, user } }: PayloadAction<Partial<Session>>
): SliceState => ({
	...(state || {}),
	...((user && { user }) || {}),
	...((accessToken &&
		refreshToken &&
		tokenType && { accessToken, refreshToken, tokenType, isAuthenticated: true }) ||
		{}),
});
