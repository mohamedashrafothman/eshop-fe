import { configureStore } from "@reduxjs/toolkit";
import middlewares from "store/middlewares";
import reducer from "store/reducer";
import vars from "utils/vars";

const ENABLE_DEV_TOOLS_AND_DEBUG = !vars.isProduction;

export const makeStore = () =>
	configureStore({
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
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
