"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import { ME_KEY_ARRAY, useMeQuery, usePatchUserMutation } from "hooks/useTanstackQuery/useUsers";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { apiFormErrorExtractor, pick } from "utils/helpers";
import EmailField from "views/components/EmailField";
import TextField from "views/components/TextField";
import formValidationSchema, { type schemaType } from "./schema";

const AccountInformation = () => {
	const queryClient = useQueryClient();
	const { data: session } = useSession();
	const { data: user, isLoading: isUserLoading } = useMeQuery();

	// server state hooks
	const patchUserMutation = usePatchUserMutation();

	// ref hook
	const patchUserCancelRequestRef = useRef<AbortController | null>(null);

	// Handle form submission.
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Prevent empty id.
		if (!user?._id) return;

		// Abort any previous request, and create a new abort controller.
		if (patchUserCancelRequestRef.current?.signal) patchUserCancelRequestRef.current?.abort();
		patchUserCancelRequestRef.current = new AbortController();

		// Call the patch user mutation.
		await patchUserMutation.mutateAsync(
			{
				variables: { id: user._id },
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
				onSuccess: async (response) => {
					// Resetting formik.
					formikHelpers.resetForm();
					// Resetting patch user query mutation.
					patchUserMutation.reset();
					// Invalidate the me query from the cache.
					queryClient.invalidateQueries({ queryKey: ME_KEY_ARRAY, exact: true });
					// Extract user, and tokens data from the response.
					const user = response?.data?.entities?.data || {};
					// Update next-auth session user data.
					if (user)
						await signIn("credentials", {
							...(session?.accessToken && {
								accessToken: JSON.stringify(session.accessToken),
							}),
							...(session?.refreshToken && {
								refreshToken: JSON.stringify(session.refreshToken),
							}),
							...(session?.tokenType && {
								tokenType: JSON.stringify(session.tokenType),
							}),
							...(user && {
								user: JSON.stringify(
									pick(user, ["_id", "name", "role", "emailVerified"])
								),
							}),
							redirect: false,
						});
				},
			}
		);
	};

	// form state
	const formState = useFormik<schemaType>({
		enableReinitialize: true,
		initialValues: {
			name: "",
			email: "",
			...((user && pick(user, ["name", "email"])) || {}),
		},
		validationSchema: formValidationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		return () => {
			if (patchUserCancelRequestRef.current?.signal)
				patchUserCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} onReset={formState.handleReset} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting || isUserLoading}>
				<legend className="visually-hidden">account information form</legend>
				<div className="row gy-4">
					<div className="col-12">
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
					<div className="col-12">
						<EmailField
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
							allowVerificationStatus
							required
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
									disabled={!formState.dirty}
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

export default AccountInformation;
