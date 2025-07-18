"use client";

import TextField, { type Props as TextFieldProps } from "views/components/TextField";

export type Props = {} & TextFieldProps;

const ColorField = (props: Props) => (
	<TextField type="color" className="form-control-color w-100" {...props} />
);

export default ColorField;
