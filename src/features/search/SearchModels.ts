import {Movie} from "../movies/MoviesModels";
import {TvShow} from "../tv-shows/TvShowsModels";

export interface SearchContentResponse{
    movies: Movie[];
    tvShows: TvShow[];
}