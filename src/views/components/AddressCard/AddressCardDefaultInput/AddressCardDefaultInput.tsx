"use client";

import { useQueryClient } from "@tanstack/react-query";
import { KEY_ARRAY as ADDRESS_KEY_QUERY } from "hooks/useAddressesInfinityQuery";
import usePatchAddressMutation from "hooks/usePatchAddressMutation";
import { default as IAddress } from "interfaces/Address.interface";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import CheckboxField from "views/components/CheckboxField";

type Props = {
	address?: Pick<IAddress, "_id" | "default" | "name"> | undefined;
	disabled: boolean | undefined;
} & ComponentPropsWithoutRef<"input">;

const AddressCardDefaultInput = ({ address, disabled }: Props) => {
	const queryClient = useQueryClient();

	// ref hook
	const addressCancelRequestRef = useRef<AbortController | null>(null);

	// server state hooks
	const patchAddressMutation = usePatchAddressMutation();

	// event handlers
	const onAddressDefaultCheckboxChangeHandler = async () => {
		if (!address?._id) return;

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
			checked={address?.default || false}
			type="radio"
			id={!disabled ? `defaultField${address?._id || ""}` : undefined}
			value={Number(address?.default || false)}
			label={`${address?.name || ""}${address?.default ? " (Default)" : ""}`}
			disabled={disabled}
			isInline
		/>
	);
};

export default AddressCardDefaultInput;
