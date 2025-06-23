"use client";

import classNames from "classnames";
import IAddress from "interfaces/Address.interface";
import { ComponentPropsWithoutRef } from "react";
import { pick } from "utils/helpers";
import NextLink from "views/components/NextLink";
import { default as DeleteSingleAddressModal } from "views/modals/DeleteSingleAddress";

type Props = {
	address: Pick<IAddress, "_id">;
	isLoading: boolean;
} & ComponentPropsWithoutRef<"div">;

const AddressCardCallToActions = ({ address, isLoading }: Props) => (
	<div className="btn-group">
		<NextLink
			href={`/dashboard/addresses/${address?._id}/edit`}
			className={classNames("btn btn-sm btn-link p-1 link-primary", {
				isLoading: isLoading,
			})}>
			<svg className="bi w-20px h-20px" height="20" width="20">
				<use href="#icon-pencil-square"></use>
			</svg>
		</NextLink>
		<button
			type="button"
			data-bs-toggle={!isLoading ? "modal" : undefined}
			data-bs-target={!isLoading ? `#deleteSingleAddress${address?._id}Modal` : undefined}
			className="btn btn-sm btn-link p-1 link-danger"
			title="Delete"
			disabled={isLoading}>
			<svg className="bi w-20px h-20px" height="20" width="20">
				<use href="#icon-trash"></use>
			</svg>
		</button>
		{!isLoading && <DeleteSingleAddressModal address={pick(address, ["_id"])} />}
	</div>
);

export default AddressCardCallToActions;
