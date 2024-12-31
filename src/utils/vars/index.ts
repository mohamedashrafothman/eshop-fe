import { type RawAxiosRequestHeaders } from "axios";

export type varsTypes = {
	isProduction: boolean;
	isDevelopment: boolean;
	app: {
		domain: string;
		protocol: string;
		baseUrl: string;
		name: string;
	};
	api: { headers: Pick<RawAxiosRequestHeaders, "Accept" | "Content-Type"> };
	secrets: { nextAuth: { secret: string }; google: { recaptchaKey: string } };
};

export const vars: varsTypes = {
	isProduction: process.env.NODE_ENV === "production",
	isDevelopment: process.env.NODE_ENV === "development",
	app: {
		domain: process.env.NEXT_PUBLIC_DOMAIN || "",
		protocol: process.env.NEXT_PUBLIC_PROTOCOL || "",
		baseUrl: `${process.env.NEXT_PUBLIC_API_URL || ""}/api`,
		name: process.env.NEXT_PUBLIC_NAME || "",
	},
	api: { headers: { Accept: "application/json", "Content-Type": "application/json" } },
	secrets: {
		nextAuth: { secret: process.env.NEXTAUTH_SECRET || "" },
		google: { recaptchaKey: process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY || "" },
	},
};

export default vars;
