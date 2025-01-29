"use client";

import useUsersInfinityQuery from "hooks/useUsersInfinityQuery";
import Pagination from "views/components/Pagination";

const UsersList = () => {
	const {
		data: usersPages,
		isLoading: isUsersLoading,
		hasNextPage: hasUsersNextPage,
		fetchNextPage: fetchUsersNextPage,
		// isFetchingNextPage: isUsersFetchingNextPage,
		hasPreviousPage: hasUsersPreviousPage,
		fetchPreviousPage: fetchUsersPreviousPage,
		// isFetchingPreviousPage: isUsersFetchingPreviousPage,
	} = useUsersInfinityQuery({ limit: 1 });

	console.log("usersPages: ", usersPages);
	console.log("isUsersLoading: ", isUsersLoading);
	console.log("hasUsersNextPage: ", hasUsersNextPage);
	console.log("hasUsersPreviousPage: ", hasUsersPreviousPage);

	return (
		<section className="users-list">
			<div className="row gy-4">
				<div className="col-12">Filter</div>
				<div className="col-12">Data grid</div>
				<div className="col-auto ms-auto">
					<Pagination
						disabled={isUsersLoading}
						page={usersPages?.pages?.at(-1)?.meta?.pagination?.page || 1}
						totalPages={usersPages?.pages?.at(-1)?.meta?.pagination?.totalPages || 1}
						hasNextPage={hasUsersNextPage}
						fetchNextPage={fetchUsersNextPage}
						hasPreviousPage={hasUsersPreviousPage}
						fetchPreviousPage={fetchUsersPreviousPage}
					/>
				</div>
			</div>
		</section>
	);
};

export default UsersList;
