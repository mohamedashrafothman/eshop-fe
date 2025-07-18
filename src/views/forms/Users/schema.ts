import vars from "utils/vars";
import { boolean, InferType, object, string } from "yup";

const schema = () =>
	object().shape({
		name: string().required("Field required!"),
		email: string().required("Field required!").email(),
		role: string()
			.required("Field required!")
			.oneOf(
				[...Object.values(vars.roles).filter((item) => item !== vars.roles.superAdmin)],
				"Invalid role!"
			),
		emailVerified: boolean().optional().default(false),
	});

export type schemaType = InferType<ReturnType<typeof schema>>;
export default schema;
