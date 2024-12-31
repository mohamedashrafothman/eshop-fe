// import axios from "config/axios";
import NextAuth, { type NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import vars from "utils/vars";

const authOptions: NextAuthOptions = {
	pages: { signIn: "/auth/login", signOut: "/", error: "/auth/login" },
	providers: [],
	callbacks: {},
	session: { strategy: "jwt" },
	debug: !vars.isProduction,
	secret: vars.secrets.nextAuth.secret,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
