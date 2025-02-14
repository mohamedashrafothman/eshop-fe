import slice, {
	initialState,
	resetEmailTimerSelector,
	type ResetEmailTimer,
	type SliceState,
} from "store/resetEmailTimer/slice";

const { actions, reducer, name } = slice;

export {
	actions,
	initialState,
	name,
	reducer,
	resetEmailTimerSelector,
	type ResetEmailTimer,
	type SliceState,
};

export default reducer;
