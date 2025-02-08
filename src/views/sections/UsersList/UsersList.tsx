"use client";

import classNames from "classnames";
import useUsersInfinityQuery from "hooks/useUsersInfinityQuery";
import IUser from "interfaces/User.interface";
import moment from "moment";
import { Fragment, useState } from "react";
import { type GetUsersDataType } from "services/api/e-shop/users";
import { filterObjectFalsyValues } from "utils/helpers";
import NextLink from "views/components/NextLink";
import Pagination from "views/components/Pagination";
import { default as UsersFilterForm } from "views/forms/UsersFilter";

const UsersList = () => {
	// state hooks
	const [usersParamsState, setUsersParamsState] = useState<GetUsersDataType | undefined>(
		undefined
	);

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
	} = useUsersInfinityQuery(usersParamsState);

	// constants
	const lastPage = pages.at(-1);
	const page = lastPage?.meta?.pagination?.page || 1;
	const totalPages = lastPage?.meta?.pagination?.totalPages || 1;
	const totalDocs = lastPage?.meta?.pagination?.totalDocs || 0;

	return (
		<section className="users-list py-4">
			<div className="row gy-4">
				<div className="col-12">
					<UsersFilterForm
						onSubmit={(value) => setUsersParamsState(filterObjectFalsyValues(value))}
						totalDocs={totalDocs}
						sort={lastPage?.meta?.sort || []}
					/>
				</div>
				<div className="col-12">
					<div className="table-responsive">
						<table className="table table-striped align-middle">
							<caption className="visually-hidden">List of users</caption>
							<thead className="table-primary">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Email</th>
									<th scope="col">Register Date</th>
									<th scope="col">Login Status</th>
									<th scope="col">Email Verification</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody className="table-group-divider">
								{[...(isUsersLoading ? Array(1).map((_x, i) => i) : pages)].map(
									(page, pageIndex, rowPages) => (
										<Fragment
											key={
												(typeof page === "object" &&
													!Array.isArray(page) &&
													page !== null &&
													page?.meta?.pagination?.page) ||
												pageIndex
											}>
											{[
												...(isUsersLoading
													? Array(5).map(
															(_x, i) => ({ _id: String(i) }) as IUser
														)
													: [
															...((typeof page === "object" &&
																!Array.isArray(page) &&
																page !== null &&
																page?.data) ||
																[]),
														]),
											]?.length ? (
												[
													...(isUsersLoading
														? Array(5).map(
																(_x, i) =>
																	({ _id: String(i) }) as IUser
															)
														: [
																...((typeof page === "object" &&
																	!Array.isArray(page) &&
																	page !== null &&
																	page?.data) ||
																	[]),
															]),
												].map((singleUser, singleUserIndex) => (
													<Fragment key={singleUser?._id}>
														{isUsersLoading ? (
															<tr>
																<th scope="row">
																	<span className="d-block placeholder-glow">
																		<span className="placeholder placeholder-sm bg-secondary d-block w-100">
																			&nbsp;
																		</span>
																	</span>
																</th>
																<td>
																	<span className="d-block placeholder-glow">
																		<span className="placeholder placeholder-sm bg-secondary d-block w-100">
																			&nbsp;
																		</span>
																	</span>
																</td>
																<td>
																	<span className="d-block placeholder-glow">
																		<span className="placeholder placeholder-sm bg-secondary d-block w-100">
																			&nbsp;
																		</span>
																	</span>
																</td>
																<td>
																	<span className="d-block placeholder-glow">
																		<span className="placeholder placeholder-sm bg-secondary d-block w-100">
																			&nbsp;
																		</span>
																	</span>
																</td>
																<td>
																	<span className="d-block placeholder-glow">
																		<span className="placeholder placeholder-sm bg-secondary d-block w-100">
																			&nbsp;
																		</span>
																	</span>
																</td>
																<td>
																	<span className="d-block placeholder-glow">
																		<span className="placeholder placeholder-sm bg-secondary d-block w-100">
																			&nbsp;
																		</span>
																	</span>
																</td>
																<td>
																	<span className="d-block placeholder-glow">
																		<span className="placeholder placeholder-sm bg-secondary d-block w-100">
																			&nbsp;
																		</span>
																	</span>
																</td>
															</tr>
														) : (
															<tr>
																<th scope="row">
																	{singleUserIndex +
																		1 +
																		((
																			rowPages?.[
																				pageIndex - 1
																			] as {
																				data: IUser[];
																			}
																		)?.data.length || 0)}
																</th>
																<td>
																	<span>{singleUser.name}</span>
																</td>
																<td>
																	<span>{singleUser.email}</span>
																</td>
																<td>
																	{moment(
																		singleUser.createdAt
																	).format("DD MMM, YYYY")}
																</td>
																<td>
																	<span
																		className={classNames(
																			"badge",
																			{
																				"bg-success":
																					singleUser.active,
																				"text-success":
																					singleUser.active,
																				"bg-danger":
																					!singleUser.active,
																				"text-danger":
																					!singleUser.active,
																			}
																		)}>
																		{singleUser.active
																			? "Active"
																			: "Inactive"}
																	</span>
																</td>
																<td>
																	<span
																		className={classNames(
																			"badge",
																			{
																				"bg-success":
																					singleUser.emailVerified,
																				"text-success":
																					singleUser.emailVerified,
																				"bg-danger":
																					!singleUser.emailVerified,
																				"text-danger":
																					!singleUser.emailVerified,
																			}
																		)}>
																		{singleUser.emailVerified
																			? "Verified"
																			: "Not Verified"}
																	</span>
																</td>
																<td>
																	<NextLink
																		href={`/dashboard/users/${singleUser.slug}/edit`}
																		className="btn btn-sm btn-link link-primary">
																		<svg
																			className="bi w-20px h-20px"
																			height="20"
																			width="20">
																			<use href="#icon-pencil-square"></use>
																		</svg>
																	</NextLink>
																</td>
															</tr>
														)}
													</Fragment>
												))
											) : (
												<tr>
													<td
														colSpan={7}
														className="text-center text-capitalize">
														<span className="vstack gap-2 align-items-center justify-content-center">
															<svg
																width="50"
																height="50"
																className="text-primary-dark w-50px h-50px">
																<use href="#icon-cone-striped" />
															</svg>
															<span className="fs-4">
																No Data Found
															</span>
														</span>
													</td>
												</tr>
											)}
										</Fragment>
									)
								)}
							</tbody>
						</table>
					</div>
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
