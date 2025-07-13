import {
	useDispatch as oldUseDispatch,
	useSelector as oldUseSelector,
	useStore as oldUseStore,
} from "react-redux";
import type { AppDispatch, AppStore, RootState } from "store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = oldUseDispatch.withTypes<AppDispatch>();
export const useSelector = oldUseSelector.withTypes<RootState>();
export const useStore = oldUseStore.withTypes<AppStore>();
