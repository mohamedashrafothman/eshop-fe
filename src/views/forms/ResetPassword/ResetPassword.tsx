"use client";

import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import { useParams } from "next/navigation";
import PasswordField from "views/components/PasswordField";
import resetPasswordValidationSchema, { type schemaType } from "./schema";

const ResetPassword = () => {
	const params = useParams();
	const { token: _token } = params as { token: string };

	// event handlers
	const onFormSubmitHandler = async (
		values: schemaType,
		actions: FormikHelpers<schemaType>
	) => {};

	// form state
	const formState = useFormik<schemaType>({
		initialValues: { password: "", passwordConfirmation: "" },
		validationSchema: resetPasswordValidationSchema,
		onSubmit: onFormSubmitHandler,
	});

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
									!!!formState.errors?.password
							)}
							isInvalid={Boolean(
								!!formState.touched?.password && !!formState.errors?.password
							)}
							error={formState.errors?.password}
							label="Password"
							required
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
