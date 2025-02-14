"use client";

import classNames from "classnames";
import { ComponentPropsWithoutRef, useState } from "react";
import { percentage } from "utils/helpers";
import isStrongPassword from "validator/lib/isStrongPassword";
import FieldRequiredLabel from "views/components/FieldRequiredLabel";
import NextLink from "views/components/NextLink";

type Props = {
	isValid?: boolean | undefined;
	isInvalid?: boolean | undefined;
	error?: string | undefined;
	label?: string | undefined;
	allowForgotPasswordLink?: boolean | undefined;
	allowToggleVisibility?: boolean | undefined;
	allowStrengthBar?: boolean | undefined;
} & ComponentPropsWithoutRef<"input">;

const PasswordField = ({
	isValid = false,
	isInvalid = false,
	id = "passwordField",
	name = "password",
	value = "",
	className,
	label,
	placeholder,
	error,
	allowForgotPasswordLink,
	allowToggleVisibility,
	allowStrengthBar,
	required,
	...restOfProps
}: Props) => {
	// constants
	const PASSWORD_MIN_LENGTH: number = 8;
	const strengthValue = Math.max(
		0,
		Math.min(
			5,
			isStrongPassword(String(value), {
				minLength: PASSWORD_MIN_LENGTH,
				returnScore: true,
				pointsPerUnique: 0,
				pointsPerRepeat: 0,
				pointsForContainingLower: 1,
				pointsForContainingUpper: 1,
				pointsForContainingNumber: 1,
				pointsForContainingSymbol: 1,
			}) + (String(value).length >= PASSWORD_MIN_LENGTH ? 1 : 0)
		)
	);
	const getStrengthBarText = () => {
		if (strengthValue >= 5) {
			return "Strong";
		} else if (strengthValue >= 3) {
			return "Weak";
		}
		return "Very Weak";
	};
	const getStrengthBarColor = () => {
		if (strengthValue >= 5) {
			return "bg-success";
		} else if (strengthValue >= 3) {
			return "bg-warning";
		}
		return "bg-danger";
	};

	// state hooks
	const [isPasswordVisibleState, setIsPasswordVisibleState] = useState(false);

	// event handlers
	const onPasswordVisibilityTogglerButtonClickHandler = () =>
		setIsPasswordVisibleState(!isPasswordVisibleState);

	return (
		<>
			<div className="hstack gap-2 align-items-center justify-content-between mb-1">
				{label && (
					<label htmlFor={id} className="form-label text-capitalize mb-0">
						{label}
						{required && <FieldRequiredLabel />}
					</label>
				)}
				{allowForgotPasswordLink && (
					<NextLink
						href="/auth/password/forgot"
						className="text-capitalize focus-ring d-inline-block lh-1">
						<strong>
							<small>forgot password?</small>
						</strong>
					</NextLink>
				)}
				{allowStrengthBar && strengthValue > 0 && (
					<span
						className="progress h-14px w-150px d-inline-block"
						role="progressbar"
						aria-label="Password Strength Bar"
						aria-valuenow={strengthValue}
						aria-valuemin={0}
						aria-valuemax={5}>
						<span
							className={`progress-bar ${getStrengthBarColor()}`}
							style={{
								width: percentage(strengthValue, 5, { percentageSign: true }),
							}}>
							{getStrengthBarText()}
						</span>
					</span>
				)}
			</div>
			<div
				className={classNames("input-group", {
					"has-validation": isInvalid || isValid,
				})}>
				<input
					type={isPasswordVisibleState ? "text" : "password"}
					name={name}
					id={id}
					value={value}
					className={classNames("form-control text-truncate rounded-end-0", className, {
						"is-invalid": isInvalid,
						"is-valid": isValid,
					})}
					placeholder={placeholder || label}
					autoComplete="password"
					aria-describedby={allowToggleVisibility ? "passwordToggleButton" : undefined}
					required={required || undefined}
					{...restOfProps}
				/>
				{allowToggleVisibility && (
					<span className="input-group-text" id="passwordToggleButton">
						<button
							type="button"
							className="btn btn-link link-dark bg-gray-500-hover bg-gray-500-focus-visible p-1 rounded-3 text-decoration-none lh-1"
							onClick={onPasswordVisibilityTogglerButtonClickHandler}
							title={isPasswordVisibleState ? "Hide Password" : "Show Password"}>
							<svg className="bi w-22px h-22px" width="22" height="22">
								<use
									href={isPasswordVisibleState ? "#icon-eye-slash" : "#icon-eye"}
								/>
							</svg>
						</button>
					</span>
				)}
				{isInvalid && error && (
					<div className="invalid-feedback text-capitalize">
						<strong>
							<small>{error}</small>
						</strong>
					</div>
				)}
			</div>
		</>
	);
};

export default PasswordField;
