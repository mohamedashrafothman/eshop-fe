"use client";

import Dropdown from "bootstrap/js/dist/dropdown";
import useLogoutMutation from "hooks/useLogoutMutation";
import useMeQuery from "hooks/useMeQuery";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NextLink from "views/components/NextLink";

const UserDropdown = () => {
	const { data: me } = useMeQuery();
	const postLogoutMutation = useLogoutMutation();

	// ref hook
	const dropdownRef = useRef<HTMLButtonElement | null>(null);
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

	// effect hook
	useEffect(() => {
		const dropdownRefCurrent = dropdownRef?.current;
		let dropdown: Dropdown | null;
		if (dropdownRefCurrent) {
			dropdown = Dropdown.getInstance(dropdownRefCurrent);
			if (!dropdown) dropdown = new Dropdown(dropdownRefCurrent);
		}
		return () => {
			if (dropdownRefCurrent && dropdown) Dropdown.getInstance(dropdownRefCurrent)?.dispose();
		};
	}, []);

	return (
		<div className="dropdown">
			<button
				className="dropdown-toggle dropdown-toggle-with-rotate-icon btn btn-primary p-2 pe-3 w-100 border-0 hstack gap-2 align-items-center flex-nowrap"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
				ref={dropdownRef}>
				<Image
					src={`https://placehold.co/50x50/f5f5f5/6a983c.png?text=${
						(me?.entities.data.name &&
							me?.entities.data.name
								?.split(" ")
								.map((item) => item.slice(0, 1).toUpperCase())
								.join("")) ||
						""
					}&font=roboto`}
					className="rounded-circle w-50px h-50px object-fit-cover flex-shrink-0"
					width={50}
					height={50}
					alt={`${me?.entities.data.name} - ${me?.entities.data.email}`}
					priority={true}
				/>
				<div className="vstack gap-0 text-start align-items-start justify-content-center text-truncate flex-grow-1">
					<strong className="text-nowrap text-capitalize text-truncate d-block w-100">
						{me?.entities.data.name}
					</strong>
					<small className="op-50 text-nowrap text-lowercase text-truncate d-block w-100">
						{me?.entities.data.email}
					</small>
				</div>
				<svg width="20" height="20" className="w-20px h-20px flex-shrink-0">
					<use href="#icon-chevron-down"></use>
				</svg>
			</button>
			<ul className="dropdown-menu w-100 shadow my-2">
				<li>
					<NextLink className="dropdown-item text-capitalize" href="/dashboard/users/me">
						Profile
					</NextLink>
				</li>
				<li>
					<hr className="dropdown-divider border" />
				</li>
				<li>
					<button
						type="button"
						className="dropdown-item text-capitalize"
						onClick={() => onLogoutButtonClickHandler()}
						disabled={isLogoutLoadingState}>
						Logout
						{isLogoutLoadingState && (
							<span className="spinner-border spinner-border-sm ms-2" role="status">
								<span className="visually-hidden">Loading...</span>
							</span>
						)}
					</button>
				</li>
			</ul>
		</div>
	);
};

export default UserDropdown;
