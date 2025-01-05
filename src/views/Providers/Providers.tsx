"use client";

import { type DehydratedState } from "@tanstack/react-query";
import type { Session } from "next-auth";
import NextTopLoader from "nextjs-toploader";
import { Slide, ToastContainer } from "react-toastify";
import { default as AuthProvider } from "./Auth";
import { default as AxiosProvider } from "./Axios";
import { default as ReactQueryProvider } from "./ReactQuery";
import { default as ReduxProvider } from "./Redux";

type Props = {
	children?: React.ReactNode;
	session: Session;
	hydrationBoundaryState: DehydratedState;
};

const Providers = ({ children, session, hydrationBoundaryState }: Props) => (
	<ReduxProvider>
		<AuthProvider session={session}>
			<AxiosProvider>
				<NextTopLoader color="var(--e-shop-primary)" />
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					theme="dark"
					transition={Slide}
					closeButton={false}
					pauseOnHover
					hideProgressBar
					closeOnClick
				/>
				<ReactQueryProvider state={hydrationBoundaryState}>{children}</ReactQueryProvider>
			</AxiosProvider>
		</AuthProvider>
	</ReduxProvider>
);

export default Providers;
