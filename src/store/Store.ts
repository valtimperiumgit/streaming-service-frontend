import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from "../features/user/store/UserSlice";

const rootReducer = combineReducers({
    userSlice: userSlice,
});

const store = configureStore({
    reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch