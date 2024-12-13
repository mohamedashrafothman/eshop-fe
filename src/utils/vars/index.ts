export type varsTypes = {
	isProduction: boolean;
	isDevelopment: boolean;
	app: {
		domain: string;
		protocol: string;
		baseUrl: string;
		name: string;
	};
};

export const vars: varsTypes = {
	isProduction: process.env.NODE_ENV === "production",
	isDevelopment: process.env.NODE_ENV === "development",
	app: {
		domain: process.env.NEXT_PUBLIC_DOMAIN || "",
		protocol: process.env.NEXT_PUBLIC_PROTOCOL || "",
		baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
		name: process.env.NEXT_PUBLIC_NAME || "",
	},
};

export default vars;
