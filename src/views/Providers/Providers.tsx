"use client";

import { HydrationBoundary, type DehydratedState } from "@tanstack/react-query";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Slide, ToastContainer } from "react-toastify";
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
		<SessionProvider session={session} refetchOnWindowFocus={false}>
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
				<ReactQueryProvider>
					<HydrationBoundary state={hydrationBoundaryState}>{children}</HydrationBoundary>
				</ReactQueryProvider>
			</AxiosProvider>
		</SessionProvider>
	</ReduxProvider>
);

export default Providers;
