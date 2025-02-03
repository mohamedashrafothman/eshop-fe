"use client";

import useUsersInfinityQuery from "hooks/useUsersInfinityQuery";
import { useState } from "react";
import { type GetUsersDataType } from "services/api/e-shop/users";
import { filterObjectFalsyValues } from "utils/helpers";
import Pagination from "views/components/Pagination";
import { default as UsersFilterForm } from "views/forms/UsersFilter";

const UsersList = () => {
	// state hooks
	const [usersQueryState, setUsersQueryState] = useState<GetUsersDataType>({ limit: 1 });

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
	const totalDocs = lastPage?.meta?.pagination?.totalDocs || 0;

	return (
		<section className="users-list">
			<div className="row gy-4">
				<div className="col-12">
					<div className="card text-bg-gray-300 border-0 rounded-4">
						<div className="card-body">
							<UsersFilterForm
								onSubmit={(val) =>
									setUsersQueryState((prev) =>
										filterObjectFalsyValues({ ...prev, ...val })
									)
								}
								totalDocs={totalDocs}
								sort={lastPage?.meta?.sort || []}
							/>
						</div>
					</div>
				</div>
				<div className="col-12">
					{JSON.stringify(
						lastPage?.data?.map((user) => user.name),
						null,
						2
					)}
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
