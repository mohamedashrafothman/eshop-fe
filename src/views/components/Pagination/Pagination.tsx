"use client";

import { type PaginateResult } from "utils/helpers";

type Props = {
	disabled?: boolean | undefined;
	page: PaginateResult["page"];
	totalPages: PaginateResult["totalPages"];
	hasNextPage: boolean;
	fetchNextPage: () => void;
	hasPreviousPage: boolean;
	fetchPreviousPage: () => void;
};

const Pagination = ({
	disabled,
	page = 1,
	totalPages = 1,
	hasNextPage,
	fetchNextPage,
	hasPreviousPage,
	fetchPreviousPage,
}: Props) => (
	<nav aria-label="Pagination Nav">
		<ul className="pagination m-0 hstack gap-gutter justify-content-end align-items-center">
			<li className="page-item">
				<button
					type="button"
					className="btn btn-primary border-primary-dark py-2 text-capitalize text-decoration-none icon-link icon-link-hover icon-link-hover-reversed"
					title="Previous"
					onClick={() => fetchPreviousPage()}
					disabled={!hasPreviousPage || disabled}
					tabIndex={!hasPreviousPage || disabled ? -1 : 0}>
					<svg className="bi w-16px h-16px" width="16" height="16">
						<use href="#icon-chevron-left" />
					</svg>
					<strong>Prev page</strong>
				</button>
			</li>
			<li className="page-item" aria-current="page">
				<strong className="fs-4">{`${page}/${totalPages}`}</strong>
			</li>
			<li className="page-item">
				<button
					type="button"
					className="btn btn-primary border-primary-dark py-2 text-capitalize text-decoration-none icon-link icon-link-hover"
					title="Next"
					onClick={() => fetchNextPage()}
					disabled={!hasNextPage || disabled}
					tabIndex={!hasNextPage || disabled ? -1 : 0}>
					<strong>Next page</strong>
					<svg className="bi w-16px h-16px" width="16" height="16">
						<use href="#icon-chevron-right" />
					</svg>
				</button>
			</li>
		</ul>
	</nav>
);

export default Pagination;
