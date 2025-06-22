"use client";

import classNames from "classnames";
import { default as IAddress } from "interfaces/Address.interface";
import { default as ICity } from "interfaces/City.interface";
import { default as ICountry } from "interfaces/Country.interface";
import { default as IState } from "interfaces/State.interface";
import { ComponentPropsWithoutRef } from "react";
import { pick } from "utils/helpers";
import AddressCardDefaultInput from "./AddressCardDefaultInput";

type Props = {
	address?: IAddress | undefined;
	isLoading?: boolean | undefined;
} & ComponentPropsWithoutRef<"div">;

const AddressCard = ({ address, isLoading }: Props) => (
	<div
		className={classNames("card address-card border", {
			"placeholder-glow": isLoading,
		})}>
		<div className="card-body">
			<div className="vstack gap-2">
				<div className="hstack gap-2 justify-content-between">
					<div className="flex-shrink-0">
						<AddressCardDefaultInput
							address={address && pick(address, ["_id", "default", "name"])}
							disabled={isLoading}
						/>
					</div>
					<div className="flex-shrink-0">call to actions</div>
				</div>
				<p className="mb-0 ms-4 ps-2 white-space-pre-line">
					{isLoading ? (
						<>
							<div className="placeholder placeholder-sm bg-secondary mb-1 w-100">
								&nbsp;
							</div>
							<div className="placeholder placeholder-sm bg-secondary mb-1 w-100">
								&nbsp;
							</div>
							<div className="placeholder placeholder-sm bg-secondary mb-1 w-75">
								&nbsp;
							</div>
						</>
					) : (
						[
							address?.street,
							...(address?.building ? [`\nBuilding ${address.building}`] : []),
							...(address?.floor ? [`Floor ${address.floor}`] : []),
							...(address?.apartment ? [`Apartment ${address.apartment}`] : []),
							...(address?.area ? [`\n${address.area}`] : []),
							(address?.city as ICity)?.name,
							(address?.state as IState)?.name,
							(address?.country as ICountry)?.name,
							...(address?.zip ? [`\nZip Code: ${address.zip}`] : []),
						]
							.filter(Boolean)
							.join(", ")
							.trim()
					)}
				</p>
			</div>
		</div>
	</div>
);

export default AddressCard;
