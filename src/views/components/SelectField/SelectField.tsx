"use client";

import classNames from "classnames";
import { useId } from "react";
import Select, { type Props as SelectProps } from "react-select";
import FieldRequiredLabel from "views/components/FieldRequiredLabel";

type Props = {
	isValid?: boolean | undefined;
	isInvalid?: boolean | undefined;
	error?: string | undefined;
	label?: string | undefined;
	placeholder?: string | undefined;
	id: string;
} & SelectProps<{ value: string; label: string }>;

const SelectField = ({
	isValid = false,
	isInvalid = false,
	id: passedId,
	className,
	label,
	error,
	required,
	name,
	...restOfProps
}: Props): ReturnType<Select> => {
	const reactId = useId();
	const id = `${passedId || "selectField"}-${reactId}`;

	return (
		<>
			{label && (
				<label htmlFor={id || undefined} className="form-label text-capitalize">
					{label}
					{required && <FieldRequiredLabel />}
				</label>
			)}
			<Select
				inputId={id}
				name={name}
				classNamePrefix="react-select"
				className={classNames(className, { "is-invalid": isInvalid, "is-valid": isValid })}
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

export default SelectField;
