"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import useMeQuery, { KEY_ARRAY as ME_KEY_QUERY } from "hooks/useMeQuery";
import usePatchUserMutation from "hooks/usePatchUserMutation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { apiFormErrorExtractor } from "utils/helpers";
import TextField from "views/components/TextField";
import formValidationSchema, { type schemaType } from "./schema";

const AccountInformation = () => {
	const queryClient = useQueryClient();
	const { data: session } = useSession();
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
		// Prevent empty id.
		if (!me?.data?.entities.data._id) return;

		// Abort any previous request, and create a new abort controller.
		if (patchUserCancelRequestRef.current?.signal) patchUserCancelRequestRef.current?.abort();
		patchUserCancelRequestRef.current = new AbortController();

		// Call the forgot password mutation.
		await patchUserMutation.mutateAsync(
			{
				variables: { id: me.data.entities.data._id },
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
					// Resetting forgot password query mutation.
					patchUserMutation.reset();
					// Remove the me query from the cache.
					queryClient.removeQueries({ queryKey: ME_KEY_QUERY, exact: true });
					// Update next-auth session user data.
					await signIn("credentials", {
						...(session || {}),
						user: JSON.stringify(response?.data?.entities?.data),
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
			name: me?.data?.entities.data.name || "",
			email: me?.data?.entities.data.email || "",
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
			<fieldset disabled={formState.isSubmitting || isMeLoading}>
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

export default AccountInformation;
