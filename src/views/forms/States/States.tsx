"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import { useCountriesQuery } from "hooks/useTanstackQuery/useCountries";
import {
	ALL_KEY_ARRAY as ALL_STATES_KEY_ARRAY,
	usePatchStateMutation,
	usePostStateMutation,
	useSingleStatesQuery,
} from "hooks/useTanstackQuery/useStates";
import ICountry from "interfaces/Country.interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { apiFormErrorExtractor, isFieldRequired, pick } from "utils/helpers";
import SelectField from "views/components/SelectField";
import TextField from "views/components/TextField";
import formValidationSchema, { type schemaType, CODE_MAX_LENGTH, NAME_MAX_LENGTH } from "./schema";

const States = () => {
	const queryClient = useQueryClient();
	const { push } = useRouter();
	const { identifier = "" } = useParams<{ identifier: string }>();

	// server state hooks
	const postStateMutation = usePostStateMutation();
	const patchStateMutation = usePatchStateMutation();
	const { data: state, isLoading: isStateLoading } = useSingleStatesQuery(identifier);
	const { data: { data: countries = [] } = {}, isLoading: isCountriesLoading } =
		useCountriesQuery({
			pagination: false,
		});

	// ref hook
	const stateCancelRequestRef = useRef<AbortController | null>(null);

	// constants
	const isEditForm = Boolean(identifier);
	const validationSchema = formValidationSchema();
	const isCountriesHasOneItem = countries.length === 1;

	// Handle form submission.
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (stateCancelRequestRef.current?.signal) stateCancelRequestRef.current?.abort();
		stateCancelRequestRef.current = new AbortController();

		// Call the state store/edit mutation.
		if (!isEditForm) {
			await postStateMutation.mutateAsync(
				{ data, signal: stateCancelRequestRef.current.signal },
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
						// Resetting state store query mutation.
						postStateMutation.reset();
						// Invalidate the states query from the cache.
						await queryClient.invalidateQueries({
							queryKey: ALL_STATES_KEY_ARRAY,
						});
						// Redirect to states list
						push("/dashboard/addresses/states");
					},
				}
			);
		} else {
			await patchStateMutation.mutateAsync(
				{
					variables: { id: identifier },
					data,
					signal: stateCancelRequestRef.current.signal,
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
						// Resetting state edit query mutation.
						patchStateMutation.reset();
						// Invalidate the states query from the cache.
						await queryClient.invalidateQueries({
							queryKey: ALL_STATES_KEY_ARRAY,
						});
						// Redirect to states list
						push("/dashboard/addresses/states");
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
			code: "",
			country: isCountriesHasOneItem ? countries[0]?._id || "" : "",
			...((isEditForm &&
				state && {
					...(pick(state, ["name", "code"]) || {}),
					country: (state.country as ICountry)?._id || (state.country as string) || "",
				}) ||
				{}),
		},
		validationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		return () => {
			if (stateCancelRequestRef.current?.signal) stateCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} onReset={formState.handleReset} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting || isStateLoading}>
				<legend className="visually-hidden">{`${isEditForm ? "Edit State" : "Add State"} Form`}</legend>
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
							maxLength={NAME_MAX_LENGTH}
							required={isFieldRequired("name", validationSchema)}
						/>
					</div>
					<div className="col-12">
						<TextField
							type="text"
							name="code"
							id="codeField"
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							value={formState.values?.code || ""}
							isValid={Boolean(
								formState.values?.code &&
									!!formState.touched?.code &&
									!formState.errors?.code
							)}
							isInvalid={Boolean(
								!!formState.touched?.code && !!formState.errors?.code
							)}
							error={formState.errors?.code}
							label="Code"
							maxLength={CODE_MAX_LENGTH}
							required={isFieldRequired("code", validationSchema)}
						/>
					</div>
					<div className="col-12">
						<SelectField
							name="country"
							id="countryField"
							value={countries
								?.filter((country) => formState.values?.country === country._id)
								?.map(({ _id: value, name: label }) => ({ value, label }))}
							onChange={(option: any) =>
								formState?.setFieldValue("country", option?.value || "")
							}
							onBlur={() => formState.setFieldTouched("country", true)}
							options={countries.map(({ _id: value, name: label }) => ({
								value,
								label,
							}))}
							isValid={Boolean(
								formState.values?.country &&
									!!formState.touched?.country &&
									!formState.errors?.country
							)}
							isInvalid={Boolean(
								!!formState.touched?.country && !!formState.errors?.country
							)}
							error={formState.errors?.country}
							isDisabled={isCountriesLoading || isCountriesHasOneItem}
							label="Country"
							placeholder="Select Country"
							required={isFieldRequired("country", validationSchema)}
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

export default States;
