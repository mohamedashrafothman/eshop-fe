"use client";

import classNames from "classnames";
import { FocusError } from "focus-formik-error";
import { useFormik } from "formik";
import AutoSave from "hooks/AutoSave";
import { useCategoriesQuery } from "hooks/useTanstackQuery/useCategories";
import { useProductsQuery } from "hooks/useTanstackQuery/useProducts";
import IProduct from "interfaces/Product.interface";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import { type GetProductsDataType } from "services/api/e-shop/products";
import { isObject } from "utils/helpers";
import Dropdown from "views/components/Dropdown";
import SelectField from "views/components/SelectField";
import TextField from "views/components/TextField";
import validationSchema, { type schemaType } from "./schema";

const ProductsSearch = () => {
	// ref hook
	const dropdownRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	// state hooks
	const [isProductsQueryEnabled, setIsProductsQueryEnabled] = useState(false);
	const [productsParamsState, setProductsParamsState] = useState<GetProductsDataType | undefined>(
		undefined
	);

	// server side hooks
	const { data: { data: categories = [] } = {}, isLoading: isCategoriesLoading } =
		useCategoriesQuery({ pagination: false });
	const { data: { data: products = [] } = {}, isLoading: isProductsLoading } = useProductsQuery(
		productsParamsState,
		{ enabled: isProductsQueryEnabled }
	);

	// constants
	const allCategoriesOption = { _id: "", name: "All Categories" };
	const initialFormValues = { q: null };

	// form state
	const { submitForm, ...formState } = useFormik<schemaType>({
		initialValues: initialFormValues,
		validationSchema,
		onSubmit: ({ q, ...value }) => {
			if (!isProductsQueryEnabled) setIsProductsQueryEnabled(true);
			setProductsParamsState({ ...value, q: q || undefined });
			if (dropdownRef?.current && !dropdownRef.current.classList.contains("show"))
				dropdownRef.current.click();
			if (searchInputRef?.current) searchInputRef.current.focus();
		},
	});

	return (
		<form
			className="products-search-form"
			onSubmit={formState.handleSubmit}
			onReset={formState.handleReset}
			noValidate>
			<FocusError formik={formState} />
			<AutoSave formik={{ submitForm, ...formState }} compareAgainstInitialValue />
			<fieldset>
				<legend className="visually-hidden">Products search form:</legend>
				<div
					className={classNames("input-group flex-nowrap bg-gray-400 rounded-4", {
						"has-validation": !!formState.touched?.q && !!formState.errors?.q,
					})}>
					<div className="input-group-text p-0 bg-transparent border-0">
						<SelectField
							className="flex-shrink-0 flex-basis-auto w-200px"
							name="categories"
							id="searchProductsByCategoriesField"
							value={[allCategoriesOption, ...(categories || [])]
								?.filter((category) =>
									formState.values?.categories?.includes(category._id)
								)
								?.map(({ _id: value, name: label }) => ({ value, label }))}
							onChange={(option) =>
								formState?.setFieldValue(
									"categories",
									isObject(option)
										? [(option as any)?.value || ""]
										: Array.isArray(option)
											? option?.map(({ value }) => value)
											: [""]
								)
							}
							onBlur={formState.handleBlur}
							options={[allCategoriesOption, ...(categories || [])]?.map(
								({ _id: value, name: label }) => ({
									value,
									label,
								})
							)}
							placeholder="All Categories"
							isDisabled={isCategoriesLoading}
						/>
					</div>
					<div className="hstack flex-nowrap align-items-stretch flex-grow-1 flex-basis-0 position-relative">
						<TextField
							ref={searchInputRef}
							type="search"
							name="q"
							id="searchProductsByNameField"
							className="rounded-0 flex-grow-1 flex-basis-0 z-2"
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							value={formState.values?.q || ""}
							placeholder="Search By Product Name/Description"
							spellCheck="false"
							autoComplete="off"
						/>
						<div
							className={classNames(
								"p-1 flex-shrink-0 flex-basis-0 border border-gray-500 border-2 ms-nborderx2",
								{ "visually-hidden": !formState.values?.q }
							)}>
							<Dropdown.Toggle
								ref={dropdownRef}
								className="btn btn-link link-primary border-0 rounded-0 text-decoration-none p-0 h-100 w-100"
								dropdownOptions={{ autoClose: "inside" }}
								withRotation>
								<svg className="bi w-20px h-20px" width="20" height="20">
									<use href="#icon-chevron-down" />
								</svg>
							</Dropdown.Toggle>
							<Dropdown.Menu className="shadow start-50 translate-middle-x top-100 w-100 mt-1 max-height-300px customized-scroll overflow-y-auto">
								{isProductsLoading ? (
									Array.from(
										{ length: 4 },
										(_, i) => ({ _id: String(i) }) as Pick<IProduct, "_id">
									).map((product) => (
										<Fragment key={product._id}>
											<Dropdown.MenuItem className="placeholder-glow">
												<strong className="placeholder placeholder-sm bg-secondary op-20 d-block w-100 py-1">
													&nbsp;
												</strong>
											</Dropdown.MenuItem>
										</Fragment>
									))
								) : (
									<>
										{products.length === 0 && (
											<Dropdown.MenuItem>
												<strong className="text-center text-secondary d-block py-2">
													No products found
												</strong>
											</Dropdown.MenuItem>
										)}
										{products.length !== 0 &&
											products.map((product) => (
												<Dropdown.MenuItem key={product._id}>
													<Dropdown.Link
														href={`/products/${product.slug || product._id}`}
														className="link-dark text-primary-hover text-primary-focus focus-ring focus-ring-primary text-capitalize"
														onClick={() => formState.resetForm()}>
														<span className="hstack gap-2 flex-nowrap align-items-start">
															{typeof product.thumbnail !==
																"string" &&
																product.thumbnail?.path && (
																	<span className="flex-shrink-0">
																		<Image
																			src={
																				product.thumbnail
																					.path
																			}
																			className="w-22px h-22px object-fit-scale-down rounded"
																			width="22"
																			height="22"
																			alt={
																				product?.thumbnail
																					?.alt ||
																				product.name
																			}
																		/>
																	</span>
																)}
															<span className="vstack align-items-start lh-1">
																<strong className="flex-grow-1">
																	{product.name}
																</strong>
																<small className="text-secondary">
																	<em>{product.description}</em>
																</small>
															</span>
														</span>
													</Dropdown.Link>
												</Dropdown.MenuItem>
											))}
									</>
								)}
							</Dropdown.Menu>
						</div>
					</div>
					<div className="input-group-text p-1">
						<button
							type="submit"
							className="btn btn-link link-primary border-0 rounded-start-0 rounded-end-2 text-decoration-none p-1 h-100 w-100"
							disabled={!formState.isValid}>
							{isProductsLoading ? (
								<span className="spinner-border spinner-border-sm" role="status">
									<span className="visually-hidden">Loading...</span>
								</span>
							) : (
								<svg className="bi w-16px h-16px" width="16" height="16">
									<use href="#icon-search" />
								</svg>
							)}
							<strong className="visually-hidden">Search</strong>
						</button>
					</div>
				</div>
			</fieldset>
		</form>
	);
};

export default ProductsSearch;
