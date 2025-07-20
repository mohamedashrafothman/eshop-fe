"use client";

import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import { useForgotPasswordMutation } from "hooks/useTanstackQuery/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { apiFormErrorExtractor, isFieldRequired } from "utils/helpers";
import EmailField from "views/components/EmailField";
import NextLink from "views/components/NextLink";
import formValidationSchema, { type schemaType } from "./schema";

const ForgotPassword = () => {
	const { push } = useRouter();

	// server state hooks
	const forgotPasswordMutation = useForgotPasswordMutation();

	// ref hook
	const forgotPasswordCancelRequestRef = useRef<AbortController | null>(null);

	// constants
	const validationSchema = formValidationSchema();

	// event handlers
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (forgotPasswordCancelRequestRef.current?.signal)
			forgotPasswordCancelRequestRef.current?.abort();
		forgotPasswordCancelRequestRef.current = new AbortController();

		// Call the forgot password mutation.
		await forgotPasswordMutation.mutateAsync(
			{ data, signal: forgotPasswordCancelRequestRef.current.signal },
			{
				onError: (responseError) => {
					// Extract errors from the response error.
					const errors = apiFormErrorExtractor(responseError);
					// Set errors to the form.
					if (errors) formikHelpers.setErrors(errors);
				},
				onSuccess: () => {
					// Resetting formik.
					formikHelpers.resetForm();
					// Resetting forgot password query mutation.
					forgotPasswordMutation.reset();
					push("/auth/login");
				},
			}
		);
	};

	// form state
	const formState = useFormik<schemaType>({
		initialValues: { email: "" },
		validationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		return () => {
			if (forgotPasswordCancelRequestRef.current?.signal)
				forgotPasswordCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting}>
				<legend className="visually-hidden">Forgot Password form</legend>
				<div className="row gy-4">
					<div className="col-12">
						<EmailField
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
							required={isFieldRequired("email", validationSchema)}
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
								<svg className="bi w-22px h-22px" width="22" height="22">
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
