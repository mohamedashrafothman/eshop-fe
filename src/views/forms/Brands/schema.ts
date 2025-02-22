import vars from "utils/vars";
import { InferType, mixed, object, string } from "yup";

const schema = object().shape({
	name: string().required("Field required!").max(100),
	description: string().required("Field required!").max(1000),
	logo: mixed()
		.required("Field required!")
		.test(
			"fileSize",
			`Uploaded file is too big, must be less than ${vars.app.fileMaxSizeInMB}MB`,
			function (file: any) {
				return Boolean(
					!!!file ||
						(Array.from([file])?.filter((file) => file?.size)?.length &&
							Array.from([file])?.every(
								(file) => file?.size <= vars.app.fileMaxSizeInMB * 1024 * 1024
							))
				);
			}
		)
		.test("fileFormat", "Uploaded files has unsupported format", function (file: any) {
			return Boolean(
				!!!file ||
					(Array.from([file])?.filter((file) => file?.type)?.length &&
						Array.from([file])?.every((file) =>
							vars.app.imagesFileInputAccepts.includes(file?.type)
						))
			);
		}),
});

export type schemaType = InferType<typeof schema>;
export default schema;
