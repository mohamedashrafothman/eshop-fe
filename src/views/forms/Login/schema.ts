import isStrongPassword from "validator/lib/isStrongPassword";
import { boolean, InferType, object, string } from "yup";

const schema = object().shape({
	email: string().required("Field required!").email(),
	password: string()
		.required("Field required!")
		.test({
			name: "password",
			test: (value = "") => Boolean(value && isStrongPassword(value) && value.length < 64),
			message:
				"Password must be Between 8 and 64 characters long. contains at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
		}),
	remember: boolean().optional(),
});

export type schemaType = InferType<typeof schema>;
export default schema;
