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
	session?: Session | null;
	hydrationBoundaryState: DehydratedState;
};

const Providers = ({ children, session, hydrationBoundaryState }: Props) => (
	<AuthProvider session={session}>
		<ReduxProvider>
			<ReactQueryProvider state={hydrationBoundaryState}>
				<AxiosProvider>
					<NextTopLoader color="var(--e-shop-primary)" />
					<ToastContainer
						position="bottom-center"
						autoClose={3000}
						theme="dark"
						transition={Slide}
						closeButton={false}
						pauseOnHover
						hideProgressBar
						closeOnClick
					/>
					{children}
				</AxiosProvider>
			</ReactQueryProvider>
		</ReduxProvider>
	</AuthProvider>
);

export default Providers;
