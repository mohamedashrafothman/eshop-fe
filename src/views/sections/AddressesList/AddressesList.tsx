"use client";

import useAddressesInfinityQuery from "hooks/useAddressesInfinityQuery";
import IAddress from "interfaces/Address.interface";
import { Fragment } from "react";
import AddressCard from "views/components/AddressCard";
import Pagination from "views/components/Pagination";

const AddressesList = () => {
	// server side hooks
	const {
		data: { pages = [] } = {},
		isLoading: isAddressesLoading,
		hasNextPage: hasAddressesNextPage,
		fetchNextPage: fetchAddressesNextPage,
		isFetchingNextPage: isAddressesFetchingNextPage,
		hasPreviousPage: hasAddressesPreviousPage,
		fetchPreviousPage: fetchAddressesPreviousPage,
		isFetchingPreviousPage: isAddressesFetchingPreviousPage,
	} = useAddressesInfinityQuery({});

	// constants
	const lastPage = pages.at(-1);
	const page = lastPage?.meta?.pagination?.page || 1;
	const totalPages = lastPage?.meta?.pagination?.totalPages || 1;

	return (
		<section className="addresses-list py-4">
			<div className="row gy-4">
				<div className="col-12">
					{[...(isAddressesLoading ? Array(1).map((_x, i) => i) : pages)].map(
						(page, pageIndex) => (
							<Fragment
								key={
									(typeof page === "object" &&
										!Array.isArray(page) &&
										page !== null &&
										page?.meta?.pagination?.page) ||
									pageIndex
								}>
								{[
									...(isAddressesLoading
										? Array(9).map((_x, i) => ({ _id: String(i) }) as IAddress)
										: [
												...((typeof page === "object" &&
													!Array.isArray(page) &&
													page !== null &&
													page?.data) ||
													[]),
											]),
								]?.length ? (
									<div className="row g-3 row-cols-1 row-cols-xl-2 row-cols-3xl-3">
										{[
											...(isAddressesLoading
												? Array(9).map(
														(_x, i) =>
															({ _id: String(i) }) as Pick<
																IAddress,
																"_id"
															>
													)
												: [
														...((typeof page === "object" &&
															!Array.isArray(page) &&
															page !== null &&
															page?.data) ||
															[]),
													]),
										].map((singleAddress: IAddress | Pick<IAddress, "_id">) => (
											<div className="col" key={singleAddress?._id}>
												<AddressCard
													address={singleAddress as IAddress}
													isLoading={isAddressesLoading}
												/>
											</div>
										))}
									</div>
								) : (
									<div className="vstack gap-2 align-items-center justify-content-center text-center text-capitalize">
										<svg
											width="50"
											height="50"
											className="text-primary-dark w-50px h-50px">
											<use href="#icon-cone-striped" />
										</svg>
										<span className="fs-4">No Data Found</span>
									</div>
								)}
							</Fragment>
						)
					)}
				</div>
				<div className="col-12 m-0" />
				{lastPage?.data && lastPage?.data?.length >= 1 && Number(totalPages) > 1 && (
					<div className="col-auto ms-auto">
						<Pagination
							disabled={isAddressesLoading}
							page={page}
							totalPages={totalPages}
							hasNextPage={hasAddressesNextPage}
							fetchNextPage={fetchAddressesNextPage}
							hasPreviousPage={hasAddressesPreviousPage}
							fetchPreviousPage={fetchAddressesPreviousPage}
							isFetchingNextPage={isAddressesFetchingNextPage}
							isFetchingPreviousPage={isAddressesFetchingPreviousPage}
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default AddressesList;
