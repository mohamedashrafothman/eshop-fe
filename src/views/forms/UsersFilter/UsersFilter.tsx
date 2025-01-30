"use client";

import { FocusError } from "focus-formik-error";
import { FormikHelpers, useFormik } from "formik";
import AutoSave from "hooks/AutoSave";
import { type SortItemType } from "utils/helpers";
import TextField from "views/components/TextField";
import formValidationSchema, { type schemaType } from "./schema";

type Props = {
	onSubmit: (data: schemaType, formikHelpers: FormikHelpers<schemaType>) => void;
	sort: SortItemType[] | [];
};

const UsersFilter = ({ onSubmit }: Props) => {
	// form state
	const formState = useFormik<schemaType>({
		initialValues: { q: "", deleted: null, emailVerified: null, active: null },
		validationSchema: formValidationSchema,
		onSubmit,
	});

	return (
		<form onSubmit={formState.handleSubmit} noValidate>
			<FocusError formik={formState} />
			<AutoSave formik={formState} />
			<fieldset>
				<legend className="visually-hidden">Users filter form</legend>
				<div className="row g-gutter">
					<div className="col-12 col-lg">
						<TextField
							type="search"
							name="q"
							id="qField"
							onChange={formState.handleChange}
							onBlur={formState.handleBlur}
							value={formState.values?.q || ""}
							isInvalid={Boolean(!!formState.touched?.q && !!formState.errors?.q)}
							error={formState.errors?.q}
							placeholder="Search by name"
						/>
					</div>
					<div className="col-12 col-lg-auto">
						<div className="px-16px py-10px hstack gap-2 rounded border bg-gray-100 flex-nowrap">
							<div className="text-bg-dark text-center">checkboxes inputs</div>
							<div className="vr border bg-transparent op-100" />
							<div className="text-bg-dark text-center">sort input</div>
						</div>
					</div>
				</div>
			</fieldset>
		</form>
	);
};

export default UsersFilter;
