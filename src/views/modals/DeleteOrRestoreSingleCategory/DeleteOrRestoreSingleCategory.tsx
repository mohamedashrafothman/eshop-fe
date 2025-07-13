"use client";

import { useQueryClient } from "@tanstack/react-query";
import Modal from "bootstrap/js/dist/modal";
import classNames from "classnames";
import {
	ALL_KEY_ARRAY as ALL_CATEGORIES_KEY_ARRAY,
	useDeleteSingleCategoryMutation,
	useRestoreSingleCategoryMutation,
} from "hooks/useTanstackQuery/useCategories";
import ICategory from "interfaces/Category.interface";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

type Props = { category: Pick<ICategory, "_id" | "deleted"> };

const DeleteOrRestoreSingleCategory = ({ category }: Props) => {
	const queryClient = useQueryClient();

	// portal dom element
	let portalsRoot = document.getElementById("portals") || null;
	if (!portalsRoot) {
		portalsRoot = document.createElement("div");
		portalsRoot.setAttribute("id", "portals");
		document.body.appendChild(portalsRoot);
	}

	// server state hooks
	const deleteSingleCategoryMutation = useDeleteSingleCategoryMutation();
	const restoreSingleCategoryMutation = useRestoreSingleCategoryMutation();

	// ref hook
	const modalRef = useRef<HTMLDivElement | null>(null);
	const deleteOrRestoreCategoryCancelRequestRef = useRef<AbortController | null>(null);

	// state hooks
	const [isDeleteOrRestoreLoadingState, setIsDeleteOrRestoreLoadingState] = useState(false);

	// constants
	const isCategoryDeleted = category?.deleted || false;

	// event handlers
	const deleteOrRestoreCategoryHandler = async () => {
		setIsDeleteOrRestoreLoadingState(true);

		// Abort any previous request, and create a new abort controller.
		if (deleteOrRestoreCategoryCancelRequestRef.current?.signal)
			deleteOrRestoreCategoryCancelRequestRef.current?.abort();
		deleteOrRestoreCategoryCancelRequestRef.current = new AbortController();

		const mutation = isCategoryDeleted
			? restoreSingleCategoryMutation
			: deleteSingleCategoryMutation;

		// Call the unlink social mutation.
		await mutation.mutateAsync(
			{
				variables: { id: category._id },
				data: {},
				signal: deleteOrRestoreCategoryCancelRequestRef.current.signal,
			},
			{
				// Reset loading state
				onError: () => setIsDeleteOrRestoreLoadingState(false),
				onSuccess: () => {
					// Reset loading state
					setIsDeleteOrRestoreLoadingState(false);

					if (modalRef?.current) {
						modalRef.current.addEventListener(
							"hidden.bs.modal",
							async () => {
								// Invalidate the categories query from the cache.
								await queryClient.invalidateQueries({
									queryKey: ALL_CATEGORIES_KEY_ARRAY,
								});
								// Resetting mutation.
								mutation.reset();
							},
							{ once: true }
						);
						// Hide modal
						Modal.getInstance(modalRef.current)?.hide();
					}
				},
			}
		);
	};

	// effect hook
	useEffect(() => {
		const modalCurrentElement = modalRef?.current;
		let modal: Modal | null;
		if (modalCurrentElement) {
			modal = Modal.getOrCreateInstance(modalCurrentElement);
		}

		return () => {
			if (modalCurrentElement && modal) {
				Modal.getInstance(modalCurrentElement)?.dispose();
			}
		};
	}, []);

	useEffect(() => {
		return () => {
			if (deleteOrRestoreCategoryCancelRequestRef.current?.signal)
				deleteOrRestoreCategoryCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		portalsRoot &&
		ReactDOM.createPortal(
			<div
				className="modal fade"
				ref={modalRef}
				tabIndex={-1}
				id={`deleteOrRestoreSingleCategory${category._id}Modal`}
				aria-labelledby={`deleteOrRestoreSingleCategory${category._id}ModalTitle`}
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content bg-white">
						<div className="modal-header border-0">
							<h5
								className="modal-title h3 w-100 text-uppercase text-center mb-0"
								id={`deleteOrRestoreSingleCategory${category._id}ModalTitle`}>
								<strong>Are you sure?</strong>
							</h5>
							<button
								type="button"
								className="btn-close ms-auto"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body py-2">
							<p className="text-center mb-0">
								{`Confirming that this action will ${isCategoryDeleted ? "restore/un-archive" : "delete/archive"} this category?`}
							</p>
						</div>
						<div className="modal-footer border-0">
							<div className="row gy-3 gy-md-0 justify-content-center w-100">
								<div className="col-12 col-md">
									<button
										type="button"
										className="btn btn-outline-primary w-100 text-uppercase"
										data-bs-dismiss="modal">
										<strong>Cancel</strong>
									</button>
								</div>
								<div className="col-12 col-md">
									<button
										type="button"
										className={classNames(
											"btn text-decoration-none w-100 text-uppercase",
											{
												"btn-primary": isCategoryDeleted,
												"btn-danger": !isCategoryDeleted,
											}
										)}
										onClick={() => deleteOrRestoreCategoryHandler()}
										disabled={isDeleteOrRestoreLoadingState}>
										<strong>{isCategoryDeleted ? "Restore" : "Delete"}</strong>
										{isDeleteOrRestoreLoadingState && (
											<span
												className="spinner-border spinner-border-sm ms-2"
												role="status">
												<span className="visually-hidden">Loading...</span>
											</span>
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>,
			portalsRoot
		)
	);
};

export default DeleteOrRestoreSingleCategory;
