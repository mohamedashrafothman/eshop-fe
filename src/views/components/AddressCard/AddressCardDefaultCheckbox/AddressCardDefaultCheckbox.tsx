"use client";

import { useQueryClient } from "@tanstack/react-query";
import { KEY_ARRAY as ADDRESS_KEY_QUERY } from "hooks/useAddressesInfinityQuery";
import usePatchAddressMutation from "hooks/usePatchAddressMutation";
import { default as IAddress } from "interfaces/Address.interface";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import CheckboxField from "views/components/CheckboxField";

type Props = (
	| { address: Pick<IAddress, "_id">; isLoading: true }
	| { address: Pick<IAddress, "_id" | "default" | "name">; isLoading: false }
) &
	ComponentPropsWithoutRef<"input">;

const AddressCardDefaultCheckbox = ({ address, isLoading }: Props) => {
	const queryClient = useQueryClient();

	// ref hook
	const addressCancelRequestRef = useRef<AbortController | null>(null);

	// server state hooks
	const patchAddressMutation = usePatchAddressMutation();

	// event handlers
	const onAddressDefaultCheckboxChangeHandler = async () => {
		if (!address?._id || isLoading) return;

		// Abort any previous request, and create a new abort controller.
		if (addressCancelRequestRef.current?.signal) addressCancelRequestRef.current?.abort();
		addressCancelRequestRef.current = new AbortController();

		// Call the address edit mutation.
		await patchAddressMutation.mutateAsync(
			{
				variables: { id: address._id },
				data: { default: !address?.default },
				signal: addressCancelRequestRef.current.signal,
			},
			{
				onSuccess: async () => {
					// Resetting address edit query mutation.
					patchAddressMutation.reset();
					// Invalidate the address query from the cache.
					await queryClient.invalidateQueries({ queryKey: ADDRESS_KEY_QUERY });
				},
			}
		);
	};

	// effect hooks
	useEffect(() => {
		return () => {
			if (addressCancelRequestRef.current?.signal) addressCancelRequestRef.current?.abort();
		};
	}, []);

	return (
		<CheckboxField
			onChange={() => onAddressDefaultCheckboxChangeHandler()}
			checked={(!isLoading && address?.default) || false}
			type="radio"
			id={!isLoading ? `defaultField${address?._id || ""}` : undefined}
			value={(!isLoading && Number(address?.default || false)) || ""}
			label={
				(!isLoading && `${address?.name || ""}${address?.default ? " (Default)" : ""}`) ||
				""
			}
			disabled={isLoading}
			isInline
		/>
	);
};

export default AddressCardDefaultCheckbox;
