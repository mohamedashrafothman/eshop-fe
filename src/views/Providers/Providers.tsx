"use client";

import NextTopLoader from "nextjs-toploader";
import { default as AxiosProvider } from "./Axios";
import { default as ReactQueryProvider } from "./ReactQuery";
import { default as ReduxProvider } from "./Redux";

type Props = { children?: React.ReactNode };

const Providers = ({ children }: Props) => (
	<ReduxProvider>
		<AxiosProvider>
			<ReactQueryProvider>
				<NextTopLoader color="var(--bs-primary)" />
				{children}
			</ReactQueryProvider>
		</AxiosProvider>
	</ReduxProvider>
);

export default Providers;
