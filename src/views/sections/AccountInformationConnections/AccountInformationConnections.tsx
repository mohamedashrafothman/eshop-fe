"use client";

import { useQueryClient } from "@tanstack/react-query";
import { KEY_ARRAY as ME_KEY_QUERY } from "hooks/useMeQuery";
import { signIn, useSession } from "next-auth/react";
import FacebookOAuthButton from "views/components/FacebookOAuthButton";
import GoogleOAuthButton from "views/components/GoogleOAuthButton";

const AccountInformationConnections = () => {
	const queryClient = useQueryClient();
	const { data: session } = useSession();

	// Handle form submission.
	const onLinkSuccessHandler = async (response: any): Promise<void> => {
		// Remove the me query from the cache.
		queryClient.invalidateQueries({ queryKey: ME_KEY_QUERY, exact: true });

		// Extract user, and tokens data from the response.
		const {
			accessToken = "",
			refreshToken = "",
			tokenType = "",
			...user
		} = response?.entities?.data || {};

		// Call the signIn function from next-auth.
		if (accessToken || refreshToken || tokenType || Object.keys(user).length > 0)
			await signIn("credentials", {
				...((accessToken || session?.accessToken) && {
					accessToken: JSON.stringify(accessToken || session?.accessToken),
				}),
				...((refreshToken || session?.refreshToken) && {
					refreshToken: JSON.stringify(refreshToken || session?.refreshToken),
				}),
				...((tokenType || session?.tokenType) && {
					tokenType: JSON.stringify(tokenType || session?.tokenType),
				}),
				...(Object.keys(user).length > 0 && { user: JSON.stringify(user) }),
				redirect: false,
			});
	};

	return (
		<section className="account-information-connections py-4">
			<div className="row gy-4 gy-lg-0">
				<div className="col-12 col-lg-5 col-xxl-4">
					<div className="row gy-4">
						<div className="col-12">
							<h2 className="h3 text-capitalize">
								<strong>
									<small>Social Connections</small>
								</strong>
							</h2>
						</div>
						<div className="col-12 col-xxl-10">
							<div className="row gy-3">
								<div className="col-12">
									<GoogleOAuthButton
										className="w-100 justify-content-start"
										onSuccess={onLinkSuccessHandler}
									/>
								</div>
								<div className="col-12">
									<FacebookOAuthButton
										className="w-100 justify-content-start"
										onSuccess={onLinkSuccessHandler}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AccountInformationConnections;
