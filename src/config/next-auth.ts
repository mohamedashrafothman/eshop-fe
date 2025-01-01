import axios from "config/axios";
import { type NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import vars from "utils/vars";

// You'll need to import and pass this
// to `NextAuth` in `src/app/api/auth/[...nextauth]/route.ts`
const authOptions = {
	pages: { signIn: "/auth/login", signOut: "/", error: "/auth/login" },
	providers: [
		CredentialsProvider({
			name: "email-password-credentials",
			credentials: {},
			authorize: async (credentials: any) =>
				(credentials?.user &&
					credentials?.accessToken &&
					credentials?.refreshToken &&
					credentials?.tokenType && {
						accessToken: credentials.accessToken,
						refreshToken: credentials.refreshToken,
						tokenType: credentials.tokenType,
						user: JSON.parse(JSON.stringify(credentials.user)),
					}) ||
				null,
		}),
	],
	callbacks: {
		// signIn callback to control if a user is allowed to sign in.
		signIn: ({ user }) => !!user,
		// jwt callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client). The returned value will be encrypted, and it is stored in a cookie.
		jwt: ({ token, user: tokenUser }) => {
			if (!tokenUser) return token;
			const { accessToken, refreshToken, tokenType, ...user } = (tokenUser as any) || {};
			return {
				...token,
				...(user && { user }),
				...(accessToken ? { accessToken } : {}),
				...(refreshToken ? { refreshToken } : {}),
				...(tokenType ? { tokenType } : {}),
			};
		},
		// session callback is called whenever a session is checked. By default, only a subset of the token is returned for increased security.
		session: ({ session, token }) => {
			if (!token) return session;
			const { accessToken, tokenType } = (token as any) || {};
			if (accessToken && tokenType)
				axios.defaults.headers.common["authorization"] = `${tokenType} ${accessToken}`;
			return { ...session, ...token };
		},
	},
	session: { strategy: "jwt" },
	debug: !vars.isProduction,
	secret: vars.secrets.nextAuth.secret,
} satisfies NextAuthOptions;

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
