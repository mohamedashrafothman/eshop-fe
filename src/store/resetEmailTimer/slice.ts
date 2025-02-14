import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "store";
import { reset, set } from "store/resetEmailTimer/actions";

export type ResetEmailTimer = { timer: number | null };
export type SliceState = ResetEmailTimer & {};

export const initialState: SliceState = { timer: null };
const slice = createSlice({ name: "resetEmailTimer", initialState, reducers: { set, reset } });

export const resetEmailTimerSelector = (state: RootState) => state.resetEmailTimer.timer;

export default slice;
