import { createSlice } from "@reduxjs/toolkit";
import { default as IUser } from "interfaces/User.interface";
import { type RootState } from "store";
import { login, logout } from "store/session/actions";

export type Session = {
	isAuthenticated: boolean;
	user: IUser | {};
	accessToken: string;
	refreshToken: string;
	tokenType: string;
};
export type SliceState = Session & {};

export const initialState: SliceState = {
	isAuthenticated: false,
	user: {},
	accessToken: "",
	refreshToken: "",
	tokenType: "",
};
const slice = createSlice({ name: "session", initialState, reducers: { login, logout } });

export const userSelector = (state: RootState) => state.session.user;
export const sessionSelector = (state: RootState) => state.session;
export const isAuthenticatedSelector = (state: RootState) => state.session.isAuthenticated;

export default slice;
