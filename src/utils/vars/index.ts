import { type RawAxiosRequestHeaders } from "axios";

export type varsTypes = {
	isProduction: boolean;
	isDevelopment: boolean;
	app: {
		domain: string;
		protocol: string;
		host: string;
		baseUrl: string;
		name: string;
		authorName: string;
		fileMaxSizeInMB: number;
		applicationFileInputAccepts: string[];
	};
	api: { headers: Pick<RawAxiosRequestHeaders, "accept" | "content-type"> };
	secrets: {
		nextAuth: { secret: string };
		OAuth: {
			google: { recaptchaKey: string; appId: string };
			facebook: { appId: string };
		};
	};
	roles: {
		user: string;
		admin: string;
		superAdmin: string;
	};
};

export const vars: varsTypes = {
	isProduction: process.env.NODE_ENV === "production",
	isDevelopment: process.env.NODE_ENV === "development",
	app: {
		domain: process.env.NEXT_PUBLIC_DOMAIN || "",
		protocol: process.env.NEXT_PUBLIC_PROTOCOL || "",
		host: process.env.NEXT_PUBLIC_HOST || "",
		baseUrl: `${process.env.NEXT_PUBLIC_API_URL || ""}/api`,
		name: process.env.NEXT_PUBLIC_NAME || "",
		authorName: process.env.NEXT_PUBLIC_AUTHOR_NAME || "",
		fileMaxSizeInMB: 5,
		applicationFileInputAccepts: ["image/*", "application/*"],
	},
	api: { headers: { accept: "application/json", "content-type": "application/json" } },
	secrets: {
		nextAuth: { secret: process.env.NEXTAUTH_SECRET || "" },
		OAuth: {
			google: {
				recaptchaKey: process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY || "",
				appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID || "",
			},
			facebook: { appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "" },
		},
	},
	roles: {
		user: "USER",
		admin: "ADMIN",
		superAdmin: "SUPER_ADMIN",
	},
};

export default vars;
