import { InferType, object, string } from "yup";

const schema = object().shape({
	country: string().required("Field required!"),
	state: string().required("Field required!"),
	name: string().required("Field required!").max(100),
});

export type schemaType = InferType<typeof schema>;
export default schema;
