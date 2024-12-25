import { createSlice } from "@reduxjs/toolkit";
import { default as IUser } from "interfaces/User.interface";
import { type RootState } from "store";
import { login, logout } from "store/session/actions";

type Session = { user: IUser; token: string; isAuthenticated: boolean };
type SliceState = Session & {};

const initialState: SliceState = { user: {}, token: "", isAuthenticated: false };
const slice = createSlice({ name: "session", initialState, reducers: { login, logout } });

const isAuthenticatedSelector = (state: RootState) => state.session.isAuthenticated;
const userSelector = (state: RootState) => state.session.user;

export { initialState, isAuthenticatedSelector, userSelector, type Session, type SliceState };
export default slice;
