"use client";

import classNames from "classnames";
import useBrandsInfinityQuery from "hooks/useBrandsInfinityQuery";
import IBrand from "interfaces/Brand.interface";
import Image from "next/image";
import { Fragment, useState } from "react";
import { type GetBrandsDataType } from "services/api/e-shop/brands";
import { filterObjectFalsyValues } from "utils/helpers";
import NextLink from "views/components/NextLink";
import Pagination from "views/components/Pagination";
import { default as BrandsFilterForm } from "views/forms/BrandsFilter";

const BrandsList = () => {
	// state hooks
	const [brandsParamsState, setBrandsParamsState] = useState<GetBrandsDataType | undefined>(
		undefined
	);

	// server side hooks
	const {
		data: { pages = [] } = {},
		isLoading: isBrandsLoading,
		hasNextPage: hasBrandsNextPage,
		fetchNextPage: fetchBrandsNextPage,
		isFetchingNextPage: isBrandsFetchingNextPage,
		hasPreviousPage: hasBrandsPreviousPage,
		fetchPreviousPage: fetchBrandsPreviousPage,
		isFetchingPreviousPage: isBrandsFetchingPreviousPage,
	} = useBrandsInfinityQuery(brandsParamsState);

	// constants
	const lastPage = pages.at(-1);
	const page = lastPage?.meta?.pagination?.page || 1;
	const totalPages = lastPage?.meta?.pagination?.totalPages || 1;
	const totalDocs = lastPage?.meta?.pagination?.totalDocs || 0;

	return (
		<section className="brands-list py-4">
			<div className="row gy-4">
				<div className="col-12">
					<BrandsFilterForm
						onSubmit={(value) => setBrandsParamsState(filterObjectFalsyValues(value))}
						totalDocs={totalDocs}
						sort={lastPage?.meta?.sort || []}
					/>
				</div>
				<div className="col-12">
					<div className="table-responsive">
						<table className="table table-striped align-middle">
							<caption className="visually-hidden">List of brands</caption>
							<thead className="table-primary">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Products count</th>
									<th scope="col">Deleted</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody className="table-group-divider">
								{[...(isBrandsLoading ? Array(1).map((_x, i) => i) : pages)].map(
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
												...(isBrandsLoading
													? Array(5).map(
															(_x, i) =>
																({ _id: String(i) }) as IBrand
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
													...(isBrandsLoading
														? Array(5).map(
																(_x, i) =>
																	({ _id: String(i) }) as IBrand
															)
														: [
																...((typeof page === "object" &&
																	!Array.isArray(page) &&
																	page !== null &&
																	page?.data) ||
																	[]),
															]),
												].map((singleBrand, singleBrandIndex) => (
													<Fragment key={singleBrand?._id}>
														{isBrandsLoading ? (
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
																	{singleBrandIndex +
																		1 +
																		((
																			rowPages?.[
																				pageIndex - 1
																			] as {
																				data: IBrand[];
																			}
																		)?.data.length || 0)}
																</th>
																<td>
																	<span className="hstack gap-2 flex-nowrap">
																		{typeof singleBrand.logo !==
																			"string" &&
																			singleBrand.logo
																				?.path && (
																				<span className="flex-shrink-0">
																					<Image
																						src={
																							singleBrand
																								.logo
																								.path
																						}
																						className="w-22px h-22px object-fit-scale-down rounded"
																						width="22"
																						height="22"
																						alt={
																							singleBrand
																								?.logo
																								?.alt ||
																							singleBrand.name
																						}
																					/>
																				</span>
																			)}
																		<span className="flex-grow-1">
																			{singleBrand.name}
																		</span>
																	</span>
																</td>
																<td>
																	<span>
																		{singleBrand.productsCount}
																	</span>
																</td>
																<td>
																	<span
																		className={classNames(
																			"badge",
																			{
																				"bg-success":
																					!singleBrand.deleted,
																				"text-success":
																					!singleBrand.deleted,
																				"bg-danger":
																					singleBrand.deleted,
																				"text-danger":
																					singleBrand.deleted,
																			}
																		)}>
																		{singleBrand.deleted
																			? "Deleted"
																			: "Active"}
																	</span>
																</td>
																<td>
																	<div className="btn-group">
																		<NextLink
																			href={`/dashboard/brands/${singleBrand?.slug || singleBrand._id}/edit`}
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
																			className="btn btn-sm btn-link link-danger">
																			<svg
																				className="bi w-20px h-20px"
																				height="20"
																				width="20">
																				<use href="#icon-trash"></use>
																			</svg>
																		</button>
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
							disabled={isBrandsLoading}
							page={page}
							totalPages={totalPages}
							hasNextPage={hasBrandsNextPage}
							fetchNextPage={fetchBrandsNextPage}
							hasPreviousPage={hasBrandsPreviousPage}
							fetchPreviousPage={fetchBrandsPreviousPage}
							isFetchingNextPage={isBrandsFetchingNextPage}
							isFetchingPreviousPage={isBrandsFetchingPreviousPage}
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default BrandsList;
