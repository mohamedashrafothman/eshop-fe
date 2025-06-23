"use client";

import classNames from "classnames";
import { default as IAddress } from "interfaces/Address.interface";
import { default as ICity } from "interfaces/City.interface";
import { default as ICountry } from "interfaces/Country.interface";
import { default as IState } from "interfaces/State.interface";
import { ComponentPropsWithoutRef } from "react";
import { pick } from "utils/helpers";
import AddressCardCallToActions from "./AddressCardCallToActions";
import AddressCardDefaultCheckbox from "./AddressCardDefaultCheckbox";
type Props = (
	| { address: Pick<IAddress, "_id">; isLoading: true }
	| { address: IAddress; isLoading: false }
) &
	ComponentPropsWithoutRef<"div">;

const AddressCard = ({ address, isLoading }: Props) => (
	<div
		className={classNames("card address-card border", {
			"placeholder-glow": isLoading,
		})}>
		<div className="card-body">
			<div className="vstack gap-2">
				<div className="hstack gap-2 justify-content-between">
					<div className="flex-shrink-0">
						<AddressCardDefaultCheckbox
							address={address as IAddress}
							isLoading={isLoading}
						/>
					</div>
					<div className="flex-shrink-0">
						<AddressCardCallToActions
							address={address && pick(address, ["_id"])}
							isLoading={isLoading}
						/>
					</div>
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
