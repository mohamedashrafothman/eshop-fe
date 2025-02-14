import { combineReducers } from "@reduxjs/toolkit";
import { getPersistConfig } from "redux-deep-persist";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as resetEmailTimer, name as resetEmailTimerName } from "store/resetEmailTimer";
import vars from "utils/vars";

const ENABLE_DEV_TOOLS_AND_DEBUG = !vars.isProduction;

const rootReducer = combineReducers({ [resetEmailTimerName]: resetEmailTimer });
const reducerPersisted = persistReducer(
	getPersistConfig({
		key: vars.app.name || "root",
		storage,
		debug: ENABLE_DEV_TOOLS_AND_DEBUG,
		whitelist: ["resetEmailTimer"],
		rootReducer,
	}),
	rootReducer
);

export default reducerPersisted;
