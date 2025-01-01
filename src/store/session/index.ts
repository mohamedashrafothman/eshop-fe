import slice, {
	initialState,
	isAuthenticatedSelector,
	sessionSelector,
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
	sessionSelector,
	userSelector,
	type Session,
	type SliceState,
};

export default reducer;
