"use client";

import { FocusError } from "focus-formik-error";
import { FormikErrors, FormikHelpers, useFormik } from "formik";
import useLoginMutation from "hooks/useLoginMutation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { apiFormErrorExtractor } from "utils/helpers";
import CheckboxField from "views/components/CheckboxField";
import LoginByButton from "views/components/LoginByButton";
import NextLink from "views/components/NextLink";
import PasswordField from "views/components/PasswordField";
import TextField from "views/components/TextField";
import loginValidationSchema, { type schemaType } from "./schema";

const Login = () => {
	const { push } = useRouter();

	// server state hooks
	const loginMutation = useLoginMutation();

	// ref hook
	const loginCancelRequestRef = useRef<AbortController | null>(null);

	// Handle form submission.
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (loginCancelRequestRef.current?.signal) loginCancelRequestRef.current?.abort();
		loginCancelRequestRef.current = new AbortController();

		// Call the login mutation.
		await loginMutation.mutateAsync(
			{ data, signal: loginCancelRequestRef.current.signal },
			{
				onError: async (responseError) => {
					// Extract errors from the response error.
					const errors = apiFormErrorExtractor(responseError) as FormikErrors<schemaType>;
					// Set errors to the form.
					if (errors) formikHelpers.setErrors(errors);
				},
				onSuccess: async (response: any) => {
					loginMutation.reset();
					// Extract user, and tokens data from the response.
					const {
						accessToken = "",
						refreshToken = "",
						tokenType = "",
						...user
					} = response?.entities?.data || {};
					// Call the signIn function from next-auth.
					await signIn("credentials", {
						...(accessToken && { accessToken }),
						...(refreshToken && { refreshToken }),
						...(tokenType && { tokenType }),
						...(user && { user }),
						redirect: false,
					});
					// Redirect to the dashboard after success login.
					push("/dashboard");
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
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting}>
				<legend className="visually-hidden">Login form</legend>
				<div className="row gy-4">
					<div className="col-12">
						<div className="row gy-3">
							<div className="col-12">
								<LoginByButton
									title="Login by Google"
									platform="google"
									icon={
										<svg className="bi w-22px h-22px" width="22" height="22">
											<use href="#icon-google" />
										</svg>
									}
								/>
							</div>
							<div className="col-12">
								<LoginByButton
									title="Login by Facebook"
									platform="facebook"
									icon={
										<svg className="bi w-22px h-22px" width="22" height="22">
											<use href="#icon-facebook" />
										</svg>
									}
								/>
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="hstack gap-2 h-100">
							<hr className="flex-grow-1 my-0" />
							<span className="fs-5 text-capitalize flex-shrink-0">
								<small>Or login with email</small>
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
