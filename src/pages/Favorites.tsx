import EmptyFavorite from "../components/EmptyFavorite";
import { Container as Empty } from "../components/styles/Empty.styled";

const Favorites = () => {
	// const { favorites, onRefetchFavorites } = useContext(Context);

	// useEffect(() => {
	// 	onRefetchFavorites?.();
	// 		// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<>
			{/* {favorites.length > 0 ? (
				<>
					<Title name="Favorites" />
					<Container>
						{favorites.map((f) => (
							<Card movie={f} key={f._id} />
						))}
					</Container>
				</>
			) : ( */}
			<Empty className="flex">
				<EmptyFavorite />
				<div>
					<p>You have no favorites yet.</p>
					<p>This is where you’ll see movies you like.</p>
				</div>
			</Empty>
			{/* )} */}
		</>
	);
};

export default Favorites;
