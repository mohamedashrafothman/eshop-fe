"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import {
	ALL_KEY_ARRAY as ALL_CATEGORIES_KEY_ARRAY,
	useCategoriesQuery,
	usePatchCategoryMutation,
	usePostCategoryMutation,
	useSingleCategoriesQuery,
} from "hooks/useTanstackQuery/useCategories";
import { useTransitionRouter } from "next-view-transitions";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { apiFormErrorExtractor, isFieldRequired, objectToFormData, pick } from "utils/helpers";
import vars from "utils/vars";
import FileField from "views/components/FileField";
import SelectField from "views/components/SelectField";
import TextareaField from "views/components/TextareaField";
import TextField from "views/components/TextField";
import formValidationSchema, {
	type schemaType,
	DESCRIPTION_MAX_LENGTH,
	NAME_MAX_LENGTH,
} from "./schema";

const Categories = () => {
	const queryClient = useQueryClient();
	const { push } = useTransitionRouter();
	const { identifier = "" } = useParams<{ identifier: string }>();

	// server state hooks
	const postCategoryMutation = usePostCategoryMutation();
	const patchCategoryMutation = usePatchCategoryMutation();
	const { data: category, isLoading: isCategoryLoading } = useSingleCategoriesQuery(identifier);
	const { data: { data: categories = [] } = {}, isLoading: isCategoriesLoading } =
		useCategoriesQuery({ pagination: false });

	// ref hook
	const categoryCancelRequestRef = useRef<AbortController | null>(null);

	// constants
	const isEditForm = Boolean(identifier);
	const validationSchema = formValidationSchema({ isEdit: isEditForm });
	const editCategoryParentIds = [
		...(category?.parent?.map((singleCategoryParent) =>
			typeof singleCategoryParent !== "string"
				? singleCategoryParent?._id
				: singleCategoryParent || ""
		) || []),
	];

	// Handle form submission.
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (categoryCancelRequestRef.current?.signal) categoryCancelRequestRef.current?.abort();
		categoryCancelRequestRef.current = new AbortController();

		// Call the category store/edit mutation.
		if (!isEditForm) {
			await postCategoryMutation.mutateAsync(
				{
					data: objectToFormData(data),
					signal: categoryCancelRequestRef.current.signal,
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
						// Resetting category store query mutation.
						postCategoryMutation.reset();
						// Invalidate the categories query from the cache.
						await queryClient.invalidateQueries({ queryKey: ALL_CATEGORIES_KEY_ARRAY });
						// Redirect to categories list
						push("/dashboard/categories");
					},
				}
			);
		} else {
			await patchCategoryMutation.mutateAsync(
				{
					variables: { id: identifier },
					data: objectToFormData(data),
					signal: categoryCancelRequestRef.current.signal,
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
						// Resetting category edit query mutation.
						patchCategoryMutation.reset();
						// Invalidate the categories query from the cache.
						await queryClient.invalidateQueries({ queryKey: ALL_CATEGORIES_KEY_ARRAY });
						// Redirect to categories list
						push("/dashboard/categories");
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
				? {
						...((category && pick(category, ["name", "description"])) || {}),
						...(editCategoryParentIds.length ? { parent: editCategoryParentIds } : {}),
					}
				: { icon: "" }),
		},
		validationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		return () => {
			if (categoryCancelRequestRef.current?.signal) categoryCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} onReset={formState.handleReset} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting || isCategoryLoading}>
				<legend className="visually-hidden">{`${isEditForm ? "Edit Category" : "Add Category"} Form`}</legend>
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
						<SelectField
							name="parent"
							id="parentField"
							value={categories
								?.filter((category) =>
									formState.values?.parent?.includes(category._id)
								)
								?.map(({ _id: value, name: label }) => ({ value, label }))}
							onBlur={() => formState.setFieldTouched("parent", true)}
							onChange={(options) =>
								formState?.setFieldValue(
									"parent",
									(Array.isArray(options) &&
										options?.map(({ value }) => value)) ||
										[]
								)
							}
							options={categories.map(({ _id: value, name: label }) => ({
								value,
								label,
							}))}
							isValid={Boolean(
								formState.values?.parent &&
									!!formState.touched?.parent &&
									!formState.errors?.parent
							)}
							isInvalid={Boolean(
								!!formState.touched?.parent && !!formState.errors?.parent
							)}
							error={formState.errors?.parent as string}
							placeholder="Parent Categories"
							label="Parent Categories"
							isDisabled={isCategoriesLoading}
							required={isFieldRequired("parent", validationSchema)}
							isMulti
						/>
					</div>
					<div className="col-12">
						<FileField
							name="icon"
							id="iconField"
							onChange={({ target: { name, files } }) => {
								formState.setFieldTouched(name, true);
								formState?.setFieldValue(name, files?.[0] || "");
							}}
							onBlur={formState.handleBlur}
							isValid={Boolean(
								formState.values?.icon &&
									!!formState.touched?.icon &&
									!formState.errors?.icon
							)}
							isInvalid={Boolean(
								!!formState.touched?.icon && !!formState.errors?.icon
							)}
							error={formState.errors?.icon as string}
							accept={vars.app.imagesFileInputAccepts.join(",")}
							helpText={`Allowed file types: png, jpg, jpeg. Max file size: ${vars.app.fileMaxSizeInMB}MB.`}
							label="Icon Image"
							required={isFieldRequired("icon", validationSchema)}
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

export default Categories;
