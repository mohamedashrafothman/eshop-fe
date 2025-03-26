"use client";

import classNames from "classnames";
import { isObject } from "formik";
import useCitiesInfinityQuery from "hooks/useCitiesInfinityQuery";
import ICity from "interfaces/City.interface";
import ICountry from "interfaces/Country.interface";
import IState from "interfaces/State.interface";
import { Fragment, useState } from "react";
import { type GetCitiesDataType } from "services/api/e-shop/cities";
import { filterObjectFalsyValues } from "utils/helpers";
import NextLink from "views/components/NextLink";
import Pagination from "views/components/Pagination";
import { default as CitiesFilterForm } from "views/forms/CitiesFilter";
import { default as DeleteOrRestoreSingleCityModal } from "views/modals/DeleteOrRestoreSingleCity";

const CitiesList = () => {
	// state hooks
	const [citiesParamsState, setCitiesParamsState] = useState<GetCitiesDataType | undefined>(
		undefined
	);

	// server side hooks
	const {
		data: { pages = [] } = {},
		isLoading: isCitiesLoading,
		hasNextPage: hasCitiesNextPage,
		fetchNextPage: fetchCitiesNextPage,
		isFetchingNextPage: isCitiesFetchingNextPage,
		hasPreviousPage: hasCitiesPreviousPage,
		fetchPreviousPage: fetchCitiesPreviousPage,
		isFetchingPreviousPage: isCitiesFetchingPreviousPage,
	} = useCitiesInfinityQuery(citiesParamsState);

	// constants
	const lastPage = pages.at(-1);
	const page = lastPage?.meta?.pagination?.page || 1;
	const totalPages = lastPage?.meta?.pagination?.totalPages || 1;
	const totalDocs = lastPage?.meta?.pagination?.totalDocs || 0;

	return (
		<section className="cities-list py-4">
			<div className="row gy-4">
				<div className="col-12">
					<CitiesFilterForm
						onSubmit={(value) => setCitiesParamsState(filterObjectFalsyValues(value))}
						totalDocs={totalDocs}
						sort={lastPage?.meta?.sort || []}
					/>
				</div>
				<div className="col-12">
					<div className="table-responsive">
						<table className="table table-striped align-middle">
							<caption className="visually-hidden">List of cities</caption>
							<thead className="table-primary">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Country</th>
									<th scope="col">state</th>
									<th scope="col">Deleted</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody className="table-group-divider">
								{[...(isCitiesLoading ? Array(1).map((_x, i) => i) : pages)].map(
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
												...(isCitiesLoading
													? Array(5).map(
															(_x, i) => ({ _id: String(i) }) as ICity
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
													...(isCitiesLoading
														? Array(5).map(
																(_x, i) =>
																	({ _id: String(i) }) as ICity
															)
														: [
																...((typeof page === "object" &&
																	!Array.isArray(page) &&
																	page !== null &&
																	page?.data) ||
																	[]),
															]),
												].map((singleCity, singleCityIndex) => (
													<Fragment key={singleCity?._id}>
														{isCitiesLoading ? (
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
																	{singleCityIndex +
																		1 +
																		((
																			rowPages?.[
																				pageIndex - 1
																			] as {
																				data: ICity[];
																			}
																		)?.data.length || 0)}
																</th>
																<td>{singleCity.name}</td>
																<td>
																	{(isObject(
																		singleCity.country
																	) &&
																		(
																			singleCity.country as ICountry
																		)?.name) ||
																		(singleCity.country as string)}
																</td>
																<td>
																	{(isObject(singleCity.state) &&
																		(singleCity.state as IState)
																			?.name) ||
																		(singleCity.state as string)}
																</td>
																<td>
																	<span
																		className={classNames(
																			"badge",
																			{
																				"bg-success":
																					!singleCity.deleted,
																				"text-success":
																					!singleCity.deleted,
																				"bg-danger":
																					singleCity.deleted,
																				"text-danger":
																					singleCity.deleted,
																			}
																		)}>
																		{singleCity.deleted
																			? "Deleted"
																			: "Active"}
																	</span>
																</td>
																<td>
																	<div className="btn-group">
																		<NextLink
																			href={`/dashboard/addresses/cities/${singleCity.slug || singleCity._id}/edit`}
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
																			data-bs-target={`#deleteOrRestoreSingleCity${singleCity._id}Modal`}
																			className={classNames(
																				"btn btn-sm btn-link",
																				{
																					"link-primary":
																						singleCity.deleted,
																					"link-danger":
																						!singleCity.deleted,
																				}
																			)}
																			title={
																				singleCity.deleted
																					? "Restore"
																					: "Delete"
																			}>
																			<svg
																				className="bi w-20px h-20px"
																				height="20"
																				width="20">
																				<use
																					href={
																						singleCity.deleted
																							? "#icon-return"
																							: "#icon-trash"
																					}></use>
																			</svg>
																		</button>
																		<DeleteOrRestoreSingleCityModal
																			city={singleCity}
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
							disabled={isCitiesLoading}
							page={page}
							totalPages={totalPages}
							hasNextPage={hasCitiesNextPage}
							fetchNextPage={fetchCitiesNextPage}
							hasPreviousPage={hasCitiesPreviousPage}
							fetchPreviousPage={fetchCitiesPreviousPage}
							isFetchingNextPage={isCitiesFetchingNextPage}
							isFetchingPreviousPage={isCitiesFetchingPreviousPage}
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default CitiesList;
