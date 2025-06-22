"use client";

import classNames from "classnames";
import useCountriesInfinityQuery from "hooks/useCountriesInfinityQuery";
import ICountry from "interfaces/Country.interface";
import { Fragment, useState } from "react";
import { type GetCountriesDataType } from "services/api/e-shop/countries";
import { filterObjectFalsyValues } from "utils/helpers";
import NextLink from "views/components/NextLink";
import Pagination from "views/components/Pagination";
import { default as CountriesFilterForm } from "views/forms/CountriesFilter";
import { default as DeleteOrRestoreSingleCountryModal } from "views/modals/DeleteOrRestoreSingleCountry";

const CountriesList = () => {
	// state hooks
	const [countriesParamsState, setCountriesParamsState] = useState<
		GetCountriesDataType | undefined
	>(undefined);

	// server side hooks
	const {
		data: { pages = [] } = {},
		isLoading: isCountriesLoading,
		hasNextPage: hasCountriesNextPage,
		fetchNextPage: fetchCountriesNextPage,
		isFetchingNextPage: isCountriesFetchingNextPage,
		hasPreviousPage: hasCountriesPreviousPage,
		fetchPreviousPage: fetchCountriesPreviousPage,
		isFetchingPreviousPage: isCountriesFetchingPreviousPage,
	} = useCountriesInfinityQuery(countriesParamsState);

	// constants
	const lastPage = pages.at(-1);
	const page = lastPage?.meta?.pagination?.page || 1;
	const totalPages = lastPage?.meta?.pagination?.totalPages || 1;
	const totalDocs = lastPage?.meta?.pagination?.totalDocs || 0;

	return (
		<section className="countries-list py-4">
			<div className="row gy-4">
				<div className="col-12">
					<CountriesFilterForm
						onSubmit={(value) =>
							setCountriesParamsState(filterObjectFalsyValues(value))
						}
						totalDocs={totalDocs}
						sort={lastPage?.meta?.sort || []}
					/>
				</div>
				<div className="col-12">
					<div className="table-responsive">
						<table className="table table-sm table-striped align-middle">
							<caption className="visually-hidden">List of countries</caption>
							<thead className="table-primary">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Code</th>
									<th scope="col">Deleted</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody className="table-group-divider">
								{[...(isCountriesLoading ? Array(1).map((_x, i) => i) : pages)].map(
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
												...(isCountriesLoading
													? Array(5).map(
															(_x, i) =>
																({ _id: String(i) }) as ICountry
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
													...(isCountriesLoading
														? Array(5).map(
																(_x, i) =>
																	({ _id: String(i) }) as ICountry
															)
														: [
																...((typeof page === "object" &&
																	!Array.isArray(page) &&
																	page !== null &&
																	page?.data) ||
																	[]),
															]),
												].map((singleCountry, singleCountryIndex) => (
													<Fragment key={singleCountry?._id}>
														{isCountriesLoading ? (
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
															</tr>
														) : (
															<tr>
																<th scope="row">
																	{singleCountryIndex +
																		1 +
																		((
																			rowPages?.[
																				pageIndex - 1
																			] as {
																				data: ICountry[];
																			}
																		)?.data.length || 0)}
																</th>
																<td>{singleCountry.name}</td>
																<td>{singleCountry.code}</td>
																<td>
																	<span
																		className={classNames(
																			"badge",
																			{
																				"bg-success":
																					!singleCountry.deleted,
																				"text-success":
																					!singleCountry.deleted,
																				"bg-danger":
																					singleCountry.deleted,
																				"text-danger":
																					singleCountry.deleted,
																			}
																		)}>
																		{singleCountry.deleted
																			? "Deleted"
																			: "Active"}
																	</span>
																</td>
																<td>
																	<div className="btn-group">
																		<NextLink
																			href={`/dashboard/addresses/countries/${singleCountry.slug || singleCountry._id}/edit`}
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
																			data-bs-target={`#deleteOrRestoreSingleCountry${singleCountry._id}Modal`}
																			className={classNames(
																				"btn btn-sm btn-link",
																				{
																					"link-primary":
																						singleCountry.deleted,
																					"link-danger":
																						!singleCountry.deleted,
																				}
																			)}
																			title={
																				singleCountry.deleted
																					? "Restore"
																					: "Delete"
																			}>
																			<svg
																				className="bi w-20px h-20px"
																				height="20"
																				width="20">
																				<use
																					href={
																						singleCountry.deleted
																							? "#icon-return"
																							: "#icon-trash"
																					}></use>
																			</svg>
																		</button>
																		<DeleteOrRestoreSingleCountryModal
																			country={singleCountry}
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
							disabled={isCountriesLoading}
							page={page}
							totalPages={totalPages}
							hasNextPage={hasCountriesNextPage}
							fetchNextPage={fetchCountriesNextPage}
							hasPreviousPage={hasCountriesPreviousPage}
							fetchPreviousPage={fetchCountriesPreviousPage}
							isFetchingNextPage={isCountriesFetchingNextPage}
							isFetchingPreviousPage={isCountriesFetchingPreviousPage}
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default CountriesList;
