import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from "../features/user/store/UserSlice";
import countriesSlice from "../features/countries/store/CountriesSlice";
import moviesSlice from "../features/movies/store/MoviesSlice";

const rootReducer = combineReducers({
    userSlice: userSlice,
    countriesSlice: countriesSlice,
    moviesSlice: moviesSlice
});

const store = configureStore({
    reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch