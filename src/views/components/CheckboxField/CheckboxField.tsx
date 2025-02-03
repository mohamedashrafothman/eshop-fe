"use client";

import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";
import FieldRequiredLabel from "views/components/FieldRequiredLabel";

type Props = {
	isValid?: boolean;
	isInvalid?: boolean;
	isInline?: boolean;
	error?: string;
	label?: string;
} & ComponentPropsWithoutRef<"input">;

const CheckboxField = ({
	isValid = false,
	isInvalid = false,
	isInline = false,
	className,
	label,
	error,
	required,
	id,
	type = "checkbox",
	...restOfProps
}: Props) => (
	<div className={classNames("form-check", { "form-check-inline": isInline })}>
		<input
			className={classNames("form-check-input", className, {
				"is-invalid": isInvalid,
				"is-valid": isValid,
			})}
			type={type}
			id={id || undefined}
			required={required || undefined}
			autoComplete="off"
			{...restOfProps}
		/>
		{label && (
			<label className="form-check-label text-capitalize" htmlFor={id || undefined}>
				<small>
					{label}
					{required && <FieldRequiredLabel />}
				</small>
			</label>
		)}
		{isInvalid && error && (
			<div className="invalid-feedback text-capitalize">
				<strong>{error}</strong>
			</div>
		)}
	</div>
);

export default CheckboxField;
