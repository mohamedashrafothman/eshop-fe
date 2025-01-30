"use client";

import useUsersInfinityQuery from "hooks/useUsersInfinityQuery";
import { useState } from "react";
import Pagination from "views/components/Pagination";
import { default as UsersFilterForm } from "views/forms/UsersFilter";

const UsersList = () => {
	// state hooks
	const [usersQueryState, setUsersQueryState] = useState({});

	// server side hooks
	const {
		data: { pages = [] } = {},
		isLoading: isUsersLoading,
		hasNextPage: hasUsersNextPage,
		fetchNextPage: fetchUsersNextPage,
		isFetchingNextPage: isUsersFetchingNextPage,
		hasPreviousPage: hasUsersPreviousPage,
		fetchPreviousPage: fetchUsersPreviousPage,
		isFetchingPreviousPage: isUsersFetchingPreviousPage,
	} = useUsersInfinityQuery(usersQueryState);

	// constants
	const lastPage = pages.at(-1);
	const page = lastPage?.meta?.pagination?.page || 1;
	const totalPages = lastPage?.meta?.pagination?.totalPages || 1;
	const totalDocs = lastPage?.meta?.pagination?.totalDocs || 1;

	console.log("pages: ", pages);
	console.log("isUsersLoading: ", isUsersLoading);
	console.log("hasUsersNextPage: ", hasUsersNextPage);
	console.log("hasUsersPreviousPage: ", hasUsersPreviousPage);

	return (
		<section className="users-list">
			<div className="row gy-4">
				<div className="col-12">
					<div className="card text-bg-gray-300 border-0 rounded-4">
						<div className="card-body">
							<div className="row justify-content-md-between align-items-md-center flex-md-nowrap">
								<div className="col-12 col-md-auto">
									<p className="text-secondary fs-4 text-capitalize hstack gap-2 mb-0">
										<span className="badge bg-primary">{totalDocs}</span>
										Users
									</p>
								</div>
								<div className="col-12 col-md-auto">
									<UsersFilterForm
										onSubmit={(val) =>
											setUsersQueryState((prev) => ({ ...prev, ...val }))
										}
										sort={lastPage?.meta?.sort || []}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12">
					{JSON.stringify(lastPage?.data?.map((user) => user.name))}
				</div>
				{lastPage?.data && lastPage?.data?.length >= 1 && Number(totalPages) > 1 && (
					<div className="col-auto ms-auto">
						<Pagination
							disabled={isUsersLoading}
							page={page}
							totalPages={totalPages}
							hasNextPage={hasUsersNextPage}
							fetchNextPage={fetchUsersNextPage}
							hasPreviousPage={hasUsersPreviousPage}
							fetchPreviousPage={fetchUsersPreviousPage}
							isFetchingNextPage={isUsersFetchingNextPage}
							isFetchingPreviousPage={isUsersFetchingPreviousPage}
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default UsersList;
