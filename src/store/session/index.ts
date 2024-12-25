import slice, {
	initialState,
	isAuthenticatedSelector,
	userSelector,
	type Session,
	type SliceState,
} from "store/session/slice";

const { actions, reducer, name } = slice;

export {
	actions,
	initialState,
	isAuthenticatedSelector,
	name,
	reducer,
	userSelector,
	type Session,
	type SliceState,
};

export default reducer;
