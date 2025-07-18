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
} & ComponentPropsWithoutRef<"input">;

const FileField = ({
	isValid = false,
	isInvalid = false,
	id: passedId,
	autoComplete = "off",
	helpText = "",
	className,
	label,
	error,
	required,
	...restOfProps
}: Props) => {
	const reactId = useId();
	const id = `${passedId || "fileField"}-${reactId}`;

	return (
		<>
			{label && (
				<label htmlFor={id || undefined} className="form-label text-capitalize">
					{label}
					{required && <FieldRequiredLabel />}
				</label>
			)}
			<input
				type="file"
				id={id}
				className={classNames("form-control", className, {
					"is-invalid": isInvalid,
					"is-valid": isValid,
				})}
				required={required || undefined}
				autoComplete={autoComplete || undefined}
				aria-describedby={helpText ? `${id}-help` : undefined}
				{...restOfProps}
			/>
			{helpText && <FieldHelpLabel id={id} text={helpText} />}
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

export default FileField;
