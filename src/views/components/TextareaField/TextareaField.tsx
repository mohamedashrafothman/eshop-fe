"use client";

import classNames from "classnames";
import { ComponentPropsWithoutRef, useId } from "react";
import FieldRequiredLabel from "views/components/FieldRequiredLabel";

type Props = {
	isValid?: boolean | undefined;
	isInvalid?: boolean | undefined;
	error?: string | undefined;
	label?: string | undefined;
} & ComponentPropsWithoutRef<"textarea">;

const TextareaField = ({
	isValid = false,
	isInvalid = false,
	id: passedId,
	className,
	label,
	placeholder,
	error,
	required,
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
