"use client";

import { Provider } from "react-redux";
import { PersistGate as PersistProvider } from "redux-persist/integration/react";
import store, { persistor } from "store";

type Props = { children?: React.ReactNode };

const Redux = ({ children }: Props) => (
	<Provider store={store}>
		<PersistProvider persistor={persistor}>{children}</PersistProvider>
	</Provider>
);

export default Redux;
