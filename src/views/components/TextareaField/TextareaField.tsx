"use client";

import classNames from "classnames";
import { ComponentPropsWithoutRef, useId } from "react";
import FieldHelpLabel from "views/components/FieldHelpLabel";
import FieldRequiredLabel from "views/components/FieldRequiredLabel";

type Props = {
	isValid?: boolean | undefined;
	isInvalid?: boolean | undefined;
	error?: string | undefined;
	label?: string | undefined;
	helpText?: string | undefined;
} & ComponentPropsWithoutRef<"textarea">;

const TextareaField = ({
	isValid = false,
	isInvalid = false,
	id: passedId,
	className,
	helpText = "",
	label,
	placeholder,
	error,
	required,
	maxLength,
	...restOfProps
}: Props) => {
	const reactId = useId();
	const id = `${passedId || "textareaField"}-${reactId}`;

	return (
		<>
			{label && (
				<label htmlFor={id || undefined} className="form-label text-capitalize">
					{label}
					{required && <FieldRequiredLabel />}
				</label>
			)}
			<textarea
				id={id}
				className={classNames("form-control", className, {
					"is-invalid": isInvalid,
					"is-valid": isValid,
				})}
				placeholder={placeholder || label || undefined}
				required={required || undefined}
				{...restOfProps}
			/>
			{helpText && <FieldHelpLabel id={id} text={helpText} />}
			{maxLength && (
				<FieldHelpLabel
					id={`${id}-max`}
					text={`${Math.max(0, maxLength - (restOfProps.value as string)?.length)}/${maxLength} Char.`}
					direction="end"
					className="d-inline-block float-end"
				/>
			)}
			{isInvalid && error && (
				<div className="invalid-feedback text-capitalize">
					<strong>
						<small>{error}</small>
					</strong>
				</div>
			)}
		</>
	);
};

export default TextareaField;
