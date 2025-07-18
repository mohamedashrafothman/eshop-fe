"use client";

import classNames from "classnames";
import { useProductsInfinityQuery } from "hooks/useTanstackQuery/useProducts";
import IProduct from "interfaces/Product.interface";
import Image from "next/image";
import { useState } from "react";
import { type GetProductsDataType } from "services/api/e-shop/products";
import { filterObjectFalsyValues, flattenDeep } from "utils/helpers";
import NextLink from "views/components/NextLink";
import Pagination from "views/components/Pagination";
import RatingStars from "views/components/RatingStars";
import { default as ProductsFilterForm } from "views/forms/ProductsFilter";
import { default as DeleteOrRestoreSingleProductModal } from "views/modals/DeleteOrRestoreSingleProduct";

const ProductsList = () => {
	// state hooks
	const [productsParamsState, setProductsParamsState] = useState<GetProductsDataType | undefined>(
		undefined
	);

	// server side hooks
	const {
		data: { pages = [] } = {},
		isLoading: isProductsLoading,
		hasNextPage: hasProductsNextPage,
		fetchNextPage: fetchProductsNextPage,
		isFetchingNextPage: isProductsFetchingNextPage,
		hasPreviousPage: hasProductsPreviousPage,
		fetchPreviousPage: fetchProductsPreviousPage,
		isFetchingPreviousPage: isProductsFetchingPreviousPage,
	} = useProductsInfinityQuery(productsParamsState);

	// constants
	const lastPage = pages.at(-1);
	const page = lastPage?.meta?.pagination?.page || 1;
	const totalPages = lastPage?.meta?.pagination?.totalPages || 1;
	const totalDocs = lastPage?.meta?.pagination?.totalDocs || 0;
	const productsList = flattenDeep(pages.map((page) => page?.data || []));

	return (
		<section className="products-list py-4">
			<div className="row gy-4">
				<div className="col-12">
					<ProductsFilterForm
						onSubmit={(value) => setProductsParamsState(filterObjectFalsyValues(value))}
						totalDocs={totalDocs}
						sort={lastPage?.meta?.sort || []}
					/>
				</div>
				<div className="col-12">
					<div className="table-responsive">
						<table className="table table-sm table-striped align-middle">
							<caption className="visually-hidden">List of products</caption>
							<thead className="table-primary">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Price</th>
									<th scope="col">Variations</th>
									<th scope="col">Brand</th>
									<th scope="col">Categories</th>
									<th scope="col">Reviews</th>
									<th scope="col">featured</th>
									<th scope="col">Deleted</th>
									<th scope="col">Actions</th>
								</tr>
							</thead>
							<tbody className="table-group-divider">
								{isProductsLoading ? (
									Array.from(
										{ length: 12 },
										(_, i) => ({ _id: String(i) }) as Pick<IProduct, "_id">
									).map((singleProduct) => (
										<tr key={singleProduct._id}>
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
									))
								) : productsList?.length > 0 ? (
									productsList.map((singleProduct, singleProductIndex) => (
										<tr key={singleProduct._id}>
											<th scope="row">{singleProductIndex + 1}</th>
											<td>
												<span className="hstack gap-2 flex-nowrap">
													{typeof singleProduct.thumbnail !== "string" &&
														singleProduct.thumbnail?.path && (
															<span className="flex-shrink-0">
																<Image
																	src={
																		singleProduct.thumbnail.path
																	}
																	className="w-22px h-22px object-fit-scale-down rounded"
																	width="22"
																	height="22"
																	alt={
																		singleProduct?.thumbnail
																			?.alt ||
																		singleProduct.name
																	}
																/>
															</span>
														)}
													<span className="flex-grow-1">
														{singleProduct.name}
													</span>
												</span>
											</td>
											<td>
												<p className="mb-0 hstack gap-1 flex-nowrap">
													{Boolean(singleProduct.price.sale) && (
														<del>{singleProduct.price.normal}LE</del>
													)}
													<strong className="fs-5">
														{singleProduct.price.sale ||
															singleProduct.price.normal}
														LE
													</strong>
													{Boolean(singleProduct.price.percentage) && (
														<small>
															<em>
																{`${singleProduct.price.percentage}% off`}
															</em>
														</small>
													)}
												</p>
											</td>
											<td>
												<dl className="row mb-0 w-100 text-capitalize">
													<dt className="col-3 col-xl-2">size:</dt>
													<dd className="col-9 col-xl-10 mb-0">
														{singleProduct.sizes.join(" - ")}
													</dd>
													<dt className="col-3 col-xl-2">color:</dt>
													<dd className="col-9 col-xl-10 mb-0">
														{singleProduct.colors
															.map((color) => color.name)
															.join(" - ")}
													</dd>
												</dl>
											</td>
											<td>
												{typeof singleProduct.brand !== "string" ? (
													<span className="hstack gap-2 flex-nowrap">
														{typeof singleProduct.brand?.logo !==
															"string" &&
															singleProduct.brand?.logo?.path && (
																<span className="flex-shrink-0">
																	<Image
																		src={
																			singleProduct?.brand
																				?.logo?.path
																		}
																		className="w-22px h-22px object-fit-scale-down rounded"
																		width="22"
																		height="22"
																		alt={
																			singleProduct.brand
																				?.logo?.alt ||
																			singleProduct.brand
																				?.name
																		}
																	/>
																</span>
															)}
														<span className="flex-grow-1">
															{singleProduct.brand?.name}
														</span>
													</span>
												) : (
													<>-</>
												)}
											</td>
											<td>
												{typeof singleProduct.category !== "string" ? (
													<span className="text-capitalize">
														{singleProduct.category.name}
													</span>
												) : (
													"-"
												)}
											</td>
											<td>
												<span className="hstack gap-1 flex-nowrap align-items-center lh-1">
													<RatingStars
														value={singleProduct.averageRating}
													/>
													<small className="flex-shrink-0">
														<em>{singleProduct.reviewCount}</em>
													</small>
												</span>
											</td>
											<td>
												<span
													className={classNames("badge", {
														"bg-success": singleProduct.isFeatured,
														"text-success": singleProduct.isFeatured,
														"bg-gray-700": !singleProduct.isFeatured,
														"text-gray-800": !singleProduct.isFeatured,
													})}>
													{singleProduct.isFeatured
														? "Featured"
														: "Not Featured"}
												</span>
											</td>
											<td>
												<span
													className={classNames("badge", {
														"bg-success": !singleProduct.deleted,
														"text-success": !singleProduct.deleted,
														"bg-danger": singleProduct.deleted,
														"text-danger": singleProduct.deleted,
													})}>
													{singleProduct.deleted ? "Deleted" : "Active"}
												</span>
											</td>
											<td>
												<div className="btn-group">
													<NextLink
														href={`/dashboard/products/${singleProduct._id}/edit`}
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
														data-bs-target={`#deleteOrRestoreSingleProduct${singleProduct._id}Modal`}
														className={classNames(
															"btn btn-sm btn-link",
															{
																"link-primary":
																	singleProduct.deleted,
																"link-danger":
																	!singleProduct.deleted,
															}
														)}
														title={
															singleProduct.deleted
																? "Restore"
																: "Delete"
														}>
														<svg
															className="bi w-20px h-20px"
															height="20"
															width="20">
															<use
																href={
																	singleProduct.deleted
																		? "#icon-return"
																		: "#icon-trash"
																}></use>
														</svg>
													</button>
													<DeleteOrRestoreSingleProductModal
														product={singleProduct}
													/>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={11} className="text-center text-capitalize">
											<span className="vstack gap-2 align-items-center justify-content-center">
												<svg
													width="50"
													height="50"
													className="text-primary-dark w-50px h-50px">
													<use href="#icon-cone-striped" />
												</svg>
												<span className="fs-4">No Data Found</span>
											</span>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
				{lastPage?.data && lastPage?.data?.length >= 1 && Number(totalPages) > 1 && (
					<div className="col-auto ms-auto">
						<Pagination
							disabled={isProductsLoading}
							page={page}
							totalPages={totalPages}
							hasNextPage={hasProductsNextPage}
							fetchNextPage={fetchProductsNextPage}
							hasPreviousPage={hasProductsPreviousPage}
							fetchPreviousPage={fetchProductsPreviousPage}
							isFetchingNextPage={isProductsFetchingNextPage}
							isFetchingPreviousPage={isProductsFetchingPreviousPage}
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default ProductsList;
