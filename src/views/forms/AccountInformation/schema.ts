import { InferType, object, string } from "yup";

const schema = () =>
	object().shape({
		name: string().required("Field required!"),
		email: string().required("Field required!").email(),
	});

export type schemaType = InferType<ReturnType<typeof schema>>;
export default schema;
