"use client";

import { type PaginateResult } from "utils/helpers";

type Props = {
	disabled?: boolean | undefined;
	page: PaginateResult["page"];
	totalPages: PaginateResult["totalPages"];
	hasNextPage: boolean;
	fetchNextPage: () => void;
	isFetchingNextPage: boolean;
	hasPreviousPage: boolean;
	fetchPreviousPage: () => void;
	isFetchingPreviousPage: boolean;
};

const Pagination = ({
	disabled,
	page = 1,
	totalPages = 1,
	hasNextPage,
	fetchNextPage,
	isFetchingNextPage,
	hasPreviousPage,
	fetchPreviousPage,
	isFetchingPreviousPage,
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
					{isFetchingPreviousPage ? (
						<span className="spinner-border spinner-border-sm" role="status">
							<span className="visually-hidden">Loading...</span>
						</span>
					) : (
						<svg className="bi w-22px h-22px" width="22" height="22">
							<use href="#icon-chevron-left" />
						</svg>
					)}
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
					{isFetchingNextPage ? (
						<span className="spinner-border spinner-border-sm" role="status">
							<span className="visually-hidden">Loading...</span>
						</span>
					) : (
						<svg className="bi w-22px h-22px" width="22" height="22">
							<use href="#icon-chevron-right" />
						</svg>
					)}
				</button>
			</li>
		</ul>
	</nav>
);

export default Pagination;
