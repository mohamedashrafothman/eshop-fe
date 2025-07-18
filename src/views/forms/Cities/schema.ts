import { InferType, object, string } from "yup";

export const NAME_MAX_LENGTH = 100;

const schema = () =>
	object().shape({
		name: string().required("Field required!").max(NAME_MAX_LENGTH),
		country: string().required("Field required!"),
		state: string().required("Field required!"),
	});

export type schemaType = InferType<ReturnType<typeof schema>>;
export default schema;
