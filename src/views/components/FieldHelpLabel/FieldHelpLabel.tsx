"use client";

import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";

type Props = {
	id: string;
	text: string;
	direction?: ("end" | "start") | undefined;
} & ComponentPropsWithoutRef<"div">;

const FieldHelpLabel = ({ id, text = "", direction, className }: Props) => (
	<div
		id={`${id}-help`}
		className={classNames("form-text small", className, {
			"text-end": direction === "end",
			"text-start": direction === "start",
		})}>
		<small>
			<em>{text}</em>
		</small>
	</div>
);

export default FieldHelpLabel;
