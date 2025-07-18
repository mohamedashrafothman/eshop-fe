import { fileFormatValidation, fileSizeValidation } from "utils/helpers";
import vars from "utils/vars";
import isHexColor from "validator/lib/isHexColor";
import { array, boolean, InferType, mixed, number, object, string } from "yup";

export const NAME_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 1000;
export const NORMAL_PRICE_MIN_LENGTH = 0;

const schema = ({ isEdit = false }) =>
	object().shape({
		name: string().required("Field required!").max(NAME_MAX_LENGTH),
		description: string().required("Field required!").max(DESCRIPTION_MAX_LENGTH),
		price: object().shape({
			normal: number()
				.required("Field required!")
				.min(0, "Normal Price can't be less than 0!"),
			sale: number()
				.nullable()
				.min(0, "Sale price can't be less than 0!")
				.test(
					"is-less-than-normal",
					"Sale price must be less than normal price!",
					function (value) {
						const { normal } = this.parent; // `this.parent` is the `price` object
						if (value == null || normal == null) return true; // skip check if sale or normal is not set
						return value < normal;
					}
				),
		}),
		category: string().required("Field required!"),
		brand: string().required("Field required!"),
		colors: array()
			.of(
				object().shape({
					name: string().required("Field required!"),
					value: string()
						.required("Field required!")
						.test("is-hex-color", "Invalid hex color!", (val) =>
							typeof val === "string" ? isHexColor(val) : false
						),
				})
			)
			.required("Field required!"),
		sizes: array()
			.of(string().oneOf(vars.products.sizes, "Invalid size").required("Size is required"))
			.required("Field required!")
			.min(1, "Select at least one size"),
		isFeatured: boolean(),
		thumbnail: !isEdit
			? mixed()
					.required("Field required!")
					.test(
						"fileSize",
						`Uploaded file is too big, must be less than ${vars.app.fileMaxSizeInMB}MB`,
						fileSizeValidation
					)
					.test(
						"fileFormat",
						"Uploaded files has unsupported format",
						fileFormatValidation
					)
			: mixed().nullable(),
		images: !isEdit
			? mixed()
					.required("Field required!")
					.test(
						"fileSize",
						`Uploaded file is too big, must be less than ${vars.app.fileMaxSizeInMB}MB`,
						fileSizeValidation
					)
					.test(
						"fileFormat",
						"Uploaded files has unsupported format",
						fileFormatValidation
					)
			: mixed().nullable(),
	});

export type schemaType = InferType<ReturnType<typeof schema>>;
export default schema;
