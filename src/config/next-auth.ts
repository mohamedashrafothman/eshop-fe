import axiosInstance from "config/axios";
import { type NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import vars from "utils/vars";

// You'll need to import and pass this
// to `NextAuth` in `src/app/api/auth/[...nextauth]/route.ts`
const authOptions = {
	pages: { signIn: "/auth/login", signOut: "/", error: "/auth/login" },
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {},
			authorize: async (credentials: any) => {
				if (
					credentials?.user ||
					credentials?.accessToken ||
					credentials?.refreshToken ||
					credentials?.tokenType
				)
					return {
						...(credentials?.accessToken && {
							accessToken: JSON.parse(credentials.accessToken),
						}),
						...(credentials?.refreshToken && {
							refreshToken: JSON.parse(credentials.refreshToken),
						}),
						...(credentials?.tokenType && {
							tokenType: JSON.parse(credentials.tokenType),
						}),
						...(credentials?.user && { user: JSON.parse(credentials.user) }),
					};

				return null;
			},
		}),
	],
	callbacks: {
		// signIn callback to control if a user is allowed to sign in.
		signIn: ({ user }) => !!user,
		// jwt callback is called whenever a JSON Web Token is created (i.e. at sign in)
		// or updated (i.e whenever a session is accessed in the client).
		// The returned value will be encrypted, and it is stored in a cookie.
		jwt: ({ token, user: tokenUser }) => {
			if (!tokenUser) return token;
			const { accessToken, refreshToken, tokenType, user } = (tokenUser as any) || {};
			return {
				...token,
				...(user && { user }),
				...(accessToken ? { accessToken } : {}),
				...(refreshToken ? { refreshToken } : {}),
				...(tokenType ? { tokenType } : {}),
			};
		},
		// session callback is called whenever a session is checked.
		// By default, only a subset of the token is returned for increased security.
		session: ({ session, token }) => {
			if (!token) return session;
			const { accessToken, tokenType } = (token as any) || {};
			if (accessToken && tokenType)
				axiosInstance.defaults.headers.common["Authorization"] =
					`${tokenType} ${accessToken}`;
			return { ...session, ...token };
		},
	},
	session: { strategy: "jwt" },
	debug: !vars.isProduction,
	secret: vars.secrets.nextAuth.secret,
} satisfies NextAuthOptions;

// Helper function to get the session on the server without having to
// import the authOptions object every single time
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
