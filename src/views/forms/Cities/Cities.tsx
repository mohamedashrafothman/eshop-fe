"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import {
	ALL_KEY_ARRAY as ALL_CITIES_KEY_ARRAY,
	usePatchCityMutation,
	usePostCityMutation,
	useSingleCitiesQuery,
} from "hooks/useTanstackQuery/useCities";
import { useCountriesQuery } from "hooks/useTanstackQuery/useCountries";
import { useStatesQuery } from "hooks/useTanstackQuery/useStates";
import ICountry from "interfaces/Country.interface";
import IState from "interfaces/State.interface";
import { useTransitionRouter } from "next-view-transitions";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { apiFormErrorExtractor, isFieldRequired, pick } from "utils/helpers";
import SelectField from "views/components/SelectField";
import TextField from "views/components/TextField";
import formValidationSchema, { type schemaType, NAME_MAX_LENGTH } from "./schema";

const Cities = () => {
	const queryClient = useQueryClient();
	const { push } = useTransitionRouter();
	const { identifier = "" } = useParams<{ identifier: string }>();

	// state hooks
	const [selectedCountryIdState, setSelectedCountryIdState] = useState("");

	// server city hooks
	const postCityMutation = usePostCityMutation();
	const patchCityMutation = usePatchCityMutation();
	const { data: city, isLoading: isCityLoading } = useSingleCitiesQuery(identifier);
	const { data: { data: countries = [] } = {}, isLoading: isCountriesLoading } =
		useCountriesQuery({ pagination: false });
	const countryId = (city?.country as ICountry)?._id || (city?.country as string);
	const { data: { data: states = [] } = {}, isLoading: isStatesLoading } = useStatesQuery(
		{
			...((selectedCountryIdState || countryId) && {
				country: selectedCountryIdState || countryId,
			}),
			pagination: false,
		},
		{ enabled: Boolean(selectedCountryIdState || countryId) }
	);

	// ref hook
	const cityCancelRequestRef = useRef<AbortController | null>(null);

	// constants
	const isEditForm = Boolean(identifier);
	const validationSchema = formValidationSchema();
	const isCountriesHasNoItems = countries.length === 0;
	const isCountriesHasOneItem = countries.length === 1;
	const isStatesHasNoItems = states.length === 0;
	const isStatesHasOneItem = states.length === 1;

	// Handle form submission.
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (cityCancelRequestRef.current?.signal) cityCancelRequestRef.current?.abort();
		cityCancelRequestRef.current = new AbortController();

		// Call the city store/edit mutation.
		if (!isEditForm) {
			await postCityMutation.mutateAsync(
				{ data, signal: cityCancelRequestRef.current.signal },
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
						// Resetting city store query mutation.
						postCityMutation.reset();
						// Invalidate the cities query from the cache.
						await queryClient.invalidateQueries({
							queryKey: ALL_CITIES_KEY_ARRAY,
						});
						// Redirect to cities list
						push("/dashboard/addresses/cities");
					},
				}
			);
		} else {
			await patchCityMutation.mutateAsync(
				{
					variables: { id: identifier },
					data,
					signal: cityCancelRequestRef.current.signal,
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
						// Resetting city edit query mutation.
						patchCityMutation.reset();
						// Invalidate the cities query from the cache.
						await queryClient.invalidateQueries({
							queryKey: ALL_CITIES_KEY_ARRAY,
						});
						// Redirect to cities list
						push("/dashboard/addresses/cities");
					},
				}
			);
		}
	};

	// form city
	const formState = useFormik<schemaType>({
		enableReinitialize: isEditForm,
		initialValues: {
			name: "",
			country: isCountriesHasOneItem ? countries[0]?._id || "" : "",
			state: isStatesHasOneItem ? states[0]?._id || "" : "",
			...((isEditForm &&
				city && {
					...(pick(city, ["name"]) || {}),
					country: (city.country as ICountry)?._id || (city.country as string) || "",
					state: (city.state as IState)?._id || (city.state as string) || "",
				}) ||
				{}),
		},
		validationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		return () => {
			if (cityCancelRequestRef.current?.signal) cityCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} onReset={formState.handleReset} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting || isCityLoading}>
				<legend className="visually-hidden">{`${isEditForm ? "Edit City" : "Add City"} Form`}</legend>
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
						<SelectField
							name="country"
							id="countryField"
							value={countries
								?.filter((country) => formState.values?.country === country._id)
								?.map(({ _id: value, name: label }) => ({ value, label }))}
							onChange={(option: any) => {
								formState?.setFieldValue("country", option?.value || "");
								setSelectedCountryIdState(option?.value || "");
								formState.setFieldTouched("state", false);
								formState.setFieldValue("state", "");
							}}
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
							isDisabled={
								isCountriesLoading || isCountriesHasOneItem || isCountriesHasNoItems
							}
							label="Country"
							placeholder="Select Country"
							required={isFieldRequired("country", validationSchema)}
						/>
					</div>
					<div className="col-12">
						<SelectField
							name="state"
							id="stateField"
							value={states
								?.filter((state) => formState.values?.state === state._id)
								?.map(({ _id: value, name: label }) => ({ value, label }))}
							onChange={(option: any) =>
								formState?.setFieldValue("state", option?.value || "")
							}
							onBlur={() => formState.setFieldTouched("state", true)}
							options={states.map(({ _id: value, name: label }) => ({
								value,
								label,
							}))}
							isValid={Boolean(
								formState.values?.state &&
									!!formState.touched?.state &&
									!formState.errors?.state
							)}
							isInvalid={Boolean(
								!!formState.touched?.state && !!formState.errors?.state
							)}
							error={formState.errors?.state}
							isDisabled={isStatesLoading || isStatesHasOneItem || isStatesHasNoItems}
							label="State"
							placeholder="Select State"
							required={isFieldRequired("state", validationSchema)}
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

export default Cities;
