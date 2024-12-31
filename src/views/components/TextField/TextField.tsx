"use client";

import { ComponentPropsWithoutRef } from "react";

type Props = {
	isValid?: boolean;
	isInvalid?: boolean;
	error?: string;
	label?: string;
} & ComponentPropsWithoutRef<"input">;

const TextField = ({
	isValid = false,
	isInvalid = false,
	id = "textField",
	type = "text",
	className,
	label,
	placeholder,
	error,
	required,
	...restOfProps
}: Props) => (
	<>
		{label && (
			<label htmlFor={id || undefined} className="form-label text-capitalize">
				{label} {required && <span className="text-danger">*</span>}
			</label>
		)}
		<input
			type={type}
			id={id}
			className={`form-control text-truncate ${isInvalid ? "is-invalid" : isValid ? "is-valid" : ""} ${className || ""}`}
			placeholder={placeholder || label || undefined}
			required={required || undefined}
			{...restOfProps}
		/>
		{isInvalid && error && (
			<div className="invalid-feedback text-capitalize">
				<strong>{error}</strong>
			</div>
		)}
	</>
);

export default TextField;
