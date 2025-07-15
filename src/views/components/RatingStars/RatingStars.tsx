import ReactStars, { type IRatingStarProps } from "react-rating-star-with-type";

type Props = {} & IRatingStarProps;

const RatingStars = (props: Props) => (
	<ReactStars
		isHalf={true}
		emptyIcon={
			<svg className="bi w-16px h-16px" width="16" height="16">
				<use href="#icon-star" />
			</svg>
		}
		halfIcon={
			<svg className="bi w-16px h-16px" width="16" height="16">
				<use href="#icon-star-half" />
			</svg>
		}
		filledIcon={
			<svg className="bi w-16px h-16px" width="16" height="16">
				<use href="#icon-star-fill" />
			</svg>
		}
		{...props}
	/>
);

export default RatingStars;
