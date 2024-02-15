import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../store/Store";
import {Genre} from "../GenresModels";
import {getGenres} from "../api/GenresService";

interface IState
{
    genres: Genre[],
}

const initialState : IState = {
    genres: []
};

export const getGenresAsyncThunk = createAsyncThunk("genresSlice/countries", async () =>  getGenres());

const genresSlice = createSlice({name: 'GenresSlice', initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(getGenresAsyncThunk.fulfilled, (state, {payload}) => {
                state.genres = payload ? payload.data.data.genres : [];
            })
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = genresSlice;
export const {} = actions;
export const genresState = (state: RootState) => state.genresSlice;
export default reducer;