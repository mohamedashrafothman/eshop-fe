"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import useLoginMutation from "hooks/useLoginMutation";
import { signIn } from "next-auth/react";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { apiFormErrorExtractor } from "utils/helpers";
import CheckboxField from "views/components/CheckboxField";
import FacebookOAuthButton from "views/components/FacebookOAuthButton";
import GoogleOAuthButton from "views/components/GoogleOAuthButton";
import NextLink from "views/components/NextLink";
import PasswordField from "views/components/PasswordField";
import TextField from "views/components/TextField";
import formValidationSchema, { type schemaType } from "./schema";

const Login = () => {
	const { push } = useTransitionRouter();
	const queryClient = useQueryClient();

	// server state hooks
	const loginMutation = useLoginMutation();

	// ref hook
	const loginCancelRequestRef = useRef<AbortController | null>(null);

	// state hook
	const [isLoginLoadingState, setIsLoginLoadingState] = useState(false);

	// Handle form submission.
	const onLoginSuccessHandler = async (response: any): Promise<void> => {
		// Remove the me query from the cache.
		queryClient.removeQueries({ queryKey: ["users", "me"], exact: true });
		// Extract user, and tokens data from the response.
		const {
			accessToken = "",
			refreshToken = "",
			tokenType = "",
			...user
		} = response?.entities?.data || {};
		// Call the signIn function from next-auth.
		if (accessToken || refreshToken || tokenType || user)
			await signIn("credentials", {
				...(accessToken && { accessToken: JSON.stringify(accessToken) }),
				...(refreshToken && { refreshToken: JSON.stringify(refreshToken) }),
				...(tokenType && { tokenType: JSON.stringify(tokenType) }),
				...(user && { user: JSON.stringify(user) }),
				redirect: false,
			});
		// Reset login loading state.
		setIsLoginLoadingState(false);
		// Redirect to the dashboard after success login.
		push("/dashboard");
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

	// form state
	const formState = useFormik<schemaType>({
		initialValues: { email: "", password: "" },
		validationSchema: formValidationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		return () => {
			if (loginCancelRequestRef.current?.signal) loginCancelRequestRef.current?.abort();
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
									className="w-100 justify-content-center"
									onSuccess={onLoginSuccessHandler}
								/>
							</div>
							<div className="col-12">
								<FacebookOAuthButton
									className="w-100 justify-content-center"
									onSuccess={onLoginSuccessHandler}
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
