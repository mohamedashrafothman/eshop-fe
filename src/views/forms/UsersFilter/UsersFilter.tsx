"use client";

import Collapse from "bootstrap/js/dist/collapse";
import { FocusError } from "focus-formik-error";
import { FormikConfig, useFormik } from "formik";
import AutoSave from "hooks/AutoSave";
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

const UsersFilter = ({ onSubmit, sort = [], totalDocs = 0 }: Props) => {
	// ref hook
	const collapseRef = useRef<HTMLButtonElement | null>(null);

	// effect hooks
	useEffect(() => {
		const collapseRefCurrent = collapseRef?.current;
		if (collapseRefCurrent)
			Collapse.getOrCreateInstance(collapseRefCurrent, { toggle: false }).hide();

		return () => {
			if (collapseRefCurrent) Collapse.getInstance(collapseRefCurrent)?.dispose();
		};
	}, []);

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
				<legend className="visually-hidden">Users filter form</legend>
				<div className="row flex-nowrap">
					<div className="col-auto">
						<p className="text-secondary fs-4 text-capitalize hstack gap-2 mb-0 lh-1 py-3">
							<span className="badge bg-primary">{totalDocs}</span>
							Users
						</p>
					</div>
					<div className="col">
						<div className="row g-gutter align-items-center">
							<div className="col">
								<SearchField
									className="min-w-200px"
									onChange={formState.handleChange}
									value={formState.values?.q || ""}
									placeholder="Search..."
								/>
							</div>
							<div className="col-auto">
								<SelectField
									className="mw-200px"
									name="sort"
									value={JSON.stringify(formState.values?.sort || "")}
									onChange={({ target: { name = "", value = "" } }) =>
										formState.setFieldValue(name, JSON.parse(value))
									}
									options={sort.map(({ name, value }) => ({
										value: JSON.stringify(value),
										text: name,
									}))}
									placeholder="Sort By"
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
									<strong>More Filters</strong>
								</button>
							</div>
							<div className="col-12 m-0"></div>
							<div className="col collapse" id="filterCollapse">
								<div className="px-16px py-10px hstack gap-2 rounded-4 border border-gray-500 border-2 bg-gray-400 flex-nowrap h-100">
									<div>
										<CheckboxField
											onChange={formState.handleChange}
											checked={+String(formState.values?.active) === 0}
											type="radio"
											name="active"
											id="activeFalseField"
											value="0"
											label="Inactive"
											isInline
										/>
										<CheckboxField
											onChange={formState.handleChange}
											checked={+String(formState.values?.active) === 1}
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
									<div className="vr border bg-transparent op-100" />
									<div>
										<CheckboxField
											onChange={formState.handleChange}
											checked={+String(formState.values?.emailVerified) === 0}
											type="radio"
											name="emailVerified"
											id="emailVerifiedFalseField"
											value="0"
											label="Not Verified"
											isInline
										/>
										<CheckboxField
											onChange={formState.handleChange}
											checked={+String(formState.values?.emailVerified) === 1}
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
						</div>
					</div>
				</div>
			</fieldset>
		</form>
	);
};

export default UsersFilter;
