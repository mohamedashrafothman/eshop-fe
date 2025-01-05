"use client";

import { ReactFacebookLoginProps } from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import vars from "utils/vars";
import OAuthButton, { type Props as OAuthButtonProps } from "views/components/OAuthButton";

type Props = { callback: ReactFacebookLoginProps["callback"] } & Omit<
	OAuthButtonProps,
	"title" | "icon"
>;

const FacebookOAuthButton = ({ callback, isLoading, ...props }: Props) => (
	<FacebookLogin
		fields="name,email"
		appId={vars.secrets.OAuth.facebook.appId}
		callback={callback}
		render={(facebookLoginProps) => (
			<OAuthButton
				title={`${isLoading ? "Logging" : "Login"} by Facebook`}
				icon={
					<svg className="bi w-22px h-22px" width="22" height="22">
						<use href="#icon-facebook" />
					</svg>
				}
				isLoading={isLoading}
				{...facebookLoginProps}
				{...props}
			/>
		)}
	/>
);

export default FacebookOAuthButton;
