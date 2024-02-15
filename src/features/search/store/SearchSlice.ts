import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../store/Store";
import {Movie} from "../../movies/MoviesModels";
import {searchContent} from "../SearchService";
import {TvShow} from "../../tv-shows/TvShowsModels";

interface IState
{
    movies: Movie[],
    tvShows: TvShow[],
    isContentLoading: boolean
}

const initialState : IState = {
    movies: [],
    tvShows: [],
    isContentLoading: false
};

export const searchContentAsyncThunk = createAsyncThunk("searchSlice/searchContent", async (query: string) => searchContent(query) );

const searchSlice = createSlice({name: 'SearchSlice', initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(searchContentAsyncThunk.fulfilled, (state, action) => {
                console.log(action.payload);

                state.movies = action.payload?.movies || [];
                state.tvShows = action.payload?.tvShows || [];
                state.isContentLoading = false;
            })
            .addCase(searchContentAsyncThunk.pending, (state, action) => {
                state.isContentLoading = true;
            })
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = searchSlice;
export const {} = actions;
export const searchState = (state: RootState) => state.searchSlice;
export default reducer;