"use client";

import { FocusError } from "focus-formik-error";
import { FormikConfig, useFormik } from "formik";
import AutoSave from "hooks/AutoSave";
import useBootstrapCollapse from "hooks/useBootstrapCollapse";
import { useBrandsQuery } from "hooks/useTanstackQuery/useBrands";
import { useCategoriesQuery } from "hooks/useTanstackQuery/useCategories";
import { useEffect, useRef } from "react";
import { type SortItemType } from "utils/helpers";
import CheckboxField from "views/components/CheckboxField";
import SearchField from "views/components/SearchField";
import SelectField from "views/components/SelectField";
import validationSchema, { type schemaType } from "./schema";

type Props = {
	onSubmit: FormikConfig<schemaType>["onSubmit"];
	sort: SortItemType[] | [];
	totalDocs: number;
};

const ProductsFilter = ({ onSubmit, sort = [], totalDocs = 0 }: Props) => {
	// server state hooks
	const { data: { data: categories = [] } = {}, isLoading: isCategoriesLoading } =
		useCategoriesQuery({ pagination: false });
	const { data: { data: brands = [] } = {}, isLoading: isBrandsLoading } = useBrandsQuery({
		pagination: false,
	});

	// ref hook
	const collapseRef = useRef<HTMLButtonElement | null>(null);

	// custom hooks
	useBootstrapCollapse(collapseRef);

	// form state
	const { submitForm, ...formState } = useFormik<schemaType>({
		initialValues: {},
		validationSchema,
		onSubmit,
	});

	// effect hooks
	useEffect(() => {
		submitForm();
	}, [submitForm]);

	return (
		<form onSubmit={formState.handleSubmit} onReset={formState.handleReset} noValidate>
			<FocusError formik={formState} />
			<AutoSave formik={{ submitForm, ...formState }} />
			<fieldset>
				<legend className="visually-hidden">Products filter form</legend>
				<div className="row flex-nowrap">
					<div className="col-auto">
						<p className="text-secondary fs-4 text-capitalize hstack gap-2 mb-0 lh-1 py-3">
							<span className="badge bg-primary">{totalDocs}</span>
							Products
						</p>
					</div>
					<div className="col">
						<div className="row g-gutter align-items-center">
							<div className="col">
								<SearchField
									className="min-w-200px"
									onChange={formState.handleChange}
									value={formState.values?.q || ""}
									placeholder="Search By Name"
								/>
							</div>
							<div className="col-auto">
								<SelectField
									className="w-200px"
									name="sort"
									id="sortField"
									value={sort
										?.filter(
											(sortOption) =>
												JSON.stringify(formState.values?.sort || {}) ===
												JSON.stringify(sortOption?.value || {})
										)
										?.map(({ name: label, value }) => ({
											value: JSON.stringify(value),
											label,
										}))}
									onChange={(option: any) =>
										formState.setFieldValue(
											"sort",
											JSON.parse(option?.value || "{}")
										)
									}
									options={sort.map(({ name: label, value }) => ({
										value: JSON.stringify(value),
										label,
									}))}
									placeholder="- Sort By -"
								/>
							</div>
							<div className="col-auto">
								<button
									type="submit"
									className="btn btn-primary border-primary-dark h-100 text-capitalize lh-1 text-decoration-none">
									<strong>Submit</strong>
								</button>
							</div>
							<div className="col-auto">
								<button
									type="reset"
									className="btn btn-outline-primary-dark h-100 text-capitalize lh-1 text-decoration-none"
									disabled={!formState.dirty}>
									<strong>Reset Filter</strong>
								</button>
							</div>
							<div className="col-auto">
								<button
									className="btn btn-link h-100 text-capitalize lh-1 text-decoration-none icon-link"
									type="button"
									data-bs-target="#filterCollapse"
									data-bs-toggle="collapse"
									aria-expanded="false"
									aria-controls="filterCollapse"
									ref={collapseRef}>
									<svg className="bi w-16px h-16px" width="16" height="16">
										<use href="#icon-funnel-fill"></use>
									</svg>
									<strong>Toggle More Filters</strong>
								</button>
							</div>
							<div className="col-12 m-0"></div>
							<div className="col collapse" id="filterCollapse">
								<div className="hstack gap-2 align-items-stretch">
									<SelectField
										className="flex-shrink-0 flex-basis-auto"
										name="categories"
										id="categoriesField"
										value={categories
											?.filter((category) =>
												formState.values?.categories?.includes(category._id)
											)
											?.map(({ _id: value, name: label }) => ({
												value,
												label,
											}))}
										onChange={(options) =>
											formState?.setFieldValue(
												"categories",
												(Array.isArray(options) &&
													options?.map(({ value }) => value)) ||
													[]
											)
										}
										options={categories.map(({ _id: value, name: label }) => ({
											value,
											label,
										}))}
										placeholder="Categories"
										isDisabled={isCategoriesLoading}
										isMulti
									/>
									<SelectField
										className="flex-shrink-0 flex-basis-auto"
										name="brands"
										id="brandsField"
										value={brands
											?.filter((brand) =>
												formState.values?.brands?.includes(brand._id)
											)
											?.map(({ _id: value, name: label }) => ({
												value,
												label,
											}))}
										onChange={(options) =>
											formState?.setFieldValue(
												"brands",
												(Array.isArray(options) &&
													options?.map(({ value }) => value)) ||
													[]
											)
										}
										options={brands.map(({ _id: value, name: label }) => ({
											value,
											label,
										}))}
										placeholder="Brands"
										isDisabled={isBrandsLoading}
										isMulti
									/>
									<div className="px-16px py-11px flex-shrink-0 hstack gap-2 rounded-4 border border-gray-500 border-2 bg-gray-400 flex-nowrap h-100">
										<CheckboxField
											onChange={formState.handleChange}
											checked={+String(formState.values?.deleted) === 0}
											type="radio"
											name="deleted"
											id="deletedFalseField"
											value="0"
											label="Not Deleted"
											isInline
										/>
										<CheckboxField
											onChange={formState.handleChange}
											checked={+String(formState.values?.deleted) === 1}
											type="radio"
											name="deleted"
											id="deletedTrueField"
											value="1"
											label="Deleted"
											isInline
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</fieldset>
		</form>
	);
};

export default ProductsFilter;
