"use client";

import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";
import FieldRequiredLabel from "views/components/FieldRequiredLabel";

type Props = {
	isValid?: boolean | undefined;
	isInvalid?: boolean | undefined;
	error?: string | undefined;
	label?: string | undefined;
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
				{label}
				{required && <FieldRequiredLabel />}
			</label>
		)}
		<input
			type={type}
			id={id}
			className={classNames("form-control text-truncate", className, {
				"is-invalid": isInvalid,
				"is-valid": isValid,
			})}
			placeholder={placeholder || label || undefined}
			required={required || undefined}
			{...restOfProps}
		/>
		{isInvalid && error && (
			<div className="invalid-feedback text-capitalize">
				<strong>
					<small>{error}</small>
				</strong>
			</div>
		)}
	</>
);

export default TextField;
