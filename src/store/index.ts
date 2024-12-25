import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import middlewares from "store/middlewares";
import reducer from "store/reducer";
import vars from "utils/vars";

const ENABLE_DEV_TOOLS_AND_DEBUG = !vars.isProduction;

export const store = configureStore({
	/**
	 * A single reducer function that will be used as the root reducer.
	 */
	reducer,
	/**
	 * An array of Redux middleware to install.
	 */
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
	/**
	 * Whether to enable Redux DevTools integration. Defaults to `true`.
	 * Additional configuration can be done by passing Redux DevTools options
	 */
	devTools: ENABLE_DEV_TOOLS_AND_DEBUG,
});

const persistor = persistStore(store);

type RootState = ReturnType<typeof reducer>;
type AppDispatch = typeof store.dispatch;

export { persistor, type AppDispatch, type RootState };
export default store;
