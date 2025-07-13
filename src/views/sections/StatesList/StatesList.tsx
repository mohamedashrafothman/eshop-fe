"use client";

import classNames from "classnames";
import { isObject } from "formik";
import { useStatesInfinityQuery } from "hooks/useTanstackQuery/useStates";
import ICountry from "interfaces/Country.interface";
import IState from "interfaces/State.interface";
import { Fragment, useState } from "react";
import { type GetStatesDataType } from "services/api/e-shop/states";
import { filterObjectFalsyValues } from "utils/helpers";
import NextLink from "views/components/NextLink";
import Pagination from "views/components/Pagination";
import { default as StatesFilterForm } from "views/forms/StatesFilter";
import { default as DeleteOrRestoreSingleStateModal } from "views/modals/DeleteOrRestoreSingleState";

const StatesList = () => {
	// state hooks
	const [statesParamsState, setStatesParamsState] = useState<GetStatesDataType | undefined>(
		undefined
	);

	// server side hooks
	const {
		data: { pages = [] } = {},
		isLoading: isStatesLoading,
		hasNextPage: hasStatesNextPage,
		fetchNextPage: fetchStatesNextPage,
		isFetchingNextPage: isStatesFetchingNextPage,
		hasPreviousPage: hasStatesPreviousPage,
		fetchPreviousPage: fetchStatesPreviousPage,
		isFetchingPreviousPage: isStatesFetchingPreviousPage,
	} = useStatesInfinityQuery(statesParamsState);

	// constants
	const lastPage = pages.at(-1);
	const page = lastPage?.meta?.pagination?.page || 1;
	const totalPages = lastPage?.meta?.pagination?.totalPages || 1;
	const totalDocs = lastPage?.meta?.pagination?.totalDocs || 0;

	return (
		<section className="states-list py-4">
			<div className="row gy-4">
				<div className="col-12">
					<StatesFilterForm
						onSubmit={(value) => setStatesParamsState(filterObjectFalsyValues(value))}
						totalDocs={totalDocs}
						sort={lastPage?.meta?.sort || []}
					/>
				</div>
				<div className="col-12">
					<div className="table-responsive">
						<table className="table table-sm table-striped align-middle">
							<caption className="visually-hidden">List of states</caption>
							<thead className="table-primary">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Code</th>
									<th scope="col">Country</th>
									<th scope="col">Deleted</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody className="table-group-divider">
								{[...(isStatesLoading ? Array(1).map((_x, i) => i) : pages)].map(
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
												...(isStatesLoading
													? Array(5).map(
															(_x, i) =>
																({ _id: String(i) }) as IState
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
													...(isStatesLoading
														? Array(5).map(
																(_x, i) =>
																	({ _id: String(i) }) as IState
															)
														: [
																...((typeof page === "object" &&
																	!Array.isArray(page) &&
																	page !== null &&
																	page?.data) ||
																	[]),
															]),
												].map((singleState, singleStateIndex) => (
													<Fragment key={singleState?._id}>
														{isStatesLoading ? (
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
															</tr>
														) : (
															<tr>
																<th scope="row">
																	{singleStateIndex +
																		1 +
																		((
																			rowPages?.[
																				pageIndex - 1
																			] as {
																				data: IState[];
																			}
																		)?.data.length || 0)}
																</th>
																<td>{singleState.name}</td>
																<td>{singleState.code}</td>
																<td>
																	{(isObject(
																		singleState.country
																	) &&
																		(
																			singleState.country as ICountry
																		)?.name) ||
																		(singleState.country as string)}
																</td>
																<td>
																	<span
																		className={classNames(
																			"badge",
																			{
																				"bg-success":
																					!singleState.deleted,
																				"text-success":
																					!singleState.deleted,
																				"bg-danger":
																					singleState.deleted,
																				"text-danger":
																					singleState.deleted,
																			}
																		)}>
																		{singleState.deleted
																			? "Deleted"
																			: "Active"}
																	</span>
																</td>
																<td>
																	<div className="btn-group">
																		<NextLink
																			href={`/dashboard/addresses/states/${singleState._id}/edit`}
																			className="btn btn-sm btn-link link-primary">
																			<svg
																				className="bi w-20px h-20px"
																				height="20"
																				width="20">
																				<use href="#icon-pencil-square"></use>
																			</svg>
																		</NextLink>
																		<button
																			type="button"
																			data-bs-toggle="modal"
																			data-bs-target={`#deleteOrRestoreSingleState${singleState._id}Modal`}
																			className={classNames(
																				"btn btn-sm btn-link",
																				{
																					"link-primary":
																						singleState.deleted,
																					"link-danger":
																						!singleState.deleted,
																				}
																			)}
																			title={
																				singleState.deleted
																					? "Restore"
																					: "Delete"
																			}>
																			<svg
																				className="bi w-20px h-20px"
																				height="20"
																				width="20">
																				<use
																					href={
																						singleState.deleted
																							? "#icon-return"
																							: "#icon-trash"
																					}></use>
																			</svg>
																		</button>
																		<DeleteOrRestoreSingleStateModal
																			state={singleState}
																		/>
																	</div>
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
							disabled={isStatesLoading}
							page={page}
							totalPages={totalPages}
							hasNextPage={hasStatesNextPage}
							fetchNextPage={fetchStatesNextPage}
							hasPreviousPage={hasStatesPreviousPage}
							fetchPreviousPage={fetchStatesPreviousPage}
							isFetchingNextPage={isStatesFetchingNextPage}
							isFetchingPreviousPage={isStatesFetchingPreviousPage}
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default StatesList;
