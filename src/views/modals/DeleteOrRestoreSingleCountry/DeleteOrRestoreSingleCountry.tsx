"use client";

import { useQueryClient } from "@tanstack/react-query";
import Modal from "bootstrap/js/dist/modal";
import classNames from "classnames";
import { KEY_ARRAY as COUNTRIES_KEY_QUERY } from "hooks/useCountriesInfinityQuery";
import useDeleteSingleCountryMutation from "hooks/useDeleteSingleCountryMutation";
import useRestoreSingleCountryMutation from "hooks/useRestoreSingleCountryMutation";
import ICountry from "interfaces/Country.interface";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

type Props = { country: ICountry };

const DeleteOrRestoreSingleCountry = ({ country }: Props) => {
	const queryClient = useQueryClient();

	// portal dom element
	let portalsRoot = document.getElementById("portals") || null;
	if (!portalsRoot) {
		portalsRoot = document.createElement("div");
		portalsRoot.setAttribute("id", "portals");
		document.body.appendChild(portalsRoot);
	}

	// server state hooks
	const deleteSingleCountryMutation = useDeleteSingleCountryMutation();
	const restoreSingleCountryMutation = useRestoreSingleCountryMutation();

	// ref hook
	const modalRef = useRef<HTMLDivElement | null>(null);
	const deleteOrRestoreCountryCancelRequestRef = useRef<AbortController | null>(null);

	// state hooks
	const [isDeleteOrRestoreLoadingState, setIsDeleteOrRestoreLoadingState] = useState(false);

	// constants
	const isCountryDeleted = country?.deleted || false;

	// event handlers
	const deleteOrRestoreCountryHandler = async () => {
		setIsDeleteOrRestoreLoadingState(true);

		// Abort any previous request, and create a new abort controller.
		if (deleteOrRestoreCountryCancelRequestRef.current?.signal)
			deleteOrRestoreCountryCancelRequestRef.current?.abort();
		deleteOrRestoreCountryCancelRequestRef.current = new AbortController();

		const mutation = isCountryDeleted
			? restoreSingleCountryMutation
			: deleteSingleCountryMutation;

		// Call the unlink social mutation.
		await mutation.mutateAsync(
			{
				variables: { id: country._id },
				data: {},
				signal: deleteOrRestoreCountryCancelRequestRef.current.signal,
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
								// Invalidate the countries query from the cache.
								await queryClient.invalidateQueries({
									queryKey: COUNTRIES_KEY_QUERY,
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
			if (deleteOrRestoreCountryCancelRequestRef.current?.signal)
				deleteOrRestoreCountryCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		portalsRoot &&
		ReactDOM.createPortal(
			<div
				className="modal fade"
				ref={modalRef}
				tabIndex={-1}
				id={`deleteOrRestoreSingleCountry${country?._id}Modal`}
				aria-labelledby={`deleteOrRestoreSingleCountry${country?._id}ModalTitle`}
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content bg-white">
						<div className="modal-header border-0">
							<h5
								className="modal-title h3 w-100 text-uppercase text-center mb-0"
								id={`deleteOrRestoreSingleCountry${country?._id}ModalTitle`}>
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
								{`Confirming that this action will ${isCountryDeleted ? "restore/un-archive" : "delete/archive"} this country?`}
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
												"btn-primary": isCountryDeleted,
												"btn-danger": !isCountryDeleted,
											}
										)}
										onClick={() => deleteOrRestoreCountryHandler()}
										disabled={isDeleteOrRestoreLoadingState}>
										<strong>{isCountryDeleted ? "Restore" : "Delete"}</strong>
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

export default DeleteOrRestoreSingleCountry;
