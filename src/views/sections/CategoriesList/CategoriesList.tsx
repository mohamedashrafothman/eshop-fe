"use client";

import { useCategoriesInfinityQuery } from "hooks/useTanstackQuery/useCategories";
import ICategory from "interfaces/Category.interface";
import { useState } from "react";
import { type GetCategoriesDataType } from "services/api/e-shop/categories";
import { filterObjectFalsyValues, flattenDeep } from "utils/helpers";
import CategoryAccordionCard from "views/components/CategoryAccordionCard";
import Pagination from "views/components/Pagination";
import { default as CategoriesFilterForm } from "views/forms/CategoriesFilter";

const CategoriesList = () => {
	// state hooks
	const [categoriesParamsState, setCategoriesParamsState] = useState<
		GetCategoriesDataType | undefined
	>(undefined);

	// server side hooks
	const {
		data: { pages = [] } = {},
		isLoading: isCategoriesLoading,
		hasNextPage: hasCategoriesNextPage,
		fetchNextPage: fetchCategoriesNextPage,
		isFetchingNextPage: isCategoriesFetchingNextPage,
		hasPreviousPage: hasCategoriesPreviousPage,
		fetchPreviousPage: fetchCategoriesPreviousPage,
		isFetchingPreviousPage: isCategoriesFetchingPreviousPage,
	} = useCategoriesInfinityQuery(categoriesParamsState);

	// constants
	const lastPage = pages.at(-1);
	const page = lastPage?.meta?.pagination?.page || 1;
	const totalPages = lastPage?.meta?.pagination?.totalPages || 1;
	const totalDocs = lastPage?.meta?.pagination?.totalDocs || 0;
	const categoriesList = flattenDeep(pages.map((page) => page?.data || []));

	return (
		<section className="categories-list py-4">
			<div className="row gy-4">
				<div className="col-12">
					<CategoriesFilterForm
						onSubmit={(value) =>
							setCategoriesParamsState({
								...filterObjectFalsyValues(value),
								...("firstLevelOnly" in value
									? { firstLevelOnly: +Boolean(value.firstLevelOnly) }
									: {}),
							})
						}
						totalDocs={totalDocs}
						sort={lastPage?.meta?.sort || []}
					/>
				</div>
				<div className="col-12">
					<div className="row g-3">
						{isCategoriesLoading ? (
							Array.from(
								{ length: 12 },
								(_, i) => ({ _id: String(i) }) as Pick<ICategory, "_id">
							).map((singleCategory) => (
								<div
									className="col-12 col-md-6 col-xxl-4 col-3xl-3"
									key={singleCategory._id}>
									<CategoryAccordionCard category={singleCategory} isLoading />
								</div>
							))
						) : categoriesList?.length > 0 ? (
							categoriesList.map((singleCategory) => (
								<div
									className="col-12 col-md-6 col-xxl-4 col-3xl-3"
									key={singleCategory._id}>
									<CategoryAccordionCard
										category={singleCategory}
										isHasChildren={
											!isCategoriesLoading &&
											singleCategory.children.length > 0
										}
									/>
								</div>
							))
						) : (
							<div className="col-12">
								<span className="vstack gap-2 align-items-center justify-content-center">
									<svg
										width="50"
										height="50"
										className="text-primary-dark w-50px h-50px">
										<use href="#icon-cone-striped" />
									</svg>
									<span className="fs-4">No Data Found</span>
								</span>
							</div>
						)}
					</div>
				</div>
				{lastPage?.data && lastPage?.data?.length >= 1 && Number(totalPages) > 1 && (
					<div className="col-auto ms-auto">
						<Pagination
							disabled={isCategoriesLoading}
							page={page}
							totalPages={totalPages}
							hasNextPage={hasCategoriesNextPage}
							fetchNextPage={fetchCategoriesNextPage}
							hasPreviousPage={hasCategoriesPreviousPage}
							fetchPreviousPage={fetchCategoriesPreviousPage}
							isFetchingNextPage={isCategoriesFetchingNextPage}
							isFetchingPreviousPage={isCategoriesFetchingPreviousPage}
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default CategoriesList;
