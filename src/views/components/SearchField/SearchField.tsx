import classNames from "classnames";
import TextField, { type Props as TextFieldProps } from "views/components/TextField";

export type Props = {} & TextFieldProps;

const SearchField = ({
	name = "q",
	id = "qField",
	isValid = false,
	isInvalid = false,
	className = "",
	...restOfParams
}) => (
	<div
		className={classNames(className, "input-group flex-nowrap", {
			"has-validation": isInvalid || isValid,
		})}>
		<TextField
			type="search"
			name={name}
			id={id}
			className="rounded-end-0"
			isInvalid={isInvalid}
			isValid={isValid}
			{...restOfParams}
		/>
		<div className="input-group-text px-3">
			<svg className="bi w-16px h-16px" width="16" height="16">
				<use href="#icon-search" />
			</svg>
		</div>
	</div>
);

export default SearchField;
