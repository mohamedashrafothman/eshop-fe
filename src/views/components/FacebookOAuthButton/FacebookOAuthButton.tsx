"use client";

import classNames from "classnames";
import useLoginBySocialMutation from "hooks/useLoginBySocialMutation";
import useMeQuery from "hooks/useMeQuery";
import useUnlinkSocialMutation from "hooks/useUnlinkSocialMutation";
import { useSession } from "next-auth/react";
import { useTransitionRouter } from "next-view-transitions";
import qs from "qs";
import { useEffect, useRef, useState } from "react";
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { toast } from "react-toastify";
import { type PostLoginBySocialMediaDataType } from "services/api/e-shop/auth";
import { isFunction } from "utils/helpers";
import vars from "utils/vars";
import OAuthButton, { type Props as OAuthButtonProps } from "views/components/OAuthButton";

type Props = { onSuccess?: (_x: any) => Promise<void> | undefined } & Omit<
	OAuthButtonProps,
	"title" | "icon"
>;

const FacebookOAuthButton = ({ onSuccess, className, ...props }: Props) => {
	const session = useSession();
	const { data: user } = useMeQuery();
	const { push } = useTransitionRouter();

	// server state hooks
	const loginBySocialMutation = useLoginBySocialMutation();
	const unlinkSocialMutation = useUnlinkSocialMutation();

	// ref hook
	const oAuthSocialCancelRequestRef = useRef<AbortController | null>(null);

	// state hook
	const [facebookOAuthLoadingState, setFacebookOAuthLoadingState] = useState(false);

	// constants
	const isAuthenticated = session?.status === "authenticated";
	const isConnectedToFacebook = Boolean(user?.data?.entities?.data?.facebook);
	const buttonTitle = isAuthenticated
		? `${isConnectedToFacebook ? (facebookOAuthLoadingState ? "Unlinking from" : "Unlink from") : facebookOAuthLoadingState ? "Linking to" : "Link to"} Facebook`
		: `${facebookOAuthLoadingState ? "Logging" : "Login"} by Facebook`;

	// event handlers
	const onOAuthLoginHandler = async (providerData: Partial<PostLoginBySocialMediaDataType>) => {
		// Check if email, or name not found, then redirect user to use email, and password method.
		if (!providerData?.email || !providerData?.name) {
			setFacebookOAuthLoadingState(false);
			toast("Your social account is missing the email or name.", { type: "error" });
			if (!isAuthenticated)
				push(
					`/auth/register?${qs.stringify({
						...(providerData?.email ? { email: providerData.email } : {}),
						...(providerData?.name ? { name: providerData.name } : {}),
					})}`
				);
			return;
		}

		// Abort any previous request, and create a new abort controller.
		if (oAuthSocialCancelRequestRef.current?.signal)
			oAuthSocialCancelRequestRef.current?.abort();
		oAuthSocialCancelRequestRef.current = new AbortController();

		// Call the login by social mutation.
		await loginBySocialMutation.mutateAsync(
			{
				variables: { providerName: "facebook" },
				data: providerData as PostLoginBySocialMediaDataType,
				signal: oAuthSocialCancelRequestRef.current.signal,
			},
			{
				onError: () => {
					// Reset Oauth loading state
					setFacebookOAuthLoadingState(false);
				},
				onSuccess: async (response) => {
					// Reset Oauth loading state
					setFacebookOAuthLoadingState(false);

					// Resetting login by social query mutation.
					loginBySocialMutation.reset();

					if (isFunction(onSuccess)) onSuccess(response);
				},
			}
		);
	};
	const onOAuthUnlinkHandler = async () => {
		// Abort any previous request, and create a new abort controller.
		if (oAuthSocialCancelRequestRef.current?.signal)
			oAuthSocialCancelRequestRef.current?.abort();
		oAuthSocialCancelRequestRef.current = new AbortController();

		// Call the unlink social mutation.
		await unlinkSocialMutation.mutateAsync(
			{
				variables: { providerName: "facebook" },
				data: {},
				signal: oAuthSocialCancelRequestRef.current.signal,
			},
			{
				onError: () => {
					// Reset Oauth loading state
					setFacebookOAuthLoadingState(false);
				},
				onSuccess: async (response) => {
					// Reset Oauth loading state
					setFacebookOAuthLoadingState(false);

					// Resetting login by social query mutation.
					loginBySocialMutation.reset();

					if (isFunction(onSuccess)) onSuccess(response);
				},
			}
		);
	};

	// effect hooks
	useEffect(() => {
		return () => {
			if (oAuthSocialCancelRequestRef.current?.signal)
				oAuthSocialCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<>
			{isAuthenticated && isConnectedToFacebook && (
				<OAuthButton
					title={buttonTitle}
					onClick={() => {
						setFacebookOAuthLoadingState(true);
						onOAuthUnlinkHandler();
					}}
					className={classNames(className)}
					icon={
						<svg className="bi w-22px h-22px" width="22" height="22">
							<use href="#icon-facebook" />
						</svg>
					}
					isLoading={facebookOAuthLoadingState}
					{...props}
				/>
			)}
			{(!isAuthenticated || (isAuthenticated && !isConnectedToFacebook)) && (
				<FacebookLogin
					fields="name,email"
					appId={vars.secrets.OAuth.facebook.appId}
					callback={(userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
						const {
							name = "",
							email = "",
							accessToken: providerToken = "",
							id: providerId = "",
						} = userInfo as ReactFacebookLoginInfo;

						setFacebookOAuthLoadingState(true);

						onOAuthLoginHandler({ name, email, providerToken, providerId });
					}}
					render={(facebookProps) => (
						<OAuthButton
							title={buttonTitle}
							className={classNames(className)}
							icon={
								<svg className="bi w-22px h-22px" width="22" height="22">
									<use href="#icon-facebook" />
								</svg>
							}
							isLoading={facebookOAuthLoadingState}
							{...facebookProps}
							{...props}
						/>
					)}
				/>
			)}
		</>
	);
};

export default FacebookOAuthButton;
