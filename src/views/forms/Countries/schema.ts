import { InferType, object, string } from "yup";

export const NAME_MAX_LENGTH = 100;
export const CODE_MAX_LENGTH = 3;

const schema = () =>
	object().shape({
		name: string().required("Field required!").max(NAME_MAX_LENGTH),
		code: string().required("Field required!").min(1).max(CODE_MAX_LENGTH),
	});

export type schemaType = InferType<ReturnType<typeof schema>>;
export default schema;
