"use client";

import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";
import FieldRequiredLabel from "views/components/FieldRequiredLabel";

type Props = {
	isValid?: boolean | undefined;
	isInvalid?: boolean | undefined;
	error?: string | undefined;
	label?: string | undefined;
	options?: { value: string; text: string }[] | [];
	placeholder?: string | undefined;
} & ComponentPropsWithoutRef<"select">;

const SelectField = ({
	isValid = false,
	isInvalid = false,
	id = "selectField",
	className,
	label,
	error,
	required,
	options = [],
	placeholder = "",
	...restOfProps
}: Props) => (
	<>
		{label && (
			<label htmlFor={id || undefined} className="form-label text-capitalize">
				{label}
				{required && <FieldRequiredLabel />}
			</label>
		)}
		<select
			id={id}
			className={classNames("form-select text-truncate", className, {
				"is-invalid": isInvalid,
				"is-valid": isValid,
			})}
			required={required || undefined}
			{...restOfProps}>
			<option value="">{placeholder}</option>
			{options.map(({ value, text }) => (
				<option value={value} key={value}>
					{text}
				</option>
			))}
		</select>
		{isInvalid && error && (
			<div className="invalid-feedback text-capitalize">
				<strong>
					<small>{error}</small>
				</strong>
			</div>
		)}
	</>
);

export default SelectField;
