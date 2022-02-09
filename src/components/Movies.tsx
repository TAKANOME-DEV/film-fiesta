/* eslint-disable @typescript-eslint/no-non-null-assertion */
import _ from "lodash";
import { Component } from "react";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getGenres } from "../services/genreService";
import { deleteMovie, getMovies } from "../services/movieService";
//* Types
import { GenreType } from "../types/GenreType";
import { MovieType } from "../types/MovieType";
//* Services
import { paginate } from "../utils/paginate";
import CardList from "./CardList";
import Pagination from "./common/Pagination";
//* Components
import Search from "./common/Search";
// import MoviesTable from "./MoviesTable";
import { MoviesPropsType, MoviesStateType, SortColumnType } from "./types";

export default class Movies extends Component<
	MoviesPropsType,
	MoviesStateType
> {
	//* Initial State
	state: MoviesStateType = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		selectedGenre: { _id: "", name: "" },
		searchQuery: "",
		sortColumn: { path: "title", order: "asc" },
	};

	async componentDidMount() {
		const data = await getGenres();
		const movies = await getMovies();
		const genres = [{ _id: "", name: "All Genres" }, ...data!];
		this.setState({ movies, genres });
	}

	handleLikeMovie = (movie: MovieType) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handleDeleteMovie = async (id: string) => {
		const originalMovies = this.state.movies;
		const movies = originalMovies.filter((m) => m._id !== id);
		this.setState({ movies });

		try {
			await deleteMovie(id);
		} catch (err: any) {
			if (err.request) {
				toast.error(err.data);
			}
			return this.setState({ movies: originalMovies });
		}
	};

	handlePageChange = (page: number) => this.setState({ currentPage: page });

	handleGenreSelect = (genre: GenreType) =>
		this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });

	handleSearch = (query: string) =>
		this.setState({
			searchQuery: query,
			selectedGenre: { _id: "", name: "" },
			currentPage: 1,
		});

	handleSortMovie = (sortColumn: SortColumnType) =>
		this.setState({ sortColumn });

	handleGetData = () => {
		const {
			movies: allMovies,
			pageSize,
			currentPage,
			selectedGenre,
			sortColumn,
			searchQuery,
		} = this.state;

		let filtered = allMovies;

		if (searchQuery)
			filtered = allMovies.filter((m) =>
				m.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter((m) =>
				m.genres.find((g) => g._id === selectedGenre._id)
			);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const movies = paginate(sorted, currentPage, pageSize);
		return { totalCount: filtered.length, movies };
	};

	render() {
		const {
			pageSize,
			currentPage,
			// genres,
			// selectedGenre,
			searchQuery,
			// sortColumn,
		} = this.state;
		const { totalCount, movies } = this.handleGetData();

		if (this.state.movies.length === 0)
			return <p>There are no movies in the database</p>;

		return (
			<div className="row">
				{/* <div className="col-3">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelected={this.handleGenreSelect}
					/>
				</div> */}
				<div className="col">
					{/* {this.props.user && (
						<Link to="/movies/new" className="btn btn-primary mb-3">
							New Movie
						</Link>
					)} */}
					<Search value={searchQuery} onSearch={this.handleSearch} />
					<p>Showing {totalCount} movies in the database</p>
					{/* <MoviesTable
						movies={movies}
						sortColumn={sortColumn}
						handleDelete={this.handleDeleteMovie}
						handleLike={this.handleLikeMovie}
						handleSort={this.handleSortMovie}
					/> */}
					<CardList movies={movies} handleLike={this.handleLikeMovie} />
					<Pagination
						pageSize={pageSize}
						itemsCount={totalCount}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}
