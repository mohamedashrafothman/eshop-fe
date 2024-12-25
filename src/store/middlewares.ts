import logger from "redux-logger";
import vars from "utils/vars";

const ENABLE_DEV_TOOLS_AND_DEBUG = !vars.isProduction;

const middlewares = [...((ENABLE_DEV_TOOLS_AND_DEBUG && [logger]) || [])];

export default middlewares;
