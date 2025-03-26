import { InferType, number, object, string } from "yup";

const schema = object().shape({
	name: string().required("Field required!").max(100),
	street: string().required("Field required!"),
	building: number().required("Field required!"),
	floor: number().required("Field required!"),
	apartment: string().required("Field required!"),
	area: string().required("Field required!"),
	country: string().required("Field required!"),
	state: string().required("Field required!"),
	city: string().required("Field required!"),
	user: string().required("Field required!"),
	zip: string().nullable(),
});

export type schemaType = InferType<typeof schema>;
export default schema;
