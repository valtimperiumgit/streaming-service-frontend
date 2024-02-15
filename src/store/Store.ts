import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from "../features/user/store/UserSlice";
import countriesSlice from "../features/countries/store/CountriesSlice";
import moviesSlice from "../features/movies/store/MoviesSlice";
import searchSlice, {searchState} from "../features/search/store/SearchSlice";
import genresSlice from "../features/genres/store/GenresSlice";
import tvShowsSlice from "../features/tv-shows/store/TvShowsSlice";

const rootReducer = combineReducers({
    userSlice: userSlice,
    countriesSlice: countriesSlice,
    moviesSlice: moviesSlice,
    tvShowsSlice: tvShowsSlice,
    searchSlice: searchSlice,
    genresSlice: genresSlice
});

const store = configureStore({
    reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch