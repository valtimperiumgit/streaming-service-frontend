import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../store/Store";
import {Country} from "../CountriesModels";
import {getCountries} from "../api/CountriesService";

interface IState
{
    countries: Country[]
}

const initialState : IState = {
    countries: []
};

export const getCountriesAsyncThunk = createAsyncThunk("countriesSlice/countries", async () =>  getCountries());

const countriesSlice = createSlice({name: 'CountriesSlice', initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(getCountriesAsyncThunk.fulfilled, (state, {payload}) => {
                state.countries = payload ? payload.data.data.countries : [];
            })
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = countriesSlice;
export const {} = actions;
export const countriesState = (state: RootState) => state.countriesSlice;
export default reducer;