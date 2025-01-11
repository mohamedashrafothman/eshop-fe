"use client";

import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import useLoginBySocialMutation from "hooks/useLoginBySocialMutation";
import useLoginMutation from "hooks/useLoginMutation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import qs from "qs";
import { useEffect, useRef, useState } from "react";
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";
import { GoogleLoginResponseOffline, type GoogleLoginResponse } from "react-google-login";
import { toast } from "react-toastify";
import {
	type OAuthProviderNamesType,
	type PostLoginBySocialMediaDataType,
} from "services/api/e-shop.com/auth";
import { apiFormErrorExtractor } from "utils/helpers";
import CheckboxField from "views/components/CheckboxField";
import FacebookOAuthButton from "views/components/FacebookOAuthButton";
import GoogleOAuthButton from "views/components/GoogleOAuthButton";
import NextLink from "views/components/NextLink";
import PasswordField from "views/components/PasswordField";
import TextField from "views/components/TextField";
import loginValidationSchema, { type schemaType } from "./schema";

const Login = () => {
	const { push } = useRouter();

	// server state hooks
	const loginMutation = useLoginMutation();
	const loginBySocialMutation = useLoginBySocialMutation();

	// ref hook
	const loginCancelRequestRef = useRef<AbortController | null>(null);
	const loginBySocialCancelRequestRef = useRef<AbortController | null>(null);

	// state hook
	const [isLoginLoadingState, setIsLoginLoadingState] = useState(false);
	const [facebookOAuthLoadingState, setFacebookOAuthLoadingState] = useState(false);
	const [googleOAuthLoadingState, setGoogleOAuthLoadingState] = useState(false);

	// Handle form submission.
	const onLoginSuccessHandler = async (response: any) => {
		// Extract user, and tokens data from the response.
		const {
			accessToken = "",
			refreshToken = "",
			tokenType = "",
			...user
		} = response?.entities?.data || {};
		// Call the signIn function from next-auth.
		await signIn("credentials", {
			...(accessToken && { accessToken: JSON.stringify(accessToken) }),
			...(refreshToken && { refreshToken: JSON.stringify(refreshToken) }),
			...(tokenType && { tokenType: JSON.stringify(tokenType) }),
			...(user && { user: JSON.stringify(user) }),
			redirect: false,
		});
		// Redirect to the dashboard after success login.
		push("/dashboard");
		// Reset login loading state.
		setIsLoginLoadingState(false);
	};

	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Set login loading state.
		setIsLoginLoadingState(true);

		// Abort any previous request, and create a new abort controller.
		if (loginCancelRequestRef.current?.signal) loginCancelRequestRef.current?.abort();
		loginCancelRequestRef.current = new AbortController();

		// Call the login mutation.
		await loginMutation.mutateAsync(
			{ data, signal: loginCancelRequestRef.current.signal },
			{
				onError: (responseError) => {
					// Extract errors from the response error.
					const errors = apiFormErrorExtractor(responseError);
					// Set errors to the form.
					if (errors) formikHelpers.setErrors(errors);
					// Reset login loading state.
					setIsLoginLoadingState(false);
				},
				onSuccess: (response) => {
					// Resetting formik.
					formikHelpers.resetForm();
					// Resetting login query mutation.
					loginMutation.reset();
					onLoginSuccessHandler(response);
				},
			}
		);
	};

	const onOAuthLoginHandler = async (
		providerName: OAuthProviderNamesType,
		providerData: Partial<PostLoginBySocialMediaDataType>
	) => {
		// Check if email, or name not found, then redirect user to use email, and password method.
		if (!providerData?.email || !providerData?.name) {
			setFacebookOAuthLoadingState(false);
			setGoogleOAuthLoadingState(false);
			toast(
				"Your social account is missing the email or name. Please register a new account instead!",
				{ type: "error" }
			);
			push(
				`/auth/register?${qs.stringify({
					...(providerData?.email ? { email: providerData.email } : {}),
					...(providerData?.name ? { name: providerData.name } : {}),
				})}`
			);
			return;
		}

		// Abort any previous request, and create a new abort controller.
		if (loginBySocialCancelRequestRef.current?.signal)
			loginBySocialCancelRequestRef.current?.abort();
		loginBySocialCancelRequestRef.current = new AbortController();

		// Call the login by social mutation.
		await loginBySocialMutation.mutateAsync(
			{
				variables: { providerName },
				data: providerData as PostLoginBySocialMediaDataType,
				signal: loginBySocialCancelRequestRef.current.signal,
			},
			{
				onError: () => {
					// Reset Oauth loading state
					setFacebookOAuthLoadingState(false);
					setGoogleOAuthLoadingState(false);
				},
				onSuccess: async (response) => {
					// Reset Oauth loading state
					setFacebookOAuthLoadingState(false);
					setGoogleOAuthLoadingState(false);

					// Resetting login by social query mutation.
					loginBySocialMutation.reset();

					onLoginSuccessHandler(response);
				},
			}
		);
	};

	// form state
	const formState = useFormik<schemaType>({
		initialValues: { email: "", password: "" },
		validationSchema: loginValidationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		return () => {
			if (loginCancelRequestRef.current?.signal) loginCancelRequestRef.current?.abort();
			if (loginBySocialCancelRequestRef.current?.signal)
				loginBySocialCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting || isLoginLoadingState}>
				<legend className="visually-hidden">Login form</legend>
				<div className="row gy-4">
					<div className="col-12">
						<div className="row gy-3">
							<div className="col-12">
								<GoogleOAuthButton
									onSuccess={(
										res: GoogleLoginResponseOffline | GoogleLoginResponse
									) => {
										const { profileObj, accessToken: providerToken = "" } =
											res as GoogleLoginResponse;
										const {
											name: fullName = "",
											familyName = "",
											givenName = "",
											email = "",
											googleId: providerId = "",
										} = profileObj;
										const name =
											fullName || `${givenName} ${familyName}`.trim() || "";

										setGoogleOAuthLoadingState(true);

										onOAuthLoginHandler("google", {
											name,
											email,
											providerToken,
											providerId,
										});
									}}
									isLoading={googleOAuthLoadingState}
								/>
							</div>
							<div className="col-12">
								<FacebookOAuthButton
									callback={(
										userInfo:
											| ReactFacebookLoginInfo
											| ReactFacebookFailureResponse
									) => {
										const {
											name = "",
											email = "",
											accessToken: providerToken = "",
											id: providerId = "",
										} = userInfo as ReactFacebookLoginInfo;

										setFacebookOAuthLoadingState(true);

										onOAuthLoginHandler("facebook", {
											name,
											email,
											providerToken,
											providerId,
										});
									}}
									isLoading={facebookOAuthLoadingState}
								/>
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="hstack gap-2 h-100">
							<hr className="flex-grow-1 my-0" />
							<span className="fs-5 text-capitalize flex-shrink-0">
								<small>Or login by email</small>
							</span>
							<hr className="flex-grow-1 my-0" />
						</div>
					</div>
					<div className="col-12">
						<div className="row gy-4">
							<div className="col-12">
								<TextField
									type="email"
									name="email"
									id="emailField"
									onChange={formState.handleChange}
									onBlur={formState.handleBlur}
									value={formState.values?.email || ""}
									isValid={Boolean(
										formState.values?.email &&
											!!formState.touched?.email &&
											!!!formState.errors?.email
									)}
									isInvalid={Boolean(
										!!formState.touched?.email && !!formState.errors?.email
									)}
									error={formState.errors?.email}
									label="Email address"
									autoComplete="email"
									required
								/>
							</div>
							<div className="col-12">
								<PasswordField
									id="passwordField"
									onChange={formState.handleChange}
									onBlur={formState.handleBlur}
									value={formState.values?.password || ""}
									isValid={Boolean(
										formState.values?.password &&
											!!formState.touched?.password &&
											!!!formState.errors?.password
									)}
									isInvalid={Boolean(
										!!formState.touched?.password &&
											!!formState.errors?.password
									)}
									error={formState.errors?.password}
									label="Password"
									required
									allowForgotPasswordLink
									allowToggleVisibility
								/>
							</div>
							<div className="col-12">
								<CheckboxField
									onChange={({ target: { checked } }) => {
										formState.setFieldValue("remember", checked);
									}}
									onBlur={formState.handleBlur}
									value="1"
									name="remember"
									id="rememberMeField"
									label="Remember me!"
									checked={formState.values?.remember || undefined}
								/>
							</div>
							<div className="col-12 mt-5">
								<div className="vstack gap-3">
									<button
										type="submit"
										className="btn btn-primary border-primary-dark w-100 text-capitalize"
										disabled={!formState.isValid}>
										<strong>Login</strong>
										{(formState.isSubmitting || isLoginLoadingState) && (
											<span
												className="spinner-border spinner-border-sm ms-2"
												role="status">
												<span className="visually-hidden">Loading...</span>
											</span>
										)}
									</button>
									<NextLink
										href="/auth/register"
										className="btn btn-outline-primary border-primary-dark w-100 text-capitalize">
										<strong>don't have an account? join us</strong>
									</NextLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</fieldset>
		</form>
	);
};

export default Login;
