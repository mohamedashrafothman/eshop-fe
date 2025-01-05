"use client";

import GoogleLogin, { type GoogleLoginProps } from "react-google-login";
import vars from "utils/vars";
import OAuthButton, { Props as OAuthButtonProps } from "views/components/OAuthButton";

type Props = { onSuccess: GoogleLoginProps["onSuccess"] } & Omit<
	OAuthButtonProps,
	"icon" | "title"
>;

const GoogleOAuthButton = ({ onSuccess, isLoading, ...props }: Props) => (
	<GoogleLogin
		clientId={vars.secrets.OAuth.google.appId}
		onSuccess={onSuccess}
		cookiePolicy="single_host_origin"
		render={(googleLoginProps) => (
			<OAuthButton
				title={`${isLoading ? "Logging" : "Login"} by Google`}
				icon={
					<svg className="bi w-22px h-22px" width="22" height="22">
						<use href="#icon-google" />
					</svg>
				}
				isLoading={isLoading}
				{...googleLoginProps}
				{...props}
			/>
		)}
	/>
);

export default GoogleOAuthButton;
