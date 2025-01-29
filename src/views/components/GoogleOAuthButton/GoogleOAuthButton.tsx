"use client";

import classNames from "classnames";
import useLoginBySocialMutation from "hooks/useLoginBySocialMutation";
import useMeQuery from "hooks/useMeQuery";
import useUnlinkSocialMutation from "hooks/useUnlinkSocialMutation";
import { useSession } from "next-auth/react";
import { useTransitionRouter } from "next-view-transitions";
import qs from "qs";
import { useEffect, useRef, useState } from "react";
import GoogleLogin, {
	GoogleLoginResponseOffline,
	type GoogleLoginResponse,
} from "react-google-login";
import { toast } from "react-toastify";
import { type PostLoginBySocialMediaDataType } from "services/api/e-shop/auth";
import vars from "utils/vars";
import OAuthButton, { type Props as OAuthButtonProps } from "views/components/OAuthButton";

type Props = Omit<OAuthButtonProps, "icon" | "title">;

const GoogleOAuthButton = ({ className, ...props }: Props) => {
	const session = useSession();
	const { data: user } = useMeQuery();
	const { push } = useTransitionRouter();

	// server state hooks
	const loginBySocialMutation = useLoginBySocialMutation();
	const unlinkSocialMutation = useUnlinkSocialMutation();

	// ref hook
	const oAuthSocialCancelRequestRef = useRef<AbortController | null>(null);

	// state hook
	const [googleOAuthLoadingState, setGoogleOAuthLoadingState] = useState(false);

	// constants
	const isAuthenticated = session?.status === "authenticated";
	const isConnectedToGoogle = Boolean(user?.google);
	const buttonTitle = isAuthenticated
		? `${isConnectedToGoogle ? (googleOAuthLoadingState ? "Unlinking from" : "Unlink from") : googleOAuthLoadingState ? "Linking to" : "Link to"} Google`
		: `${googleOAuthLoadingState ? "Logging" : "Login"} by Google`;

	// event handlers
	const onOAuthLoginHandler = async (providerData: Partial<PostLoginBySocialMediaDataType>) => {
		// Check if email, or name not found, then redirect user to use email, and password method.
		if (!providerData?.email || !providerData?.name) {
			setGoogleOAuthLoadingState(false);
			toast("Your social account is missing the email or name.", { type: "error" });
			if (!isAuthenticated) push(`/auth/register?${qs.stringify(providerData)}`);
			return;
		}

		// Abort any previous request, and create a new abort controller.
		if (oAuthSocialCancelRequestRef.current?.signal)
			oAuthSocialCancelRequestRef.current?.abort();
		oAuthSocialCancelRequestRef.current = new AbortController();

		// Call the login by social mutation.
		await loginBySocialMutation.mutateAsync(
			{
				variables: { providerName: "google" },
				data: providerData as PostLoginBySocialMediaDataType,
				signal: oAuthSocialCancelRequestRef.current.signal,
			},
			{
				onError: () => {
					// Reset Oauth loading state
					setGoogleOAuthLoadingState(false);
				},
				onSuccess: () => {
					// Reset Oauth loading state
					setGoogleOAuthLoadingState(false);
					// Resetting login by social query mutation.
					loginBySocialMutation.reset();
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
				variables: { providerName: "google" },
				data: {},
				signal: oAuthSocialCancelRequestRef.current.signal,
			},
			{
				onError: () => {
					// Reset Oauth loading state
					setGoogleOAuthLoadingState(false);
				},
				onSuccess: () => {
					// Reset Oauth loading state
					setGoogleOAuthLoadingState(false);
					// Resetting login by social query mutation.
					loginBySocialMutation.reset();
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
			{isAuthenticated && isConnectedToGoogle && (
				<OAuthButton
					title={buttonTitle}
					onClick={() => {
						setGoogleOAuthLoadingState(true);
						onOAuthUnlinkHandler();
					}}
					className={classNames(className)}
					icon={
						<svg className="bi w-22px h-22px" width="22" height="22">
							<use href="#icon-google" />
						</svg>
					}
					isLoading={googleOAuthLoadingState}
					{...props}
				/>
			)}
			{(!isAuthenticated || (isAuthenticated && !isConnectedToGoogle)) && (
				<GoogleLogin
					clientId={vars.secrets.OAuth.google.appId}
					cookiePolicy="single_host_origin"
					scope="profile email"
					onFailure={(err) => console.log(err)}
					onSuccess={(res: GoogleLoginResponseOffline | GoogleLoginResponse) => {
						const { profileObj, accessToken: providerToken = "" } =
							res as GoogleLoginResponse;
						const {
							name: fullName = "",
							familyName = "",
							givenName = "",
							email = "",
							googleId: providerId = "",
						} = profileObj;
						const name = fullName || `${givenName} ${familyName}`.trim() || "";

						setGoogleOAuthLoadingState(true);

						onOAuthLoginHandler({
							name,
							email,
							providerToken,
							providerId,
						});
					}}
					render={(googleProps) => (
						<OAuthButton
							title={buttonTitle}
							className={classNames(className)}
							icon={
								<svg className="bi w-22px h-22px" width="22" height="22">
									<use href="#icon-google" />
								</svg>
							}
							isLoading={googleOAuthLoadingState}
							{...googleProps}
							{...props}
						/>
					)}
				/>
			)}
		</>
	);
};

export default GoogleOAuthButton;
