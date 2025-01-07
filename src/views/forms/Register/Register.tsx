"use client";

import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import useLoginBySocialMutation from "hooks/useLoginBySocialMutation";
import useRegisterMutation from "hooks/useRegisterMutation";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useEffect, useRef, useState } from "react";
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";
import { GoogleLoginResponseOffline, type GoogleLoginResponse } from "react-google-login";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import {
	type OAuthProviderNamesType,
	type PostLoginBySocialMediaDataType,
} from "services/api/e-shop.com/auth";
import { apiFormErrorExtractor } from "utils/helpers";
import FacebookOAuthButton from "views/components/FacebookOAuthButton";
import GoogleOAuthButton from "views/components/GoogleOAuthButton";
import NextLink from "views/components/NextLink";
import PasswordField from "views/components/PasswordField";
import RecaptchaField from "views/components/RecaptchaField";
import TextField from "views/components/TextField";
import registerValidationSchema, { type schemaType } from "./schema";

const Register = () => {
	const { push } = useRouter();
	const searchParams = useSearchParams();

	// server state hooks
	const registerMutation = useRegisterMutation();
	const loginBySocialMutation = useLoginBySocialMutation();

	// ref hook
	const registerCancelRequestRef = useRef<AbortController | null>(null);
	const loginBySocialCancelRequestRef = useRef<AbortController | null>(null);
	const recaptchaRef = useRef<ReCAPTCHA | null>(null);

	// state hook
	const [facebookOAuthLoadingState, setFacebookOAuthLoadingState] = useState(false);
	const [googleOAuthLoadingState, setGoogleOAuthLoadingState] = useState(false);

	// Handle form submission.
	const onRegisterSuccessHandler = async (response: any) => {
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
		// Redirect to the dashboard after success register.
		push("/dashboard");
	};

	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (registerCancelRequestRef.current?.signal) registerCancelRequestRef.current?.abort();
		registerCancelRequestRef.current = new AbortController();

		// Call the register mutation.
		await registerMutation.mutateAsync(
			{ data, signal: registerCancelRequestRef.current.signal },
			{
				onError: async (responseError) => {
					// Extract errors from the response error.
					const errors = apiFormErrorExtractor(responseError);
					// Set errors to the form.
					if (errors) formikHelpers.setErrors(errors);
					// Reset recaptcha.
					await resetRecaptcha(formikHelpers);
				},
				onSuccess: (response) => {
					// Resetting formik.
					formikHelpers.resetForm();
					// Resetting register query mutation.
					registerMutation.reset();
					onRegisterSuccessHandler(response);
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

					onRegisterSuccessHandler(response);
				},
			}
		);
	};

	// Resets the recaptcha value and touched state.
	const resetRecaptcha = (formikHelpers: FormikHelpers<schemaType>): Promise<void> =>
		new Promise((resolve) => {
			// Reset the recaptcha widget.
			(window as any)?.grecaptcha?.reset();
			// Reset the recaptcha field value and touched state.
			formikHelpers?.setFieldValue("g-recaptcha-response", "", false);
			formikHelpers?.setFieldTouched("g-recaptcha-response", false, false);
			// Resolve the promise.
			resolve();
		});

	// form state
	const formState = useFormik<schemaType>({
		enableReinitialize: true,
		initialValues: {
			name: searchParams.get("name") || "",
			email: searchParams.get("email") || "",
			password: "",
			passwordConfirmation: "",
			"g-recaptcha-response": "",
		},
		validationSchema: registerValidationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		return () => {
			if (registerCancelRequestRef.current?.signal) registerCancelRequestRef.current?.abort();
			if (loginBySocialCancelRequestRef.current?.signal)
				loginBySocialCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting}>
				<legend className="visually-hidden">Register form</legend>
				<div className="row gy-4">
					<div className="col-12">
						<div className="row gy-3">
							<div className="col-12 col-xl-6">
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
							<div className="col-12 col-xl-6">
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
								<small>Or register by email</small>
							</span>
							<hr className="flex-grow-1 my-0" />
						</div>
					</div>
					<div className="col-12">
						<div className="row gy-4">
							<div className="col-12 col-xl-6">
								<TextField
									type="text"
									name="name"
									id="nameField"
									onChange={formState.handleChange}
									onBlur={formState.handleBlur}
									value={formState.values?.name || ""}
									isValid={Boolean(
										formState.values?.name &&
											!!formState.touched?.name &&
											!formState.errors?.name
									)}
									isInvalid={Boolean(
										!!formState.touched?.name && !!formState.errors?.name
									)}
									error={formState.errors?.name}
									label="Name"
									autoComplete="name"
									required
								/>
							</div>
							<div className="col-12 col-xl-6">
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
											!formState.errors?.email
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
							<div className="col-12 col-xl-6">
								<PasswordField
									id="passwordField"
									label="Password"
									onChange={formState.handleChange}
									onBlur={formState.handleBlur}
									value={formState.values?.password || ""}
									isValid={Boolean(
										formState.values?.password &&
											!!formState.touched?.password &&
											!formState.errors?.password
									)}
									isInvalid={Boolean(
										!!formState.touched?.password &&
											!!formState.errors?.password
									)}
									error={formState.errors?.password}
									required
									allowToggleVisibility
									allowStrengthBar
								/>
							</div>
							<div className="col-12 col-xl-6">
								<PasswordField
									id="passwordConfirmationField"
									onChange={formState.handleChange}
									onBlur={formState.handleBlur}
									name="passwordConfirmation"
									value={formState.values?.passwordConfirmation || ""}
									isValid={Boolean(
										formState.values?.passwordConfirmation &&
											!!formState.touched?.passwordConfirmation &&
											!formState.errors?.passwordConfirmation
									)}
									isInvalid={Boolean(
										!!formState.touched?.passwordConfirmation &&
											!!formState.errors?.passwordConfirmation
									)}
									error={formState.errors?.passwordConfirmation}
									label="Password Confirmation"
									required
									allowToggleVisibility
								/>
							</div>
							<div className="col-12 col-xl-6">
								<RecaptchaField
									ref={recaptchaRef}
									name="g-recaptcha-response"
									onChange={(token) =>
										formState.setFieldValue("g-recaptcha-response", token)
									}
									onExpired={() =>
										formState.setFieldValue("g-recaptcha-response", "", false)
									}
									value={formState.values?.["g-recaptcha-response"] || ""}
									isInvalid={Boolean(
										!!formState.touched?.["g-recaptcha-response"] &&
											!!formState.errors?.["g-recaptcha-response"]
									)}
									error={formState.errors?.["g-recaptcha-response"]}
									required
								/>
							</div>
							<div className="col-12 m-0"></div>
							<div className="col-12 col-xl-8 mx-auto mt-5">
								<div className="vstack gap-3">
									<button
										type="submit"
										className="btn btn-primary border-primary-dark w-100 text-capitalize"
										disabled={!formState.isValid}>
										<strong>Register</strong>
										{formState.isSubmitting && (
											<span
												className="spinner-border spinner-border-sm ms-2"
												role="status">
												<span className="visually-hidden">Loading...</span>
											</span>
										)}
									</button>
									<NextLink
										href="/auth/login"
										className="btn btn-outline-primary border-primary-dark w-100 text-capitalize">
										<strong>do you have an account? login now</strong>
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

export default Register;
