import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../store/Store";
import {
    addMovieToMyList,
    addTvShowToMyList,
    removeMovieFromMyList,
    removeTvShowFromMyList
} from "../../my-list/MyListService";
import {dislikeTvShow, getEpisode, getTvShow, getTvShows, likeTvShow} from "../TvShowsService";
import {Episode, TvShow} from "../TvShowsModels";
import {getMovie} from "../../movies/MoviesService";

interface IState
{
    tvShows: TvShow[];
    tvShowsForInfo?: TvShow;
    tvShowForWatching?: TvShow;
    episodeForWatching?: Episode;
    isTvShowsLoading: boolean;
    filteredTvShows: TvShow[];
}

const initialState : IState = {
    tvShowForWatching: undefined,
    tvShows: [],
    tvShowsForInfo: undefined,
    episodeForWatching: undefined,
    isTvShowsLoading: false,
    filteredTvShows: []
};

export const getTvShowsAsyncThunk = createAsyncThunk("tvShowsSlice/getTvShows", async () => getTvShows() );
export const getTvShowAsyncThunk = createAsyncThunk("tvShowsSlice/getTvShow", async (tvShowId: string) => getTvShow(tvShowId) );
export const getTvEpisodeAsyncThunk = createAsyncThunk("tvShowsSlice/getEpisode", async (episodeId: string) => getEpisode(episodeId) );
export const likeTvShowAsyncThunk = createAsyncThunk("tvShowsSlice/likeTvShow", async (tvShowId: string) => likeTvShow(tvShowId) );
export const dislikeTvShowAsyncThunk = createAsyncThunk("tvShowsSlice/dislikeTvShow", async (tvShowId: string) => dislikeTvShow(tvShowId) );
export const addTvShowToMyListAsyncThunk= createAsyncThunk("tvShowsSlice/addTvShowToMyList", async (tvShowId: string) => addTvShowToMyList(tvShowId) );
export const removeTvShowFromMyListAsyncThunk= createAsyncThunk("tvShowsSlice/removeTvShowFromMyList", async (tvShowId: string) => removeTvShowFromMyList(tvShowId) );


const tvShowsSlice = createSlice({name: 'TvShowsSlice', initialState,
    reducers: {
        setTvShowForInfo(state, action){
            state.tvShowsForInfo = action.payload;
        },
        filterTvShowsByGenre(state, action) {
            state.filteredTvShows = state.tvShows.filter((movie) =>
                movie.tvShowGenres.some((genre) => genre.id === action.payload)
            );
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addTvShowToMyListAsyncThunk.fulfilled, (state, action) => {
                state.tvShows = state.tvShows.map(movie => {
                    if (movie.id === action.meta.arg) {
                        return {
                            ...movie,
                            isExistInUserList: true
                        };
                    }

                    return movie;
                });

                if(state.tvShowsForInfo !== undefined && state.tvShowsForInfo.id === action.meta.arg){
                    state.tvShowsForInfo.isExistInUserList = true;
                }
            })
            .addCase(removeTvShowFromMyListAsyncThunk.fulfilled, (state, action) => {
                state.tvShows = state.tvShows.map(movie => {
                    if (movie.id === action.meta.arg) {
                        return {
                            ...movie,
                            isExistInUserList: false
                        };
                    }

                    return movie;
                });

                if(state.tvShowsForInfo !== undefined && state.tvShowsForInfo.id === action.meta.arg){
                    state.tvShowsForInfo.isExistInUserList = false;
                }
            })
            .addCase(getTvShowsAsyncThunk.fulfilled, (state, action) => {
                state.tvShows = action.payload || [];
                state.isTvShowsLoading = false;
            })
            .addCase(getTvShowsAsyncThunk.pending, (state, action) => {
                state.isTvShowsLoading = true;
            })
            // .addCase(getMovieAsyncThunk.fulfilled, (state, action) => {
            //     state.tvShowForWatching = action.payload
            // })

            .addCase(getTvShowAsyncThunk.fulfilled, (state, action) => {
                state.tvShowForWatching = action.payload
            })
            .addCase(getTvEpisodeAsyncThunk.fulfilled, (state, action) => {
                state.episodeForWatching = action.payload
            })
            .addCase(likeTvShowAsyncThunk.fulfilled, (state, action) => {
                state.tvShows = state.tvShows.map(movie => {
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

                if(state.tvShowsForInfo){
                    if(state.tvShowsForInfo.isLiked){
                        state.tvShowsForInfo.isLiked = false;
                    }
                    else if(!state.tvShowsForInfo.isLiked){
                        state.tvShowsForInfo.isLiked = true;
                        state.tvShowsForInfo.isDisliked = false;
                    }
                }
            })
            .addCase(dislikeTvShowAsyncThunk.fulfilled, (state, action) => {
                state.tvShows = state.tvShows.map(movie => {
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

                if(state.tvShowsForInfo){
                    if(state.tvShowsForInfo.isDisliked){
                        state.tvShowsForInfo.isDisliked = false;
                    }
                    else if(!state.tvShowsForInfo.isDisliked){
                        state.tvShowsForInfo.isDisliked = true;
                        state.tvShowsForInfo.isLiked = false;
                    }
                }
            })
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = tvShowsSlice;
export const {setTvShowForInfo, filterTvShowsByGenre} = actions;
export const tvShowsState = (state: RootState) => state.tvShowsSlice;
export default reducer;