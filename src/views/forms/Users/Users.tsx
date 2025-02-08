"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import usePatchUserMutation from "hooks/usePatchUserMutation";
import usePostUserMutation from "hooks/usePostUserMutation";
import useSingleUsersQuery from "hooks/useSingleUsersQuery";
import { KEY_ARRAY as USERS_KEY_QUERY } from "hooks/useUsersInfinityQuery";
import { useTransitionRouter } from "next-view-transitions";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { apiFormErrorExtractor, pick } from "utils/helpers";
import vars from "utils/vars";
import SelectField from "views/components/SelectField";
import TextField from "views/components/TextField";
import formValidationSchema, { type schemaType } from "./schema";

const Users = () => {
	const queryClient = useQueryClient();
	const { push } = useTransitionRouter();
	const { identifier = "" } = useParams<{ identifier: string }>();

	// server state hooks
	const postUserMutation = usePostUserMutation();
	const patchUserMutation = usePatchUserMutation();
	const { data: user, isLoading: isUserLoading } = useSingleUsersQuery(identifier);

	// ref hook
	const userCancelRequestRef = useRef<AbortController | null>(null);

	// constants
	const isEditForm = Boolean(identifier);

	// Handle form submission.
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (userCancelRequestRef.current?.signal) userCancelRequestRef.current?.abort();
		userCancelRequestRef.current = new AbortController();

		// Call the user store/edit mutation.
		if (!isEditForm) {
			await postUserMutation.mutateAsync(
				{ data, signal: userCancelRequestRef.current.signal },
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
						// Resetting user store query mutation.
						postUserMutation.reset();
						// Invalidate the users query from the cache.
						await queryClient.invalidateQueries({ queryKey: USERS_KEY_QUERY });
						// Redirect to users list
						push("/dashboard/users");
					},
				}
			);
		} else {
			await patchUserMutation.mutateAsync(
				{
					variables: { id: identifier },
					data,
					signal: userCancelRequestRef.current.signal,
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
						// Resetting user edit query mutation.
						patchUserMutation.reset();
						// Invalidate the users query from the cache.
						await queryClient.invalidateQueries({ queryKey: USERS_KEY_QUERY });
						// Redirect to users list
						push("/dashboard/users");
					},
				}
			);
		}
	};

	// form state
	const formState = useFormik<schemaType>({
		enableReinitialize: isEditForm,
		initialValues: {
			name: "",
			email: "",
			role: "",
			...((isEditForm && user && pick(user, ["name", "email", "role"])) || {}),
		},
		validationSchema: formValidationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		return () => {
			if (userCancelRequestRef.current?.signal) userCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} onReset={formState.handleReset} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting || isUserLoading}>
				<legend className="visually-hidden">add new user form</legend>
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
					<div className="col-12">
						<SelectField
							name="role"
							id="roleField"
							value={formState.values?.role}
							options={[
								...Object.values(vars.roles).filter(
									(item) => item !== vars.roles.superAdmin
								),
							].map((item) => ({ value: item, text: item }))}
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							isValid={Boolean(
								formState.values?.role &&
									!!formState.touched?.role &&
									!formState.errors?.role
							)}
							isInvalid={Boolean(
								!!formState.touched?.role && !!formState.errors?.role
							)}
							error={formState.errors?.role}
							label="Role"
							placeholder="Select Role"
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
									<strong>create</strong>
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

export default Users;
