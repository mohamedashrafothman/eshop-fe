"use client";

import { useSingleCategoriesQuery } from "hooks/useTanstackQuery/useCategories";
import { useProductsInfinityQuery } from "hooks/useTanstackQuery/useProducts";
import ICategory from "interfaces/Category.interface";
import IProduct from "interfaces/Product.interface";
import { useSearchParams } from "next/navigation";
import qs from "qs";
import { useEffect, useState } from "react";
import { type GetProductsDataType } from "services/api/e-shop/products";
import { flattenDeep } from "utils/helpers";
import { getCategoryHierarchy } from "utils/helpers/categories";
import Breadcrumb from "views/components/Breadcrumb";
import Pagination from "views/components/Pagination";

type Props = { title: string };

const Products = ({ title = "" }: Props) => {
	const searchParams = useSearchParams();
	const categoryValue = searchParams.get("category") || "";

	// server side hooks
	const { data: category, isLoading: isCategoryLoading } =
		useSingleCategoriesQuery(categoryValue);

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
	} = useProductsInfinityQuery(isCategoryLoading ? undefined : productsParamsState);

	// constants
	const categoryParentsMapFn = (category: ICategory) => ({
		href: `/products?${qs.stringify({ category: category.slug || category._id })}`,
		title: category.name,
	});
	const categoryParents = [
		...(!isCategoryLoading && category ? getCategoryHierarchy(category) : []),
	];
	const breadcrumbCategories = categoryParents.map(categoryParentsMapFn);
	const lastPage = pages.at(-1);
	const page = lastPage?.meta?.pagination?.page || 1;
	const totalPages = lastPage?.meta?.pagination?.totalPages || 1;
	// const totalDocs = lastPage?.meta?.pagination?.totalDocs || 0;
	const productsList = [
		...(isProductsLoading
			? Array.from({ length: 12 }, (_, i) => ({ _id: String(i) }) as Pick<IProduct, "_id">)
			: flattenDeep(pages.map((page) => page?.data || []))),
	];

	// effect hooks
	useEffect(() => {
		setProductsParamsState({
			...(!isCategoryLoading && category?._id ? { categories: [category?._id] } : {}),
		});
	}, [category?._id, isCategoryLoading]);

	return (
		<>
			<div className="container py-16px">
				<Breadcrumb items={[...breadcrumbCategories, { href: "/products", title }]} />
			</div>
			<section className="py-4">
				<div className="container">
					<div className="row gy-3 justify-content-center">
						<div className="col-12">
							<h1 className="text-capitalize mb-0">
								<strong>{category?.name || title}</strong>
							</h1>
						</div>
						<div className="col-12">
							<div className="row gy-4 gy-lg-0">
								<div className="col-12 col-lg-4 col-xl-3">
									<div className="text-bg-dark text-center p-4">Filter</div>
								</div>
								<div className="col-12 col-lg-8 offset-xl-1">
									<div className="row g-3">
										{productsList?.length > 0 ? (
											productsList.map((singleProduct) => (
												<div
													className="col-12 col-md-6 col-lg-4"
													key={singleProduct._id}>
													<div className="text-bg-dark text-center p-4">
														{!isProductsLoading &&
														(singleProduct as IProduct)?.name
															? (singleProduct as IProduct).name
															: "product name"}
													</div>
												</div>
											))
										) : (
											<div className="col-12">
												<div className="vstack gap-2 align-items-center justify-content-center">
													<svg
														width="50"
														height="50"
														className="text-primary-dark w-50px h-50px">
														<use href="#icon-cone-striped" />
													</svg>
													<span className="fs-4">No Data Found</span>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						{lastPage?.data &&
							lastPage?.data?.length >= 1 &&
							Number(totalPages) > 1 && (
								<div className="col-auto">
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
				</div>
			</section>
		</>
	);
};

export default Products;
