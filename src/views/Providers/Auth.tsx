"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type Props = { children?: React.ReactNode; session: Session };

const Auth = ({ children, session }: Props) => (
	<SessionProvider session={session} refetchOnWindowFocus={false}>
		{children}
	</SessionProvider>
);

export default Auth;
