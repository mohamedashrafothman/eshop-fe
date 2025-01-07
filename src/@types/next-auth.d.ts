import IUser from "interfaces/User.interface";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	export interface Session extends DefaultSession {
		user?: IUser;
		accessToken?: string | undefined;
		refreshToken?: string | undefined;
		tokenType?: string | undefined;
	}
}

declare module "next-auth/jwt" {
	export interface JWT extends DefaultJWT {
		user?: IUser;
		accessToken?: string | undefined;
		refreshToken?: string | undefined;
		tokenType?: string | undefined;
	}
}
