"use client";

import classNames from "classnames";
import { ComponentPropsWithoutRef, useId } from "react";
import FieldHelpLabel from "views/components/FieldHelpLabel";
import FieldRequiredLabel from "views/components/FieldRequiredLabel";

export type Props = {
	isValid?: boolean | undefined;
	isInvalid?: boolean | undefined;
	error?: string | undefined;
	label?: string | undefined;
	helpText?: string | undefined;
	preventReactId?: boolean | undefined;
} & ComponentPropsWithoutRef<"input">;

const TextField = ({
	isValid = false,
	isInvalid = false,
	id: passedId,
	type = "text",
	className,
	label,
	placeholder,
	error,
	required,
	helpText = "",
	maxLength,
	preventReactId = false,
	...restOfProps
}: Props) => {
	const reactId = useId();
	const id = `${passedId || "textField"}${!preventReactId ? `-${reactId}` : ""}`;

	return (
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

export default TextField;
