import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../store/Store";
import {Movie} from "../MoviesModels";
import {dislikeMovie, getMovie, getMovies, likeMovie} from "../MoviesService";
import {Pagination} from "../../shared/Pagination";
import movies from "../../../pages/movies/Movies";
import {addMovieToMyList, removeMovieFromMyList} from "../../my-list/MyListService";
import {Genre} from "../../genres/GenresModels";

interface IState
{
    movies: Movie[];
    movieForInfo?: Movie;
    movieForWatching?: Movie;
    isMoviesLoading: boolean;
    filteredMovies: Movie[];
}

const initialState : IState = {
    movies: [],
    movieForInfo: undefined,
    movieForWatching: undefined,
    isMoviesLoading: false,
    filteredMovies: []
};

export const getMoviesAsyncThunk = createAsyncThunk("moviesSlice/getMovies", async () => getMovies() );
export const getMovieAsyncThunk = createAsyncThunk("moviesSlice/getMovie", async (movieId: string) => getMovie(movieId) );
export const likeMovieAsyncThunk = createAsyncThunk("moviesSlice/likeMovie", async (movieId: string) => likeMovie(movieId) );
export const dislikeMovieAsyncThunk = createAsyncThunk("moviesSlice/dislikeMovie", async (movieId: string) => dislikeMovie(movieId) );
export const addMovieToMyListAsyncThunk= createAsyncThunk("moviesSlice/addMovieToMyList", async (movieId: string) => addMovieToMyList(movieId) );
export const removeMovieFromMyListAsyncThunk= createAsyncThunk("moviesSlice/removeMovieFromMyList", async (movieId: string) => removeMovieFromMyList(movieId) );


const moviesSlice = createSlice({name: 'MoviesSlice', initialState,
    reducers: {
        setMovieForInfo(state, action){
            state.movieForInfo = action.payload;
        },
        filterMoviesByGenre(state, action) {
            state.filteredMovies = state.movies.filter((movie) =>
                movie.movieGenres.some((genre) => genre.id === action.payload)
            );
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addMovieToMyListAsyncThunk.fulfilled, (state, action) => {
                state.movies = state.movies.map(movie => {
                    if (movie.id === action.meta.arg) {
                        return {
                            ...movie,
                            isExistInUserList: true
                        };
                    }

                    return movie;
                });

                if(state.movieForInfo !== undefined && state.movieForInfo.id === action.meta.arg){
                    state.movieForInfo.isExistInUserList = true;
                }
            })
            .addCase(removeMovieFromMyListAsyncThunk.fulfilled, (state, action) => {
                state.movies = state.movies.map(movie => {
                    if (movie.id === action.meta.arg) {
                        return {
                            ...movie,
                            isExistInUserList: false
                        };
                    }

                    return movie;
                });

                if(state.movieForInfo !== undefined && state.movieForInfo.id === action.meta.arg){
                    state.movieForInfo.isExistInUserList = false;
                }
            })
            .addCase(getMoviesAsyncThunk.fulfilled, (state, action) => {
                state.movies = action.payload || [];
                state.isMoviesLoading = false;
            })
            .addCase(getMoviesAsyncThunk.pending, (state, action) => {
                state.isMoviesLoading = true;
            })
            .addCase(getMovieAsyncThunk.fulfilled, (state, action) => {
                state.movieForWatching = action.payload
            })
            .addCase(likeMovieAsyncThunk.fulfilled, (state, action) => {
                state.movies = state.movies.map(movie => {
                    if (movie.id === action.meta.arg) {
                        if(movie.isLiked){
                            return {
                                ...movie,
                                isLiked: false
                            };
                        }
                        else if(!movie.isLiked){
                            return {
                                ...movie,
                                isLiked: true,
                                isDisliked: false
                            };
                        }
                    }

                    return movie;
                });

                if(state.movieForInfo){
                    if(state.movieForInfo.isLiked){
                        state.movieForInfo.isLiked = false;
                    }
                    else if(!state.movieForInfo.isLiked){
                        state.movieForInfo.isLiked = true;
                        state.movieForInfo.isDisliked = false;
                    }
                }
            })
            .addCase(dislikeMovieAsyncThunk.fulfilled, (state, action) => {
                state.movies = state.movies.map(movie => {
                    if (movie.id === action.meta.arg) {
                        if(movie.isDisliked){
                            return {
                                ...movie,
                                isDisliked: false
                            };
                        }
                        else if(!movie.isDisliked){
                            return {
                                ...movie,
                                isLiked: false,
                                isDisliked: true
                            };
                        }
                    }

                    return movie;
                });

                if(state.movieForInfo){
                    if(state.movieForInfo.isDisliked){
                        state.movieForInfo.isDisliked = false;
                    }
                    else if(!state.movieForInfo.isDisliked){
                        state.movieForInfo.isDisliked = true;
                        state.movieForInfo.isLiked = false;
                    }
                }
            })
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = moviesSlice;
export const {setMovieForInfo, filterMoviesByGenre} = actions;
export const moviesState = (state: RootState) => state.moviesSlice;
export default reducer;