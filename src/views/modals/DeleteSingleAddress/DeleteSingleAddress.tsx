"use client";

import { useQueryClient } from "@tanstack/react-query";
import Modal from "bootstrap/js/dist/modal";
import { KEY_ARRAY as ADDRESSES_KEY_QUERY } from "hooks/useAddressesInfinityQuery";
import useDeleteSingleAddressMutation from "hooks/useDeleteSingleAddressMutation";
import IAddress from "interfaces/Address.interface";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

type Props = { address: Pick<IAddress, "_id" | "deleted"> };

const DeleteSingleAddress = ({ address }: Props) => {
	const queryClient = useQueryClient();

	// portal dom element
	let portalsRoot = document.getElementById("portals") || null;
	if (!portalsRoot) {
		portalsRoot = document.createElement("div");
		portalsRoot.setAttribute("id", "portals");
		document.body.appendChild(portalsRoot);
	}

	// server state hooks
	const deleteSingleAddressMutation = useDeleteSingleAddressMutation();

	// ref hook
	const modalRef = useRef<HTMLDivElement | null>(null);
	const deleteAddressCancelRequestRef = useRef<AbortController | null>(null);

	// state hooks
	const [isDeleteLoadingState, setIsDeleteLoadingState] = useState(false);

	// event handlers
	const deleteAddressHandler = async () => {
		setIsDeleteLoadingState(true);

		// Abort any previous request, and create a new abort controller.
		if (deleteAddressCancelRequestRef.current?.signal)
			deleteAddressCancelRequestRef.current?.abort();
		deleteAddressCancelRequestRef.current = new AbortController();

		// Call the delete address mutation.
		await deleteSingleAddressMutation.mutateAsync(
			{
				variables: { id: address._id },
				data: {},
				signal: deleteAddressCancelRequestRef.current.signal,
			},
			{
				onSettled: () => {
					// Reset loading state
					setIsDeleteLoadingState(false);

					if (!modalRef?.current) return;

					modalRef.current.addEventListener(
						"hidden.bs.modal",
						async () => {
							// Invalidate the addresses query from the cache.
							await queryClient.invalidateQueries({
								queryKey: ADDRESSES_KEY_QUERY,
							});
							// Resetting mutation.
							deleteSingleAddressMutation.reset();
						},
						{ once: true }
					);
					// Hide modal
					Modal.getInstance(modalRef.current)?.hide();
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
			if (deleteAddressCancelRequestRef.current?.signal)
				deleteAddressCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		portalsRoot &&
		ReactDOM.createPortal(
			<div
				className="modal fade"
				ref={modalRef}
				tabIndex={-1}
				id={`deleteSingleAddress${address?._id}Modal`}
				aria-labelledby={`deleteSingleAddress${address?._id}ModalTitle`}
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content bg-white">
						<div className="modal-header border-0">
							<h5
								className="modal-title h3 w-100 text-uppercase text-center mb-0"
								id={`deleteSingleAddress${address?._id}ModalTitle`}>
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
								Confirming that this action will restore/un-archive this address?
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
										className="btn text-decoration-none w-100 text-uppercase btn-danger"
										onClick={() => deleteAddressHandler()}
										disabled={isDeleteLoadingState}>
										<strong>Delete</strong>
										{isDeleteLoadingState && (
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

export default DeleteSingleAddress;
