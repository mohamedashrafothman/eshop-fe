"use client";

import { useQueryClient } from "@tanstack/react-query";
import Modal from "bootstrap/js/dist/modal";
import classNames from "classnames";
import { KEY_ARRAY as CITIES_KEY_QUERY } from "hooks/useCitiesInfinityQuery";
import useDeleteSingleCityMutation from "hooks/useDeleteSingleCityMutation";
import useRestoreSingleCityMutation from "hooks/useRestoreSingleCityMutation";
import ICity from "interfaces/City.interface";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

type Props = { city: ICity };

const DeleteOrRestoreSingleCity = ({ city }: Props) => {
	const queryClient = useQueryClient();

	// portal dom element
	let portalsRoot = document.getElementById("portals") || null;
	if (!portalsRoot) {
		portalsRoot = document.createElement("div");
		portalsRoot.setAttribute("id", "portals");
		document.body.appendChild(portalsRoot);
	}

	// server city hooks
	const deleteSingleCityMutation = useDeleteSingleCityMutation();
	const restoreSingleCityMutation = useRestoreSingleCityMutation();

	// ref hook
	const modalRef = useRef<HTMLDivElement | null>(null);
	const deleteOrRestoreCityCancelRequestRef = useRef<AbortController | null>(null);

	// city hooks
	const [isDeleteOrRestoreLoadingCity, setIsDeleteOrRestoreLoadingCity] = useState(false);

	// constants
	const isCityDeleted = city?.deleted || false;

	// event handlers
	const deleteOrRestoreCityHandler = async () => {
		setIsDeleteOrRestoreLoadingCity(true);

		// Abort any previous request, and create a new abort controller.
		if (deleteOrRestoreCityCancelRequestRef.current?.signal)
			deleteOrRestoreCityCancelRequestRef.current?.abort();
		deleteOrRestoreCityCancelRequestRef.current = new AbortController();

		const mutation = isCityDeleted ? restoreSingleCityMutation : deleteSingleCityMutation;

		// Call the unlink social mutation.
		await mutation.mutateAsync(
			{
				variables: { id: city._id },
				data: {},
				signal: deleteOrRestoreCityCancelRequestRef.current.signal,
			},
			{
				// Reset loading city
				onError: () => setIsDeleteOrRestoreLoadingCity(false),
				onSuccess: () => {
					// Reset loading city
					setIsDeleteOrRestoreLoadingCity(false);

					if (modalRef?.current) {
						modalRef.current.addEventListener(
							"hidden.bs.modal",
							async () => {
								// Invalidate the cities query from the cache.
								await queryClient.invalidateQueries({
									queryKey: CITIES_KEY_QUERY,
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
			if (deleteOrRestoreCityCancelRequestRef.current?.signal)
				deleteOrRestoreCityCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		portalsRoot &&
		ReactDOM.createPortal(
			<div
				className="modal fade"
				ref={modalRef}
				tabIndex={-1}
				id={`deleteOrRestoreSingleCity${city?._id}Modal`}
				aria-labelledby={`deleteOrRestoreSingleCity${city?._id}ModalTitle`}
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content bg-white">
						<div className="modal-header border-0">
							<h5
								className="modal-title h3 w-100 text-uppercase text-center mb-0"
								id={`deleteOrRestoreSingleCity${city?._id}ModalTitle`}>
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
								{`Confirming that this action will ${isCityDeleted ? "restore/un-archive" : "delete/archive"} this city?`}
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
												"btn-primary": isCityDeleted,
												"btn-danger": !isCityDeleted,
											}
										)}
										onClick={() => deleteOrRestoreCityHandler()}
										disabled={isDeleteOrRestoreLoadingCity}>
										<strong>{isCityDeleted ? "Restore" : "Delete"}</strong>
										{isDeleteOrRestoreLoadingCity && (
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

export default DeleteOrRestoreSingleCity;
