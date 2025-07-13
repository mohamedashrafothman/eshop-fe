"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
	ME_KEY_ARRAY,
	useMeQuery,
	useUserEmailResendQuery,
	useUserEmailVerifyQuery,
} from "hooks/useTanstackQuery/useUsers";
import { useTransitionRouter } from "next-view-transitions";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import NextLink from "views/components/NextLink";

type Props = { title: string };

const UserEmailVerification = ({ title }: Props) => {
	const queryClient = useQueryClient();
	const { push } = useTransitionRouter();
	const { token = undefined } = useParams<{ token?: string | undefined }>();

	// server state hooks
	const { data: user } = useMeQuery();
	const { refetch: resendEmailConfirmation, isFetching: isResendEmailConfirmationFetching } =
		useUserEmailResendQuery({ id: user?._id });
	const {
		refetch: verifyEmailConfirmation,
		isFetching: isVerifyEmailConfirmationFetching,
		isSuccess: isVerifyEmailConfirmationSuccess,
	} = useUserEmailVerifyQuery({ id: user?._id, token });

	// effect hooks
	useEffect(() => {
		if (token && user?._id) verifyEmailConfirmation();
	}, [token, user?._id, verifyEmailConfirmation]);

	useEffect(() => {
		if (token && user?._id && isVerifyEmailConfirmationSuccess) {
			// Invalidate the me query from the cache.
			queryClient.invalidateQueries({ queryKey: ME_KEY_ARRAY, exact: true });
			// Redirect to dashboard
			push("/dashboard");
		}
	}, [isVerifyEmailConfirmationSuccess, push, queryClient, token, user?._id]);

	return (
		<section className="py-4">
			<div className="container">
				<div className="row gy-5 mt-0 justify-content-center">
					<div className="col-12 col-xl-6 col-xxl-5 mt-0">
						<h1 className="text-capitalize text-center">
							<strong>{title}</strong>
						</h1>
					</div>
					<div className="col-12 m-0"></div>
					<div className="col-12 col-md-10 col-lg-8 col-xl-6 col-xxl-5">
						<div className="vstack gap-4 text-center align-items-center">
							<p className="mb-0">
								Please check your email inbox for the link to verify your email and
								complete your registration process. Consider checking your spam/Junk
								folder. <br />
								It may be received 5 mins late so please be patient.
							</p>
							<p className="mb-0">
								Didn't receive an email yet?
								<button
									type="button"
									className="btn btn-link py-0 px-1 mx-1 rounded-0 text-capitalize text-decoration-none"
									onClick={() => resendEmailConfirmation()}
									disabled={
										isResendEmailConfirmationFetching ||
										isVerifyEmailConfirmationFetching
									}>
									<strong>send again</strong>
									{isResendEmailConfirmationFetching && (
										<span
											className="spinner-border spinner-border-sm ms-2"
											role="status">
											<span className="visually-hidden">Loading...</span>
										</span>
									)}
								</button>
							</p>
							<NextLink
								href="/dashboard"
								className="btn btn-lg btn-link text-capitalize text-decoration-none">
								<strong>skip for now</strong>
							</NextLink>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UserEmailVerification;
