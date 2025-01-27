"use client";

import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import useMeQuery from "hooks/useMeQuery";
import usePatchUserMutation from "hooks/usePatchUserMutation";
import { useRef } from "react";
import { apiFormErrorExtractor } from "utils/helpers";
import PasswordField from "views/components/PasswordField";
import formValidationSchema, { type schemaType } from "./schema";

const AccountPassword = () => {
	const { data: me, isLoading: isMeLoading } = useMeQuery();

	// server state hooks
	const patchUserMutation = usePatchUserMutation();

	// ref hook
	const patchUserCancelRequestRef = useRef<AbortController | null>(null);

	// Handle form submission.
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (patchUserCancelRequestRef.current?.signal) patchUserCancelRequestRef.current?.abort();
		patchUserCancelRequestRef.current = new AbortController();

		// Call the forgot password mutation.
		await patchUserMutation.mutateAsync(
			{
				variables: { id: me?.data?.entities.data._id },
				data,
				signal: patchUserCancelRequestRef.current.signal,
			},
			{
				onError: (responseError) => {
					// Extract errors from the response error.
					const errors = apiFormErrorExtractor(responseError);
					// Set errors to the form.
					if (errors) formikHelpers.setErrors(errors);
				},
				onSuccess: async () => {
					// Resetting formik.
					formikHelpers.resetForm();
					// Resetting forgot password query mutation.
					patchUserMutation.reset();
				},
			}
		);
	};

	// form state
	const formState = useFormik<schemaType>({
		initialValues: {
			oldPassword: "",
			password: "",
			passwordConfirmation: "",
		},
		validationSchema: formValidationSchema,
		onSubmit: onFormSubmitHandler,
	});

	return (
		<form onSubmit={formState.handleSubmit} onReset={formState.handleReset} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting || isMeLoading}>
				<legend className="visually-hidden">account password form</legend>
				<div className="row gy-4">
					<div className="col-12">
						<PasswordField
							id="oldPasswordField"
							label="Old Password"
							name="oldPassword"
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							value={formState.values?.oldPassword || ""}
							isValid={Boolean(
								formState.values?.oldPassword &&
									!!formState.touched?.oldPassword &&
									!formState.errors?.oldPassword
							)}
							isInvalid={Boolean(
								!!formState.touched?.oldPassword && !!formState.errors?.oldPassword
							)}
							error={formState.errors?.oldPassword}
							required
							allowToggleVisibility
						/>
					</div>
					<div className="col-12">
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
								!!formState.touched?.password && !!formState.errors?.password
							)}
							error={formState.errors?.password}
							required
							allowToggleVisibility
							allowStrengthBar
						/>
					</div>
					<div className="col-12">
						<PasswordField
							id="passwordConfirmationField"
							label="Password Confirmation"
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
							required
							allowToggleVisibility
						/>
					</div>
					<div className="col-12 mt-5">
						<div className="row g-3">
							<div className="col-12 col-lg">
								<button
									type="submit"
									className="btn btn-primary border-primary-dark w-100 text-capitalize"
									disabled={!formState.isValid}>
									<strong>save</strong>
									{formState.isSubmitting && (
										<span
											className="spinner-border spinner-border-sm ms-2"
											role="status">
											<span className="visually-hidden">Loading...</span>
										</span>
									)}
								</button>
							</div>
							<div className="col-12 col-lg">
								<button
									type="reset"
									className="btn btn-outline-primary border-primary-dark w-100 text-capitalize">
									<strong>cancel</strong>
								</button>
							</div>
						</div>
					</div>
				</div>
			</fieldset>
		</form>
	);
};

export default AccountPassword;
