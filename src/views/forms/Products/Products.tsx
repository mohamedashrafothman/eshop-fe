"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import { useBrandsQuery } from "hooks/useTanstackQuery/useBrands";
import { useCategoriesQuery } from "hooks/useTanstackQuery/useCategories";
import {
	ALL_KEY_ARRAY as ALL_PRODUCTS_KEY_ARRAY,
	usePatchProductMutation,
	usePostProductMutation,
	useSingleProductsQuery,
} from "hooks/useTanstackQuery/useProducts";
import IProduct from "interfaces/Product.interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { apiFormErrorExtractor, isFieldRequired, objectToFormData, pick } from "utils/helpers";
import vars from "utils/vars";
import CheckboxField from "views/components/CheckboxField";
import ColorField from "views/components/ColorField";
import FileField from "views/components/FileField";
import SelectField from "views/components/SelectField";
import TextareaField from "views/components/TextareaField";
import TextField from "views/components/TextField";
import formValidationSchema, {
	type schemaType,
	DESCRIPTION_MAX_LENGTH,
	NAME_MAX_LENGTH,
} from "./schema";

const Products = () => {
	const queryClient = useQueryClient();
	const { push } = useRouter();
	const { identifier = "" } = useParams<{ identifier: string }>();

	// server state hooks
	const postProductMutation = usePostProductMutation();
	const patchProductMutation = usePatchProductMutation();
	const { data: product, isLoading: isProductLoading } = useSingleProductsQuery(identifier);
	const { data: { data: categories = [] } = {}, isLoading: isCategoriesLoading } =
		useCategoriesQuery({ pagination: false });
	const { data: { data: brands = [] } = {}, isLoading: isBrandsLoading } = useBrandsQuery({
		pagination: false,
	});

	// ref hook
	const productCancelRequestRef = useRef<AbortController | null>(null);

	// constants
	const isEditForm = Boolean(identifier);
	const validationSchema = formValidationSchema({ isEdit: isEditForm });
	const INITIAL_COLORS_VARIATION = { value: "", name: "" };
	const INITIAL_SIZE_VARIATION = "";

	// state hooks
	const [colorsVariationsState, setColorsVariationsState] = useState<IProduct["colors"]>([
		INITIAL_COLORS_VARIATION,
	]);
	const [sizesVariationsState, setSizesVariationsState] = useState<string[]>([
		INITIAL_SIZE_VARIATION,
	]);

	// Handle form submission.
	const onFormSubmitHandler = async (
		data: schemaType,
		formikHelpers: FormikHelpers<schemaType>
	) => {
		// Abort any previous request, and create a new abort controller.
		if (productCancelRequestRef.current?.signal) productCancelRequestRef.current?.abort();
		productCancelRequestRef.current = new AbortController();

		// Call the product store/edit mutation.
		if (!isEditForm) {
			await postProductMutation.mutateAsync(
				{
					data: objectToFormData(data),
					signal: productCancelRequestRef.current.signal,
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
						// Resetting product store query mutation.
						postProductMutation.reset();
						// Invalidate the products query from the cache.
						await queryClient.invalidateQueries({
							queryKey: ALL_PRODUCTS_KEY_ARRAY,
						});
						// Redirect to products list
						push("/dashboard/products");
					},
				}
			);
		} else {
			await patchProductMutation.mutateAsync(
				{
					variables: { id: identifier },
					data: objectToFormData(data),
					signal: productCancelRequestRef.current.signal,
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
						// Resetting product edit query mutation.
						patchProductMutation.reset();
						// Invalidate the products query from the cache.
						await queryClient.invalidateQueries({
							queryKey: ALL_PRODUCTS_KEY_ARRAY,
						});
						// Redirect to products list
						push("/dashboard/products");
					},
				}
			);
		}
	};

	// form state
	const { setFieldValue: formStateSetFieldValue, ...formState } = useFormik<schemaType>({
		enableReinitialize: isEditForm,
		initialValues: {
			name: "",
			description: "",
			colors: [],
			sizes: [],
			...(isEditForm
				? {
						...((product && pick(product, ["name", "description", "isFeatured"])) ||
							{}),
						price: {
							normal: product?.price.normal || 0,
							...(product?.price?.sale && { sale: product.price.sale }),
						},
						category:
							(typeof product?.category !== "string"
								? product?.category?._id
								: product?.category) || "",
						brand:
							(typeof product?.brand !== "string"
								? product?.brand?._id
								: product?.brand) || "",
					}
				: { price: { normal: 0 }, thumbnail: "", images: [], category: "", brand: "" }),
		},
		validationSchema,
		onSubmit: onFormSubmitHandler,
	});

	// effect hooks
	useEffect(() => {
		if (isEditForm && product?.sizes.length) setSizesVariationsState(product.sizes);
		if (isEditForm && product?.colors.length) setColorsVariationsState(product.colors);
	}, [isEditForm, product?.colors, product?.sizes]);

	useEffect(() => {
		formStateSetFieldValue("sizes", sizesVariationsState);
		formStateSetFieldValue("colors", colorsVariationsState);
	}, [formStateSetFieldValue, sizesVariationsState, colorsVariationsState]);

	useEffect(() => {
		return () => {
			if (productCancelRequestRef.current?.signal) productCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<form onSubmit={formState.handleSubmit} onReset={formState.handleReset} noValidate>
			<FocusError formik={formState} />
			<fieldset disabled={formState.isSubmitting || isProductLoading}>
				<legend className="visually-hidden">{`${isEditForm ? "Edit Product" : "Add Product"} Form`}</legend>
				<div className="row gy-gutter g-lg-3">
					<div className="col-12 col-xl-6 col-3xl-5 col-ultra-hd-4">
						<div className="row gy-3">
							<div className="col-12">
								<fieldset className="p-3 border rounded-4">
									<legend className="h3 text-capitalize mb-3">
										<strong>
											<small>Basic Info</small>
										</strong>
									</legend>
									<div className="row gy-gutter g-md-3 mt-0">
										<div className="col-12 mt-0">
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
													!!formState.touched?.name &&
														!!formState.errors?.name
												)}
												error={formState.errors?.name}
												label="Name"
												autoComplete="name"
												required={isFieldRequired("name", validationSchema)}
												maxLength={NAME_MAX_LENGTH}
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
													!!formState.touched?.description &&
														!!formState.errors?.description
												)}
												error={formState.errors?.description}
												label="Description"
												maxLength={DESCRIPTION_MAX_LENGTH}
												required={isFieldRequired(
													"description",
													validationSchema
												)}
											/>
										</div>
										<div className="col-12 col-md-6">
											<TextField
												type="number"
												name="price['normal']"
												id="NormalPriceField"
												onChange={formState.handleChange}
												onBlur={formState.handleBlur}
												value={formState.values?.price?.normal || ""}
												isValid={Boolean(
													formState.values?.price?.normal &&
														!!formState.touched?.price?.normal &&
														!formState.errors?.price?.normal
												)}
												isInvalid={Boolean(
													!!formState.touched?.price?.normal &&
														!!formState.errors?.price?.normal
												)}
												error={formState.errors?.price?.normal}
												label="Price"
												required={isFieldRequired(
													"price['normal']",
													validationSchema
												)}
											/>
										</div>
										<div className="col-12 col-md-6">
											<TextField
												type="number"
												name="price['sale']"
												id="SalePriceField"
												onChange={formState.handleChange}
												onBlur={formState.handleBlur}
												value={formState.values?.price?.sale || ""}
												isValid={Boolean(
													formState.values?.price?.sale &&
														!!formState.touched?.price?.sale &&
														!formState.errors?.price?.sale
												)}
												isInvalid={Boolean(
													!!formState.touched?.price?.sale &&
														!!formState.errors?.price?.sale
												)}
												error={formState.errors?.price?.sale}
												label="Sale Price"
												helpText="Leave blank for no sale."
												required={isFieldRequired(
													"price['sale']",
													validationSchema
												)}
											/>
										</div>
										<div className="col-12">
											<SelectField
												name="category"
												id="categoryField"
												value={categories
													?.filter(
														(category) =>
															formState.values?.category ===
															category._id
													)
													?.map(({ _id: value, name: label }) => ({
														value,
														label,
													}))}
												onBlur={() =>
													formState.setFieldTouched("category", true)
												}
												onChange={(option: any) =>
													formStateSetFieldValue(
														"category",
														option?.value || ""
													)
												}
												options={categories.map(
													({ _id: value, name: label }) => ({
														value,
														label,
													})
												)}
												isValid={Boolean(
													formState.values?.category &&
														!!formState.touched?.category &&
														!formState.errors?.category
												)}
												isInvalid={Boolean(
													!!formState.touched?.category &&
														!!formState.errors?.category
												)}
												error={formState.errors?.category as string}
												label="Category"
												isDisabled={isCategoriesLoading}
												required={isFieldRequired(
													"category",
													validationSchema
												)}
											/>
										</div>
										<div className="col-12">
											<SelectField
												name="brand"
												id="brandField"
												value={brands
													?.filter(
														(brand) =>
															formState.values?.brand === brand._id
													)
													?.map(({ _id: value, name: label }) => ({
														value,
														label,
													}))}
												onBlur={() =>
													formState.setFieldTouched("brand", true)
												}
												onChange={(option: any) =>
													formStateSetFieldValue(
														"brand",
														option?.value || ""
													)
												}
												options={brands.map(
													({ _id: value, name: label }) => ({
														value,
														label,
													})
												)}
												isValid={Boolean(
													formState.values?.brand &&
														!!formState.touched?.brand &&
														!formState.errors?.brand
												)}
												isInvalid={Boolean(
													!!formState.touched?.brand &&
														!!formState.errors?.brand
												)}
												error={formState.errors?.brand as string}
												label="Brand"
												isDisabled={isBrandsLoading}
												required={isFieldRequired(
													"brand",
													validationSchema
												)}
											/>
										</div>
									</div>
								</fieldset>
							</div>
							<div className="col-12">
								<hr className="border m-0" />
							</div>
							<div className="col-12">
								<fieldset className="p-3 border rounded-4">
									<legend className="h3 text-capitalize mb-3">
										<strong>
											<small>Variations</small>
										</strong>
									</legend>
									<div className="row gy-gutter g-md-3 mt-0">
										<div className="col-12 mt-0">
											<fieldset>
												<legend className="visually-hidden">
													colors form
												</legend>
												<div className="row gy-2">
													{formState.values?.colors?.map(
														(
															singleColorVariation,
															singleColorVariationIndex
														) => (
															<div
																className="col-12"
																key={singleColorVariationIndex}>
																<div className="position-relative hstack flex-nowrap align-items-end gap-3">
																	<div className="flex-grow-1">
																		<div className="hstack gap-3 flex-nowrap align-items-start">
																			<div className="flex-grow-1 flex-shrink-0 flex-basis-0">
																				<TextField
																					type="text"
																					name={`colors[${singleColorVariationIndex}].name`}
																					id={`colorVariationNameField${singleColorVariationIndex}`}
																					onChange={
																						formState.handleChange
																					}
																					onBlur={
																						formState.handleBlur
																					}
																					value={
																						singleColorVariation?.name ||
																						""
																					}
																					isValid={Boolean(
																						formState
																							.values
																							?.colors?.[
																							singleColorVariationIndex
																						]?.name &&
																							Array.isArray(
																								formState
																									.touched
																									?.colors
																							) &&
																							!!formState
																								.touched
																								?.colors?.[
																								singleColorVariationIndex
																							]
																								?.name &&
																							!(
																								formState
																									.errors
																									?.colors?.[
																									singleColorVariationIndex
																								] as any
																							)?.name
																					)}
																					isInvalid={Boolean(
																						Array.isArray(
																							formState
																								.touched
																								?.colors
																						) &&
																							!!formState
																								.touched
																								?.colors?.[
																								singleColorVariationIndex
																							]
																								?.name &&
																							!!(
																								formState
																									.errors
																									?.colors?.[
																									singleColorVariationIndex
																								] as any
																							)?.name
																					)}
																					error={
																						(
																							formState
																								.errors
																								?.colors?.[
																								singleColorVariationIndex
																							] as any
																						)?.name
																					}
																					label="Color Name"
																					required={isFieldRequired(
																						"colors",
																						validationSchema
																					)}
																				/>
																			</div>
																			<div className="flex-grow-1 flex-shrink-0 flex-basis-0">
																				<ColorField
																					name={`colors[${singleColorVariationIndex}].value`}
																					id={`colorVariationValueField${singleColorVariationIndex}`}
																					onChange={
																						formState.handleChange
																					}
																					onBlur={
																						formState.handleBlur
																					}
																					value={
																						singleColorVariation?.value ||
																						""
																					}
																					isValid={Boolean(
																						formState
																							.values
																							?.colors?.[
																							singleColorVariationIndex
																						]?.value &&
																							Array.isArray(
																								formState
																									.touched
																									?.colors
																							) &&
																							!!formState
																								.touched
																								?.colors?.[
																								singleColorVariationIndex
																							]
																								?.value &&
																							!(
																								formState
																									.errors
																									?.colors?.[
																									singleColorVariationIndex
																								] as any
																							)?.value
																					)}
																					isInvalid={Boolean(
																						Array.isArray(
																							formState
																								.touched
																								?.colors
																						) &&
																							!!formState
																								.touched
																								?.colors?.[
																								singleColorVariationIndex
																							]
																								?.value &&
																							!!(
																								formState
																									.errors
																									?.colors?.[
																									singleColorVariationIndex
																								] as any
																							)?.value
																					)}
																					error={
																						(
																							formState
																								.errors
																								?.colors?.[
																								singleColorVariationIndex
																							] as any
																						)?.value
																					}
																					label="Color Value"
																					required={isFieldRequired(
																						"colors",
																						validationSchema
																					)}
																				/>
																			</div>
																		</div>
																	</div>
																	{formState.values?.colors
																		.length > 1 && (
																		<button
																			type="button"
																			className="btn btn-sm btn-link link-danger px-1 py-3 border-0 flex-shrink-0"
																			onClick={() => {
																				formStateSetFieldValue(
																					"colors",
																					formState.values?.colors?.filter(
																						(
																							_,
																							index
																						) =>
																							index !==
																							singleColorVariationIndex
																					)
																				);
																				formState.setFieldTouched(
																					"colors",
																					[
																						...((formState
																							.touched
																							?.colors as any) ||
																							[]),
																					]?.map(
																						(
																							singleTouchedColor,
																							index
																						) =>
																							index ===
																							singleColorVariationIndex
																								? false
																								: singleTouchedColor
																					) as any
																				);
																			}}
																			title="Remove this color">
																			<svg
																				className="bi w-18px h-18px"
																				height="18"
																				width="18">
																				<use href="#icon-trash"></use>
																			</svg>
																		</button>
																	)}
																</div>
															</div>
														)
													)}
													<div className="col-auto ms-auto">
														<button
															type="button"
															onClick={() =>
																formStateSetFieldValue(
																	`colors[${formState.values?.colors.length}]`,
																	INITIAL_COLORS_VARIATION
																)
															}
															className="btn btn-link icon-link icon-link-hover icon-link-hover-rotate p-1 text-capitalize text-decoration-none">
															<svg
																className="bi w-18px h-18px"
																width="18"
																height="18">
																<use href="#icon-plus" />
															</svg>
															<strong>Add new color</strong>
														</button>
													</div>
												</div>
											</fieldset>
										</div>
										<div className="col-12">
											<fieldset>
												<legend className="visually-hidden">
													sizes form
												</legend>
												<div className="row gy-2">
													{formState.values?.sizes?.map(
														(_, singleSizeVariationIndex) => (
															<div
																className="col-12"
																key={singleSizeVariationIndex}>
																<div className="position-relative hstack flex-nowrap align-items-end gap-3">
																	<div className="flex-grow-1">
																		<SelectField
																			name={`sizes[${singleSizeVariationIndex}]`}
																			id={`sizeVariationField${singleSizeVariationIndex}`}
																			value={vars.products.sizes
																				?.filter(
																					(size) =>
																						formState
																							.values
																							?.sizes?.[
																							singleSizeVariationIndex
																						] === size
																				)
																				?.map((size) => ({
																					value: size,
																					label: size,
																				}))}
																			onBlur={() =>
																				formState.setFieldTouched(
																					`sizes[${singleSizeVariationIndex}]`,
																					true
																				)
																			}
																			onChange={(
																				option: any
																			) =>
																				formStateSetFieldValue(
																					`sizes[${singleSizeVariationIndex}]`,
																					option?.value
																				)
																			}
																			options={vars.products.sizes
																				.filter(
																					(size) =>
																						!formState.values?.sizes?.includes(
																							size
																						)
																				)
																				.map((size) => ({
																					value: size,
																					label: size,
																				}))}
																			isValid={Boolean(
																				formState.values
																					?.sizes?.[
																					singleSizeVariationIndex
																				] &&
																					Array.isArray(
																						formState
																							.touched
																							?.sizes
																					) &&
																					!!formState
																						.touched
																						?.sizes?.[
																						singleSizeVariationIndex
																					] &&
																					!formState
																						.errors
																						?.sizes?.[
																						singleSizeVariationIndex
																					]
																			)}
																			isInvalid={Boolean(
																				Array.isArray(
																					formState
																						.touched
																						?.sizes
																				) &&
																					!!formState
																						.touched
																						?.sizes?.[
																						singleSizeVariationIndex
																					] &&
																					!!formState
																						.errors
																						?.sizes?.[
																						singleSizeVariationIndex
																					]
																			)}
																			error={
																				formState.errors
																					?.sizes?.[
																					singleSizeVariationIndex
																				]
																			}
																			label="Size"
																			required={isFieldRequired(
																				"sizes",
																				validationSchema
																			)}
																		/>
																	</div>
																	{formState.values?.sizes
																		.length > 1 && (
																		<button
																			type="button"
																			className="btn btn-sm btn-link link-danger px-1 py-3 border-0 flex-shrink-0"
																			onClick={() => {
																				formStateSetFieldValue(
																					`sizes`,
																					formState.values?.sizes?.filter(
																						(
																							_,
																							index
																						) =>
																							index !==
																							singleSizeVariationIndex
																					)
																				);
																				formState.setFieldTouched(
																					"sizes",
																					[
																						...((formState
																							.touched
																							?.sizes as any) ||
																							[]),
																					]?.map(
																						(
																							singleTouchedSize,
																							index
																						) =>
																							index ===
																							singleSizeVariationIndex
																								? false
																								: singleTouchedSize
																					) as any
																				);
																			}}
																			title="Remove this size">
																			<svg
																				className="bi w-18px h-18px"
																				height="18"
																				width="18">
																				<use href="#icon-trash"></use>
																			</svg>
																		</button>
																	)}
																</div>
															</div>
														)
													)}
													<div className="col-auto ms-auto">
														<button
															type="button"
															onClick={() =>
																formStateSetFieldValue(
																	`sizes[${formState.values?.sizes.length}]`,
																	INITIAL_SIZE_VARIATION
																)
															}
															className="btn btn-link icon-link icon-link-hover icon-link-hover-rotate p-1 text-capitalize text-decoration-none">
															<svg
																className="bi w-18px h-18px"
																width="18"
																height="18">
																<use href="#icon-plus" />
															</svg>
															<strong>Add new size</strong>
														</button>
													</div>
												</div>
											</fieldset>
										</div>
									</div>
								</fieldset>
							</div>
							<div className="col-12">
								<hr className="border m-0" />
							</div>
							<div className="col-12">
								<fieldset className="p-3 border rounded-4">
									<legend className="h3 text-capitalize mb-3">
										<strong>
											<small>Images</small>
										</strong>
									</legend>
									<div className="row gy-gutter g-md-3 mt-0">
										<div className="col-12 mt-0">
											<FileField
												name="thumbnail"
												id="thumbnailField"
												onChange={({ target: { name, files } }) => {
													formState.setFieldTouched(name, true);
													formStateSetFieldValue(name, files?.[0] || "");
												}}
												onBlur={formState.handleBlur}
												isValid={Boolean(
													formState.values?.thumbnail &&
														!!formState.touched?.thumbnail &&
														!formState.errors?.thumbnail
												)}
												isInvalid={Boolean(
													!!formState.touched?.thumbnail &&
														!!formState.errors?.thumbnail
												)}
												error={formState.errors?.thumbnail as string}
												accept={vars.app.imagesFileInputAccepts.join(",")}
												helpText={`Allowed file types: png, jpg, jpeg. Max file size: ${vars.app.fileMaxSizeInMB}MB.`}
												label="Thumbnail"
												required={isFieldRequired(
													"thumbnail",
													validationSchema
												)}
											/>
										</div>
										<div className="col-12">
											<FileField
												name="images"
												id="imagesField"
												onChange={({ target: { name, files } }) => {
													formState.setFieldTouched(name, true);
													formStateSetFieldValue(name, files?.[0] || "");
												}}
												onBlur={formState.handleBlur}
												isValid={Boolean(
													formState.values?.images &&
														!!formState.touched?.images &&
														!formState.errors?.images
												)}
												isInvalid={Boolean(
													!!formState.touched?.images &&
														!!formState.errors?.images
												)}
												error={formState.errors?.images as string}
												accept={vars.app.imagesFileInputAccepts.join(",")}
												helpText={`Allowed file types: png, jpg, jpeg. Max file size: ${vars.app.fileMaxSizeInMB}MB.`}
												label="Images"
												required={isFieldRequired(
													"images",
													validationSchema
												)}
												multiple
											/>
										</div>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
					<div className="col-12 col-xl-auto">
						<div className="vr border h-100 d-none d-xl-block" />
						<hr className="border m-0 d-xl-none" />
					</div>
					<div className="col-12 col-xl-5 col-3xl-4 col-ultra-hd-3">
						<fieldset className="p-3 border rounded-4">
							<legend className="h3 text-capitalize mb-3">
								<strong>
									<small>Configurations</small>
								</strong>
							</legend>
							<div className="row gy-gutter g-md-3 mt-0">
								<div className="col-12 mt-0">
									<CheckboxField
										onChange={({ target: { checked, name } }) =>
											formStateSetFieldValue(name, checked)
										}
										onBlur={formState.handleBlur}
										value="1"
										name="isFeatured"
										id="isFeaturedField"
										label="Mark as Featured"
										checked={formState.values?.isFeatured || undefined}
										isSwitch
									/>
								</div>
							</div>
						</fieldset>
					</div>
					<div className="col-12 m-0" />
					<div className="col-12 col-xl-6 col-3xl-5 col-ultra-hd-4 mt-5">
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

export default Products;
