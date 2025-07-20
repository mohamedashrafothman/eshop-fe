"use client";

import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import { useResetPasswordMutation } from "hooks/useTanstackQuery/useAuth";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { apiFormErrorExtractor, isFieldRequired } from "utils/helpers";
import PasswordField from "views/components/PasswordField";
import formValidationSchema, { type schemaType } from "./schema";

const ResetPassword = () => {
	const { push } = useRouter();
	const params = useParams<{ token: string }>();
	const { token } = params;

	// server state hooks
	const resetPasswordMutation = useResetPasswordMutation();

	// ref hook
	const resetPasswordCancelRequestRef = useRef<AbortController | null>(null);

	// constants
	const validationSchema = formValidationSchema();

	// event handlers
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (resetPasswordCancelRequestRef.current?.signal)
			resetPasswordCancelRequestRef.current?.abort();
		resetPasswordCancelRequestRef.current = new AbortController();

		// Call the reset password mutation.
		await resetPasswordMutation.mutateAsync(
			{ variables: { token }, data, signal: resetPasswordCancelRequestRef.current.signal },
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
					// Resetting reset password query mutation.
					resetPasswordMutation.reset();
					push("/auth/login");
				},
			}
		);
	};

	// form state
	const formState = useFormik<schemaType>({
		initialValues: { password: "", passwordConfirmation: "" },
		validationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		return () => {
			if (resetPasswordCancelRequestRef.current?.signal)
				resetPasswordCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting}>
				<legend className="visually-hidden">Reset Password form</legend>
				<div className="row gy-4">
					<div className="col-12">
						<PasswordField
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							value={formState.values?.password || ""}
							isValid={Boolean(
								formState.values?.password &&
									!!formState.touched?.password &&
									!formState.errors?.password
							)}
							isInvalid={Boolean(
								!!formState.touched?.password && !!formState.errors?.password
							)}
							error={formState.errors?.password}
							label="Password"
							required={isFieldRequired("password", validationSchema)}
							allowToggleVisibility
						/>
					</div>
					<div className="col-12">
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
							required={isFieldRequired("passwordConfirmation", validationSchema)}
							allowToggleVisibility
						/>
					</div>
					<div className="col-12 mt-5">
						<div className="vstack gap-3">
							<button
								type="submit"
								className="btn btn-primary border-primary-dark w-100 text-capitalize"
								disabled={!formState.isValid}>
								<strong>Reset Password</strong>
								{formState.isSubmitting && (
									<span
										className="spinner-border spinner-border-sm ms-2"
										role="status">
										<span className="visually-hidden">Loading...</span>
									</span>
								)}
							</button>
						</div>
					</div>
				</div>
			</fieldset>
		</form>
	);
};

export default ResetPassword;
