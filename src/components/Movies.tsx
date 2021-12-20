import { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { GenreType, MoviesType } from "../services/types";
import ListGroup from "./ListGroup";
import MoviesTable from "./MoviesTable";
import Pagination from "./Pagination";

interface IState {
  movies: MoviesType[];
  genres: GenreType[];
  pageSize: number;
}

export default class Movies extends Component<{}, IState> {
  state: Readonly<IState> = {
    movies: [],
    genres: [],
    pageSize: 4,
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  hanlePageChange = (page: number) => {
    console.log(page);
  };

  handleGenreChange = (item: GenreType) => {
    console.log(item);
  };

  render() {
    const { movies, pageSize, genres } = this.state;

    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup items={genres} onItemSelected={this.handleGenreChange} />
        </div>
        <div className="col">
          <p>Showing {count} movies in the database</p>
          <MoviesTable movies={movies} />
          <Pagination
            pageSize={pageSize}
            itemsCount={count}
            onPageChange={this.hanlePageChange}
          />
        </div>
      </div>
    );
  }
}
