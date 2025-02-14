"use client";

import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";
import FieldRequiredLabel from "views/components/FieldRequiredLabel";

type Props = {
	isValid?: boolean | undefined;
	isInvalid?: boolean | undefined;
	isInline?: boolean | undefined;
	error?: string | undefined;
	label?: string | undefined;
	isSwitch?: boolean | undefined;
} & ComponentPropsWithoutRef<"input">;

const CheckboxField = ({
	isValid = false,
	isInvalid = false,
	isInline = false,
	isSwitch = false,
	className,
	label,
	error,
	required,
	id,
	type = "checkbox",
	...restOfProps
}: Props) => (
	<div
		className={classNames("form-check", {
			"form-check-inline": isInline,
			"form-switch": isSwitch,
		})}>
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
