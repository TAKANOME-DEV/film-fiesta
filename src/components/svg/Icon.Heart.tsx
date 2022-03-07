import { useContext } from "react";
// import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../context/GlobalContext";
import { deleteFavorite, saveFavorite } from "../../services/favorite";
// import { MovieType } from "../../types/MovieType";

type Props = {
	color: string;
	fillColor: string;
	isLiked: any;
	movie: any;
	refetch?: any;
};

const Heart: React.FC<Props> = ({
	color,
	fillColor,
	isLiked,
	movie,
	refetch,
}) => {
	const { user, onRefetchMovies, onRefetchFavorites } = useContext(Context);
	const location = useLocation();
	const match = location.pathname.match(/\/movies\/([0-9a-fA-F]){24}$/);

	const handleLike = async () => {
		if (!user._id)
			return toast.info("You need to login before performing any action");

		try {
			if (isLiked) {
				const data = await deleteFavorite(movie._id, user._id);
				onRefetchMovies?.();
				onRefetchFavorites?.();
				if (match?.[0]) refetch();
				return toast.success(data);
			}

			const data = await saveFavorite({
				userId: user._id,
				movieId: movie._id,
			});
			onRefetchMovies?.();
			onRefetchFavorites?.();
			if (match?.[0]) refetch();
			return toast.success(data);
		} catch (err: any) {
			return toast.error(err.data);
		}
	};

	return (
		<svg
			width="24"
			height="22"
			viewBox="0 0 24 22"
			fill={fillColor}
			xmlns="http://www.w3.org/2000/svg"
			onClick={handleLike}
		>
			<path
				d="M20.9565 3.37557C20.4322 2.87845 19.8151 2.48948 19.1405 2.23091C18.4659 1.97233 17.7469 1.8492 17.0247 1.86856C16.3024 1.88792 15.5911 2.04939 14.9313 2.34373C14.2715 2.63808 13.6761 3.05955 13.1793 3.58404L12.148 4.67207L11.06 3.64085C10.001 2.63717 8.58674 2.09528 7.12824 2.13437C5.66973 2.17347 4.28649 2.79035 3.28281 3.84932C2.27913 4.90829 1.73724 6.32259 1.77633 7.7811C1.81543 9.23961 2.43231 10.6229 3.49128 11.6265L4.5793 12.6577L12.565 20.2265L20.1337 12.2408L21.1649 11.1528C21.6621 10.6285 22.051 10.0114 22.3096 9.33681C22.5682 8.66218 22.6913 7.94321 22.6719 7.22099C22.6526 6.49876 22.4911 5.78742 22.1968 5.12761C21.9024 4.4678 21.481 3.87245 20.9565 3.37557Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default Heart;
