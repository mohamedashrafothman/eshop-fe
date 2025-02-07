import classNames from "classnames";
import TextField from "views/components/TextField";

const SearchField = ({
	name = "q",
	id = "qField",
	isValid = false,
	isInvalid = false,
	className = "",
	...restOfParams
}) => (
	<div className={classNames("input-group", { "has-validation": isInvalid || isValid })}>
		<TextField
			type="search"
			name={name}
			id={id}
			className={classNames(className, "rounded-end-0")}
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
