"use client";

import { ComponentPropsWithoutRef } from "react";

type Props = {
	isValid?: boolean;
	isInvalid?: boolean;
	error?: string;
	label?: string;
} & ComponentPropsWithoutRef<"input">;

const CheckboxField = ({
	isValid = false,
	isInvalid = false,
	className,
	label,
	error,
	required,
	id,
	...restOfProps
}: Props) => (
	<div className="form-check">
		<input
			className={`form-check-input ${isInvalid ? "is-invalid" : isValid ? "is-valid" : ""} ${className}`}
			type="checkbox"
			id={id || undefined}
			required={required || undefined}
			autoComplete="off"
			{...restOfProps}
		/>
		{label && (
			<label className="form-check-label text-capitalize" htmlFor={id || undefined}>
				<strong>{label}</strong>
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
