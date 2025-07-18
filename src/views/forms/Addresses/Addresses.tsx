"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import {
	ALL_KEY_ARRAY as ALL_ADDRESSES_KEY_ARRAY,
	usePatchAddressMutation,
	usePostAddressMutation,
	useSingleAddressesQuery,
} from "hooks/useTanstackQuery/useAddresses";
import { useCitiesQuery } from "hooks/useTanstackQuery/useCities";
import { useCountriesQuery } from "hooks/useTanstackQuery/useCountries";
import { useStatesQuery } from "hooks/useTanstackQuery/useStates";
import { useMeQuery } from "hooks/useTanstackQuery/useUsers";
import { useTransitionRouter } from "next-view-transitions";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { apiFormErrorExtractor, isFieldRequired, pick } from "utils/helpers";
import SelectField from "views/components/SelectField";
import TextField from "views/components/TextField";
import formValidationSchema, { type schemaType, NAME_MAX_LENGTH } from "./schema";

const Addresses = () => {
	const queryClient = useQueryClient();
	const { push } = useTransitionRouter();
	const { identifier = "" } = useParams<{ identifier: string }>();

	// state hooks
	const [selectedCountryIdState, setSelectedCountryIdState] = useState("");
	const [selectedStateIdState, setSelectedStateIdState] = useState("");

	// server state hooks
	const { data: user, isLoading: isUserLoading } = useMeQuery();
	const { data: { data: countries = [] } = {}, isLoading: isCountriesLoading } =
		useCountriesQuery({ pagination: false });
	const { data: { data: states = [] } = {}, isLoading: isStatesLoading } = useStatesQuery(
		{ ...(selectedCountryIdState && { country: selectedCountryIdState }), pagination: false },
		{ enabled: Boolean(selectedCountryIdState) }
	);
	const { data: { data: cities = [] } = {}, isLoading: isCitiesLoading } = useCitiesQuery(
		{
			...(selectedCountryIdState && { country: selectedCountryIdState }),
			...(selectedStateIdState && { state: selectedStateIdState }),
			pagination: false,
		},
		{ enabled: Boolean(selectedStateIdState && selectedCountryIdState) }
	);
	const postAddressMutation = usePostAddressMutation();
	const patchAddressMutation = usePatchAddressMutation();
	const { data: address, isLoading: isAddressesLoading } = useSingleAddressesQuery(identifier);

	// ref hook
	const addressCancelRequestRef = useRef<AbortController | null>(null);

	// constants
	const isEditForm = Boolean(identifier);
	const validationSchema = formValidationSchema();
	const isStatesHasNoItems = states.length === 0;
	const isCitiesHasNoItems = cities.length === 0;
	const editAddressData = {
		...(isEditForm
			? {
					...((address &&
						pick(address, [
							"name",
							"street",
							"building",
							"floor",
							"apartment",
							"area",
							"zip",
						])) ||
						{}),
					country:
						typeof address?.country !== "string"
							? address?.country?._id
							: address?.country || "",
					state:
						typeof address?.state !== "string"
							? address?.state?._id
							: address?.state || "",
					city:
						typeof address?.city !== "string"
							? address?.city?._id
							: address?.city || "",
				}
			: {}),
	};

	// Handle form submission.
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (addressCancelRequestRef.current?.signal) addressCancelRequestRef.current?.abort();
		addressCancelRequestRef.current = new AbortController();

		// Call the address store/edit mutation.
		if (!isEditForm) {
			await postAddressMutation.mutateAsync(
				{ data, signal: addressCancelRequestRef.current.signal },
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
						// Resetting address store query mutation.
						postAddressMutation.reset();
						// Invalidate the address query from the cache.
						await queryClient.invalidateQueries({
							queryKey: ALL_ADDRESSES_KEY_ARRAY,
						});
						// Redirect to address list
						push("/dashboard/addresses");
					},
				}
			);
		} else {
			await patchAddressMutation.mutateAsync(
				{
					variables: { id: identifier },
					data,
					signal: addressCancelRequestRef.current.signal,
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
						// Resetting address edit query mutation.
						patchAddressMutation.reset();
						// Invalidate the address query from the cache.
						await queryClient.invalidateQueries({
							queryKey: ALL_ADDRESSES_KEY_ARRAY,
						});
						// Redirect to address list
						push("/dashboard/addresses");
					},
				}
			);
		}
	};

	// form state
	const formState = useFormik<schemaType>({
		enableReinitialize: true,
		initialValues: {
			name: "",
			street: "",
			building: 0,
			floor: 0,
			apartment: "",
			area: "",
			country: "",
			state: "",
			city: "",
			user: user?._id || "",
			...editAddressData,
		},
		validationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		if (editAddressData?.country) setSelectedCountryIdState(editAddressData?.country);
	}, [editAddressData?.country]);

	useEffect(() => {
		if (editAddressData?.state) setSelectedStateIdState(editAddressData?.state);
	}, [editAddressData?.state]);

	useEffect(() => {
		return () => {
			if (addressCancelRequestRef.current?.signal) addressCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} onReset={formState.handleReset} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting || isAddressesLoading || isUserLoading}>
				<legend className="visually-hidden">{`${isEditForm ? "Edit Address" : "Add Address"} Form`}</legend>
				<div className="row gy-4">
					<div className="col-12 col-xl-6">
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
							maxLength={NAME_MAX_LENGTH}
							required={isFieldRequired("name", validationSchema)}
						/>
					</div>
					<div className="col-12 col-xl-6">
						<TextField
							type="text"
							name="street"
							id="streetField"
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							value={formState.values?.street || ""}
							isValid={Boolean(
								formState.values?.street &&
									!!formState.touched?.street &&
									!formState.errors?.street
							)}
							isInvalid={Boolean(
								!!formState.touched?.street && !!formState.errors?.street
							)}
							error={formState.errors?.street}
							label="Street"
							required={isFieldRequired("street", validationSchema)}
						/>
					</div>
					<div className="col-12 col-xl-6">
						<TextField
							type="number"
							name="building"
							id="buildingField"
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							value={formState.values?.building || ""}
							isValid={Boolean(
								formState.values?.building &&
									!!formState.touched?.building &&
									!formState.errors?.building
							)}
							isInvalid={Boolean(
								!!formState.touched?.building && !!formState.errors?.building
							)}
							error={formState.errors?.building}
							label="Building"
							required={isFieldRequired("building", validationSchema)}
						/>
					</div>
					<div className="col-12 col-xl-6">
						<TextField
							type="number"
							name="floor"
							id="floorField"
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							value={formState.values?.floor || ""}
							isValid={Boolean(
								formState.values?.floor &&
									!!formState.touched?.floor &&
									!formState.errors?.floor
							)}
							isInvalid={Boolean(
								!!formState.touched?.floor && !!formState.errors?.floor
							)}
							error={formState.errors?.floor}
							label="Floor"
							required={isFieldRequired("floor", validationSchema)}
						/>
					</div>
					<div className="col-12 col-xl-6">
						<TextField
							type="text"
							name="apartment"
							id="apartmentField"
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							value={formState.values?.apartment || ""}
							isValid={Boolean(
								formState.values?.apartment &&
									!!formState.touched?.apartment &&
									!formState.errors?.apartment
							)}
							isInvalid={Boolean(
								!!formState.touched?.apartment && !!formState.errors?.apartment
							)}
							error={formState.errors?.apartment}
							label="Apartment"
							required={isFieldRequired("apartment", validationSchema)}
						/>
					</div>
					<div className="col-12 col-xl-6">
						<TextField
							type="text"
							name="area"
							id="areaField"
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							value={formState.values?.area || ""}
							isValid={Boolean(
								formState.values?.area &&
									!!formState.touched?.area &&
									!formState.errors?.area
							)}
							isInvalid={Boolean(
								!!formState.touched?.area && !!formState.errors?.area
							)}
							error={formState.errors?.area}
							label="Area"
							required={isFieldRequired("area", validationSchema)}
						/>
					</div>
					<div className="col-12 col-xl-6">
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
								formState.setFieldTouched("city", false);
								formState.setFieldValue("state", "");
								formState.setFieldValue("city", "");
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
							placeholder="Select Country"
							label="Country"
							isDisabled={isCountriesLoading}
							required={isFieldRequired("country", validationSchema)}
						/>
					</div>
					<div className="col-12 col-xl-6">
						<SelectField
							name="state"
							id="stateField"
							value={states
								?.filter((state) => formState.values?.state === state._id)
								?.map(({ _id: value, name: label }) => ({ value, label }))}
							onChange={(option: any) => {
								formState?.setFieldValue("state", option?.value || "");
								setSelectedStateIdState(option?.values || "");
								formState.setFieldTouched("city", false);
								formState.setFieldValue("city", "");
							}}
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
							placeholder="Select State"
							label="State"
							isDisabled={isStatesLoading || isStatesHasNoItems}
							required={isFieldRequired("state", validationSchema)}
						/>
					</div>
					<div className="col-12 col-xl-6">
						<SelectField
							name="city"
							id="cityField"
							value={cities
								?.filter((city) => formState.values?.city === city._id)
								?.map(({ _id: value, name: label }) => ({ value, label }))}
							onChange={(option: any) =>
								formState?.setFieldValue("city", option?.value || "")
							}
							onBlur={() => formState.setFieldTouched("city", true)}
							options={cities.map(({ _id: value, name: label }) => ({
								value,
								label,
							}))}
							isValid={Boolean(
								formState.values?.city &&
									!!formState.touched?.city &&
									!formState.errors?.city
							)}
							isInvalid={Boolean(
								!!formState.touched?.city && !!formState.errors?.city
							)}
							error={formState.errors?.city}
							placeholder="Select City"
							label="City"
							isDisabled={isCitiesLoading || isCitiesHasNoItems}
							required={isFieldRequired("city", validationSchema)}
						/>
					</div>
					<div className="col-12 col-xl-6">
						<TextField
							type="text"
							name="zip"
							id="zipField"
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							value={formState.values?.zip || ""}
							isValid={Boolean(
								formState.values?.zip &&
									!!formState.touched?.zip &&
									!formState.errors?.zip
							)}
							isInvalid={Boolean(!!formState.touched?.zip && !!formState.errors?.zip)}
							error={formState.errors?.zip}
							label="Zip"
							required={isFieldRequired("zip", validationSchema)}
						/>
					</div>
					<div className="col-12 mt-0"></div>
					<div className="col-12 col-xl-6 mt-5">
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

export default Addresses;
