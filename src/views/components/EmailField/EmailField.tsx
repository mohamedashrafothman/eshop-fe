"use client";

import classNames from "classnames";
import useMeQuery from "hooks/useMeQuery";
import useUserEmailResendQuery from "hooks/useUserEmailResendQuery";
import { useTransitionRouter } from "next-view-transitions";
import { ComponentPropsWithoutRef } from "react";
import FieldRequiredLabel from "views/components/FieldRequiredLabel";

type Props = {
	isValid?: boolean | undefined;
	isInvalid?: boolean | undefined;
	error?: string | undefined;
	label?: string | undefined;
	allowVerificationStatus?: boolean | undefined;
} & ComponentPropsWithoutRef<"input">;

const EmailField = ({
	isValid = false,
	isInvalid = false,
	id = "emailField",
	type = "email",
	name = "email",
	className,
	label = "Email address",
	placeholder,
	error,
	required,
	allowVerificationStatus,
	...restOfProps
}: Props) => {
	const { push } = useTransitionRouter();

	// server state hooks
	const { data: user, isFetching: isUserFetching } = useMeQuery();
	const { refetch: resendEmailConfirmation, isFetching: isResendEmailConfirmationFetching } =
		useUserEmailResendQuery({ id: user?._id });

	return (
		<>
			<div className="hstack gap-2 align-items-center justify-content-between mb-1">
				{label && (
					<label htmlFor={id || undefined} className="form-label text-capitalize">
						{label}
						{required && <FieldRequiredLabel />}
					</label>
				)}
				{allowVerificationStatus && user && !isUserFetching && (
					<>
						{user.emailVerified ? (
							<span className="hstack gap-1 flex-nowrap text-primary">
								<svg
									className="bi w-20px h-20px"
									width="20"
									height="20"
									aria-label="Email Verified">
									<use href="#icon-check-circle"></use>
								</svg>
								Verified
							</span>
						) : (
							<button
								type="button"
								className="btn btn-link p-0 rounded-0 text-capitalize d-inline-block lh-1"
								onClick={async () => {
									await resendEmailConfirmation();
									push("/user/email/verify");
								}}
								disabled={isResendEmailConfirmationFetching}>
								<strong>
									<small>verify</small>
								</strong>
								{isResendEmailConfirmationFetching && (
									<span
										className="spinner-border spinner-border-sm ms-2"
										role="status">
										<span className="visually-hidden">Loading...</span>
									</span>
								)}
							</button>
						)}
					</>
				)}
			</div>
			<input
				type={type}
				id={id}
				name={name}
				className={classNames("form-control text-truncate", className, {
					"is-invalid": isInvalid,
					"is-valid": isValid,
				})}
				placeholder={placeholder || label || undefined}
				required={required || undefined}
				autoComplete="email"
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

export default EmailField;
