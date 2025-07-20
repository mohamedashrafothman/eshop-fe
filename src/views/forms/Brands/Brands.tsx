"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import {
	ALL_KEY_ARRAY as ALL_BRANDS_KEY_ARRAY,
	usePatchBrandMutation,
	usePostBrandMutation,
	useSingleBrandsQuery,
} from "hooks/useTanstackQuery/useBrands";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { apiFormErrorExtractor, isFieldRequired, objectToFormData, pick } from "utils/helpers";
import vars from "utils/vars";
import FileField from "views/components/FileField";
import TextField from "views/components/TextField";
import TextareaField from "views/components/TextareaField";
import formValidationSchema, {
	type schemaType,
	DESCRIPTION_MAX_LENGTH,
	NAME_MAX_LENGTH,
} from "./schema";

const Brands = () => {
	const queryClient = useQueryClient();
	const { push } = useRouter();
	const { identifier = "" } = useParams<{ identifier: string }>();

	// server state hooks
	const postBrandMutation = usePostBrandMutation();
	const patchBrandMutation = usePatchBrandMutation();
	const { data: brand, isLoading: isBrandLoading } = useSingleBrandsQuery(identifier);

	// ref hook
	const brandCancelRequestRef = useRef<AbortController | null>(null);

	// constants
	const isEditForm = Boolean(identifier);
	const validationSchema = formValidationSchema({ isEdit: isEditForm });

	// Handle form submission.
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (brandCancelRequestRef.current?.signal) brandCancelRequestRef.current?.abort();
		brandCancelRequestRef.current = new AbortController();

		// Call the brand store/edit mutation.
		if (!isEditForm) {
			await postBrandMutation.mutateAsync(
				{
					data: objectToFormData(data),
					signal: brandCancelRequestRef.current.signal,
					headers: { "Content-Type": "multipart/form-data" },
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
						// Resetting brand store query mutation.
						postBrandMutation.reset();
						// Invalidate the brands query from the cache.
						await queryClient.invalidateQueries({
							queryKey: ALL_BRANDS_KEY_ARRAY,
						});
						// Redirect to brands list
						push("/dashboard/brands");
					},
				}
			);
		} else {
			await patchBrandMutation.mutateAsync(
				{
					variables: { id: identifier },
					data: objectToFormData(data),
					signal: brandCancelRequestRef.current.signal,
					headers: { "Content-Type": "multipart/form-data" },
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
						// Resetting brand edit query mutation.
						patchBrandMutation.reset();
						// Invalidate the brands query from the cache.
						await queryClient.invalidateQueries({
							queryKey: ALL_BRANDS_KEY_ARRAY,
						});
						// Redirect to brands list
						push("/dashboard/brands");
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
			description: "",
			...(isEditForm
				? { ...((brand && pick(brand, ["name", "description"])) || {}) }
				: { logo: "" }),
		},
		validationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		return () => {
			if (brandCancelRequestRef.current?.signal) brandCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} onReset={formState.handleReset} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting || isBrandLoading}>
				<legend className="visually-hidden">{`${isEditForm ? "Edit Brand" : "Add Brand"} Form`}</legend>
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
						<TextareaField
							name="description"
							id="descriptionField"
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							value={formState.values?.description || ""}
							isValid={Boolean(
								formState.values?.description &&
									!!formState.touched?.description &&
									!formState.errors?.description
							)}
							isInvalid={Boolean(
								!!formState.touched?.description && !!formState.errors?.description
							)}
							error={formState.errors?.description}
							label="Description"
							maxLength={DESCRIPTION_MAX_LENGTH}
							required={isFieldRequired("description", validationSchema)}
						/>
					</div>
					<div className="col-12">
						<FileField
							name="logo"
							id="logoField"
							onChange={({ target: { name, files } }) => {
								formState.setFieldTouched(name, true);
								formState?.setFieldValue(name, files?.[0] || "");
							}}
							onBlur={formState.handleBlur}
							isValid={Boolean(
								formState.values?.logo &&
									!!formState.touched?.logo &&
									!formState.errors?.logo
							)}
							isInvalid={Boolean(
								!!formState.touched?.logo && !!formState.errors?.logo
							)}
							error={formState.errors?.logo as string}
							accept={vars.app.imagesFileInputAccepts.join(",")}
							helpText={`Allowed file types: png, jpg, jpeg. Max file size: ${vars.app.fileMaxSizeInMB}MB.`}
							label="Logo Image"
							required={isFieldRequired("logo", validationSchema)}
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

export default Brands;
