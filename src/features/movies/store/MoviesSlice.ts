import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../store/Store";
import {Movie} from "../MoviesModels";
import {dislikeMovie, getMovies, likeMovie} from "../MoviesService";
import {Pagination} from "../../shared/Pagination";
import movies from "../../../pages/movies/Movies";
import {addMovieToMyList, removeMovieFromMyList} from "../../my-list/MyListService";

interface IState
{
    movies: Movie[];
    movieForInfo?: Movie;
}

const initialState : IState = {
    movies: [],
    movieForInfo: undefined
};

export const getMoviesAsyncThunk = createAsyncThunk("moviesSlice/getMovies", async (pagination: Pagination) => getMovies(pagination) );
export const likeMovieAsyncThunk = createAsyncThunk("moviesSlice/likeMovie", async (movieId: string) => likeMovie(movieId) );
export const dislikeMovieAsyncThunk = createAsyncThunk("moviesSlice/dislikeMovie", async (movieId: string) => dislikeMovie(movieId) );
export const addMovieToMyListAsyncThunk= createAsyncThunk("moviesSlice/addMovieToMyList", async (movieId: string) => addMovieToMyList(movieId) );
export const removeMovieFromMyListAsyncThunk= createAsyncThunk("moviesSlice/removeMovieFromMyList", async (movieId: string) => removeMovieFromMyList(movieId) );


const moviesSlice = createSlice({name: 'MoviesSlice', initialState,
    reducers: {
        setMovieForInfo(state, action){
            state.movieForInfo = action.payload;
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
                state.movies = action.payload?.data?.items || []
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
export const {setMovieForInfo} = actions;
export const moviesState = (state: RootState) => state.moviesSlice;
export default reducer;