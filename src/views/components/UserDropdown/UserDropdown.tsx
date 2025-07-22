"use client";

import { useLogoutMutation, useMeQuery } from "hooks/useTanstackQuery/useAuth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import Dropdown from "views/components/Dropdown";
import NextLink from "views/components/NextLink";

const UserDropdown = () => {
	const { data: user } = useMeQuery();
	const postLogoutMutation = useLogoutMutation();

	// ref hook
	const postLogoutCancelRequestRef = useRef<AbortController | null>(null);

	// state hook
	const [isLogoutLoadingState, setIsLogoutLoadingState] = useState(false);

	// event handlers
	const onLogoutButtonClickHandler = async () => {
		setIsLogoutLoadingState(true);

		if (postLogoutCancelRequestRef.current?.signal) postLogoutCancelRequestRef.current?.abort();
		postLogoutCancelRequestRef.current = new AbortController();

		await postLogoutMutation.mutateAsync(
			{ data: {}, signal: postLogoutCancelRequestRef.current.signal },
			{
				onError: () => setIsLogoutLoadingState(false),
				onSuccess: async () => {
					// Call the signOut function from next-auth.
					await signOut({ callbackUrl: "/auth/login" });
					// Resetting logout query mutation.
					postLogoutMutation.reset();
					// Reset logout loading state.
					setIsLogoutLoadingState(false);
				},
			}
		);
	};

	return (
		<Dropdown>
			<Dropdown.Toggle
				className="btn btn-primary border-primary-dark rounded-pill p-1 w-100 hstack gap-2 align-items-center flex-nowrap"
				dropdownOptions={{ allowTouch: false }}
				withRotation>
				<Image
					src={`https://placehold.co/50x50/f5f5f5/6a983c.png?text=${
						(user?.name &&
							user.name
								?.split(" ")
								.map((item) => item.slice(0, 1).toUpperCase())
								.slice(0, 2)
								.join("")) ||
						""
					}&font=roboto`}
					className="rounded-circle w-34px h-34px w-lg-50px h-lg-50px object-fit-cover flex-shrink-0"
					width={50}
					height={50}
					alt={`${user?.name} - ${user?.email}`}
					priority={true}
				/>
				<span className="vstack gap-0 text-start align-items-start justify-content-center text-truncate flex-grow-1">
					<strong className="fs-5 text-nowrap text-capitalize text-truncate d-block w-100 mb-n1">
						<span className="d-none d-md-inline">{user?.name || ""}</span>
						<span className="d-md-none">
							{user?.name &&
								user.name
									?.split(" ")
									.map((item) => item.slice(0, 1).toUpperCase())
									.slice(0, 2)
									.join("")}
						</span>
					</strong>
					<small className="op-50 text-nowrap text-lowercase text-truncate d-none d-md-block w-100">
						{user?.email || ""}
					</small>
				</span>
				<span className="rounded-circle w-34px h-34px w-lg-50px h-lg-50px object-fit-cover flex-shrink-0 d-flex align-items-center justify-content-center">
					<svg
						width="26"
						height="26"
						className="w-22px h-22px w-lg-26px h-lg-26px flex-shrink-0">
						<use href="#icon-chevron-down"></use>
					</svg>
				</span>
			</Dropdown.Toggle>
			<Dropdown.Menu className="w-100 shadow my-2">
				<Dropdown.MenuItem>
					<Dropdown.Link
						as={NextLink}
						className="text-capitalize white-space-pre-line"
						href="/dashboard"
						exact>
						Dashboard
					</Dropdown.Link>
				</Dropdown.MenuItem>
				<Dropdown.MenuItem isDivider />
				<Dropdown.MenuItem>
					<Dropdown.Link
						as={NextLink}
						className="text-capitalize white-space-pre-line"
						href="/dashboard/me"
						exact>
						Account information
					</Dropdown.Link>
				</Dropdown.MenuItem>
				<Dropdown.MenuItem isDivider />
				<Dropdown.MenuItem>
					<Dropdown.Link
						as="button"
						type="button"
						className="text-capitalize white-space-pre-line"
						onClick={() => onLogoutButtonClickHandler()}
						disabled={isLogoutLoadingState}>
						Logout
						{isLogoutLoadingState && (
							<span className="spinner-border spinner-border-sm ms-2" role="status">
								<span className="visually-hidden">Loading...</span>
							</span>
						)}
					</Dropdown.Link>
				</Dropdown.MenuItem>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default UserDropdown;
