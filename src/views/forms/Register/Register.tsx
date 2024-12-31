"use client";

import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import { useCallback, useRef } from "react";
import { isFunction } from "utils/helpers";
import LoginByButton from "views/components/LoginByButton";
import NextLink from "views/components/NextLink";
import PasswordField from "views/components/PasswordField";
import RecaptchaField from "views/components/RecaptchaField";
import TextField from "views/components/TextField";
import registerValidationSchema, { type schemaType } from "./schema";

const Register = () => {
	// ref hook
	const recaptchaRef = useRef(null);

	// event handlers
	const onFormSubmitHandler = async (
		values: schemaType,
		actions: FormikHelpers<schemaType>
	) => {};

	const resetRecaptcha = useCallback(
		({ setFieldTouched, setFieldValue }: Partial<FormikHelpers<schemaType>>): Promise<void> =>
			new Promise((resolve) => {
				if (isFunction((window as any)?.grecaptcha?.reset))
					(window as any).grecaptcha.reset();
				if (isFunction(setFieldValue)) setFieldValue("g-recaptcha-response", "", false);
				if (isFunction(setFieldTouched))
					setFieldTouched("g-recaptcha-response", false, false);
				resolve();
			}),
		[]
	);

	// form state
	const formState = useFormik<schemaType>({
		initialValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			"g-recaptcha-response": "",
		},
		validationSchema: registerValidationSchema,
		onSubmit: onFormSubmitHandler,
	});

	return (
		<form onSubmit={formState.handleSubmit} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting}>
				<legend className="visually-hidden">Register form</legend>
				<div className="row gy-4">
					<div className="col-12">
						<div className="row gy-3">
							<div className="col-12 col-xl-6">
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
							<div className="col-12 col-xl-6">
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
								<small>Or register with email</small>
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
											!!!formState.errors?.name
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
											!!!formState.errors?.password
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
											!!!formState.errors?.passwordConfirmation
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
