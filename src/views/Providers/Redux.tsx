"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate as PersistProvider } from "redux-persist/integration/react";
import { makeStore, type AppStore } from "store";

type Props = { children?: React.ReactNode };

const Redux = ({ children }: Props) => {
	const storeRef = useRef<AppStore | null>(null);
	// Create the store instance the first time this renders
	if (!storeRef.current) storeRef.current = makeStore();
	// Persist the store
	const store = storeRef.current;
	const persistor = persistStore(store);
	// Return the Provider
	return (
		<Provider store={store}>
			<PersistProvider persistor={persistor}>{children}</PersistProvider>
		</Provider>
	);
};

export default Redux;
