"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import {
	ALL_KEY_ARRAY as ALL_USERS_KEY_ARRAY,
	usePatchUserMutation,
	usePostUserMutation,
	useSingleUsersQuery,
} from "hooks/useTanstackQuery/useUsers";
import { useTransitionRouter } from "next-view-transitions";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { apiFormErrorExtractor, pick } from "utils/helpers";
import vars from "utils/vars";
import CheckboxField from "views/components/CheckboxField";
import EmailField from "views/components/EmailField";
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
						await queryClient.invalidateQueries({
							queryKey: ALL_USERS_KEY_ARRAY,
						});
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
						await queryClient.invalidateQueries({
							queryKey: ALL_USERS_KEY_ARRAY,
						});
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
			emailVerified: false,
			...((isEditForm && user && pick(user, ["name", "email", "role", "emailVerified"])) ||
				{}),
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
				<legend className="visually-hidden">{`${isEditForm ? "Edit User" : "Add User"} Form`}</legend>
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
							required
						/>
					</div>
					<div className="col-12">
						<SelectField
							name="role"
							id="roleField"
							value={[
								...Object.values(vars.roles).filter(
									(item) => item !== vars.roles.superAdmin
								),
							]
								?.filter((role) => formState.values?.role === role)
								?.map((role) => ({ value: role, label: role }))}
							onChange={(option: any) =>
								formState.setFieldValue("role", option?.value || "")
							}
							onBlur={() => formState.setFieldTouched("role", true)}
							options={[
								...Object.values(vars.roles).filter(
									(item) => item !== vars.roles.superAdmin
								),
							].map((item) => ({ value: item, label: item }))}
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
					<div className="col-12">
						<CheckboxField
							onChange={({ target: { checked } }) => {
								formState.setFieldValue("emailVerified", checked);
							}}
							onBlur={formState.handleBlur}
							value="1"
							name="emailVerified"
							id="emailVerifiedMeField"
							label="Mark Email as Verified!"
							checked={formState.values?.emailVerified || undefined}
							isSwitch
						/>
					</div>
					<div className="col-12 mt-5">
						<div className="row g-3">
							<div className="col-12 col-lg">
								<button
									type="submit"
									className="btn btn-primary border-primary-dark w-100 text-capitalize"
									disabled={!formState.isValid}>
									<strong>{isEditForm ? "update" : "create"}</strong>
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

export default Users;
