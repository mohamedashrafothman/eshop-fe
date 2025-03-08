"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import { KEY_ARRAY as COUNTRIES_KEY_QUERY } from "hooks/useCountriesInfinityQuery";
import usePatchCountryMutation from "hooks/usePatchCountryMutation";
import usePostCountryMutation from "hooks/usePostCountryMutation";
import useSingleCountriesQuery from "hooks/useSingleCountriesQuery";
import { useTransitionRouter } from "next-view-transitions";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { apiFormErrorExtractor, pick } from "utils/helpers";
import TextField from "views/components/TextField";
import formValidationSchema, { type schemaType } from "./schema";

const Countries = () => {
	const queryClient = useQueryClient();
	const { push } = useTransitionRouter();
	const { identifier = "" } = useParams<{ identifier: string }>();

	// server state hooks
	const postCountryMutation = usePostCountryMutation();
	const patchCountryMutation = usePatchCountryMutation();
	const { data: country, isLoading: isCountryLoading } = useSingleCountriesQuery(identifier);

	// ref hook
	const countryCancelRequestRef = useRef<AbortController | null>(null);

	// constants
	const isEditForm = Boolean(identifier);

	// Handle form submission.
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (countryCancelRequestRef.current?.signal) countryCancelRequestRef.current?.abort();
		countryCancelRequestRef.current = new AbortController();

		// Call the country store/edit mutation.
		if (!isEditForm) {
			await postCountryMutation.mutateAsync(
				{ data, signal: countryCancelRequestRef.current.signal },
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
						// Resetting country store query mutation.
						postCountryMutation.reset();
						// Invalidate the countries query from the cache.
						await queryClient.invalidateQueries({ queryKey: COUNTRIES_KEY_QUERY });
						// Redirect to countries list
						push("/dashboard/countries");
					},
				}
			);
		} else {
			await patchCountryMutation.mutateAsync(
				{
					variables: { id: identifier },
					data,
					signal: countryCancelRequestRef.current.signal,
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
						// Resetting country edit query mutation.
						patchCountryMutation.reset();
						// Invalidate the countries query from the cache.
						await queryClient.invalidateQueries({ queryKey: COUNTRIES_KEY_QUERY });
						// Redirect to countries list
						push("/dashboard/countries");
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
			...((isEditForm && country && pick(country, ["name", "code"])) || {}),
		},
		validationSchema: formValidationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		return () => {
			if (countryCancelRequestRef.current?.signal) countryCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} onReset={formState.handleReset} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting || isCountryLoading}>
				<legend className="visually-hidden">{`${isEditForm ? "Edit Country" : "Add Country"} Form`}</legend>
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

export default Countries;
