"use client";

import Collapse from "bootstrap/js/dist/collapse";
import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import AutoSave from "hooks/AutoSave";
// import qs from "qs";
import { useEffect, useRef } from "react";
import { type SortItemType } from "utils/helpers";
import CheckboxField from "views/components/CheckboxField";
import SearchField from "views/components/SearchField";
import SelectField from "views/components/SelectField";
import validationSchema, { type schemaType } from "./schema";

type Props = {
	onSubmit: (data: schemaType, formikHelpers: FormikHelpers<schemaType>) => void;
	sort: SortItemType[] | [];
	totalDocs: number;
};

const UsersFilter = ({ onSubmit, sort = [], totalDocs = 0 }: Props) => {
	// ref hook
	let collapseRef = useRef(null);

	// effect hooks
	useEffect(() => {
		const collapseRefCurrent = collapseRef.current;
		if (collapseRefCurrent) new Collapse(collapseRefCurrent);

		return () => {
			if (collapseRefCurrent) Collapse.getInstance(collapseRefCurrent)?.dispose();
		};
	}, []);

	// form state
	const formState = useFormik<schemaType>({ initialValues: {}, validationSchema, onSubmit });

	return (
		<form onSubmit={formState.handleSubmit} onReset={formState.handleReset} noValidate>
			<FocusError formik={formState} />
			<AutoSave formik={formState} />
			<fieldset>
				<legend className="visually-hidden">Users filter form</legend>
				<div className="row gy-gutter">
					<div className="col-12">
						<div className="row align-items-center flex-nowrap">
							<div className="col-auto">
								<p className="text-secondary fs-4 text-capitalize hstack gap-2 mb-0">
									<span className="badge bg-primary">{totalDocs}</span>
									Users
								</p>
							</div>
							<div className="col">
								<div className="row g-gutter flex-nowrap">
									<div className="col">
										<SearchField
											className="min-w-200px"
											onChange={formState.handleChange}
											value={formState.values?.q || ""}
											placeholder="Search by name"
										/>
									</div>
									<div className="col-auto">
										<SelectField
											className="mw-200px"
											name="sort"
											value={formState.values?.sort || ""}
											onChange={formState.handleChange}
											options={sort.map(({ name, value }) => ({
												value: JSON.stringify(value),
												text: name,
											}))}
											placeholder="Sort by"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="row flex-nowrap">
							<div className="col-auto">
								<button
									className="btn btn-link h-100 text-capitalize lh-1 text-decoration-none"
									type="button"
									data-bs-target="#filterCollapse"
									data-bs-toggle="collapse"
									aria-expanded="false"
									aria-controls="filterCollapse"
									ref={collapseRef}>
									<strong>More Filters</strong>
								</button>
							</div>
							<div className="col collapse" id="filterCollapse">
								<div className="row flex-nowrap">
									<div className="col">
										<div className="px-16px py-10px hstack gap-2 rounded-4 border border-gray-500 border-2 bg-gray-400 flex-nowrap h-100">
											<div>
												<CheckboxField
													onChange={formState.handleChange}
													checked={
														+String(formState.values?.active) === 0
													}
													type="radio"
													name="active"
													id="activeFalseField"
													value="0"
													label="Not Active"
													isInline
												/>
												<CheckboxField
													onChange={formState.handleChange}
													checked={
														+String(formState.values?.active) === 1
													}
													type="radio"
													name="active"
													id="activeTrueField"
													value="1"
													label="Active"
													isInline
												/>
											</div>
											<div className="vr border bg-transparent op-100" />
											<div>
												<CheckboxField
													onChange={formState.handleChange}
													checked={
														+String(formState.values?.deleted) === 0
													}
													type="radio"
													name="deleted"
													id="deletedFalseField"
													value="0"
													label="Not Deleted"
													isInline
												/>
												<CheckboxField
													onChange={formState.handleChange}
													checked={
														+String(formState.values?.deleted) === 1
													}
													type="radio"
													name="deleted"
													id="deletedTrueField"
													value="1"
													label="Deleted"
													isInline
												/>
											</div>
											<div className="vr border bg-transparent op-100" />
											<div>
												<CheckboxField
													onChange={formState.handleChange}
													checked={
														+String(formState.values?.emailVerified) ===
														0
													}
													type="radio"
													name="emailVerified"
													id="emailVerifiedFalseField"
													value="0"
													label="Not Verified"
													isInline
												/>
												<CheckboxField
													onChange={formState.handleChange}
													checked={
														+String(formState.values?.emailVerified) ===
														1
													}
													type="radio"
													name="emailVerified"
													id="emailVerifiedTrueField"
													value="1"
													label="Verified"
													isInline
												/>
											</div>
										</div>
									</div>
									<div className="col-auto">
										<button
											type="reset"
											className="btn btn-link h-100 text-capitalize lh-1 text-decoration-none">
											<strong>Reset Filter</strong>
										</button>
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

export default UsersFilter;
