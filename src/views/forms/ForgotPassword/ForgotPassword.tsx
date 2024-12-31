"use client";

import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import NextLink from "views/components/NextLink";
import TextField from "views/components/TextField";
import forgotPasswordValidationSchema, { type schemaType } from "./schema";

const ForgotPassword = () => {
	// event handlers
	const onFormSubmitHandler = async (
		values: schemaType,
		actions: FormikHelpers<schemaType>
	) => {};

	// form state
	const formState = useFormik<schemaType>({
		initialValues: { email: "" },
		validationSchema: forgotPasswordValidationSchema,
		onSubmit: onFormSubmitHandler,
	});

	return (
		<form onSubmit={formState.handleSubmit} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting}>
				<legend className="visually-hidden">Forgot Password form</legend>
				<div className="row gy-4">
					<div className="col-12">
						<TextField
							type="email"
							name="email"
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
					<div className="col-12 mt-5">
						<div className="vstack gap-3">
							<button
								type="submit"
								className="btn btn-primary border-primary-dark w-100 text-capitalize"
								disabled={!formState.isValid}>
								<strong>Forgot Password</strong>
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
								className="btn btn-outline-primary border-primary-dark w-100 text-capitalize justify-content-center icon-link icon-link-hover icon-link-hover-reversed">
								<svg className="bi w-20px h-20px" width="20" height="20">
									<use href="#icon-chevron-left" />
								</svg>
								<strong>back to login</strong>
							</NextLink>
						</div>
					</div>
				</div>
			</fieldset>
		</form>
	);
};

export default ForgotPassword;
