"use client";

import { ComponentPropsWithoutRef, forwardRef, LegacyRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import vars from "utils/vars";

type Props = {
	isInvalid?: boolean;
	error?: string;
	label?: string;
	onChange?: ((_token: string | null) => void) | undefined;
	onExpired?: (() => void) | undefined;
} & Omit<ComponentPropsWithoutRef<"input">, "onChange">;

const RecaptchaField = (
	{
		isInvalid = false,
		id = "recaptchaField",
		className,
		label,
		placeholder,
		error,
		required,
		onChange,
		onExpired,
		...restOfProps
	}: Props,
	ref: LegacyRef<ReCAPTCHA> | undefined
) => (
	<>
		<ReCAPTCHA
			ref={ref}
			sitekey={vars.secrets.OAuth.google.recaptchaKey}
			onChange={onChange}
			onExpired={onExpired}
		/>
		<input
			type="text"
			id={id}
			className={`form-control text-truncate ${isInvalid ? "is-invalid" : ""} ${className || ""}`}
			placeholder={placeholder || label || undefined}
			required={required || undefined}
			{...restOfProps}
			readOnly
			hidden
			aria-hidden="true"
		/>
		{isInvalid && error && (
			<div className="invalid-feedback text-capitalize">
				<strong>{error}</strong>
			</div>
		)}
	</>
);

export default forwardRef(RecaptchaField);
