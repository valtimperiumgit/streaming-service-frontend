import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../store/Store";
import {User} from "../UserModels";

interface IState
{
    user?: User;
    tempEmail: string;
}

const initialState : IState = {
    user: undefined,
    tempEmail: ""
};

const authSlice = createSlice({name: 'UserSlice', initialState,
    reducers: {
        setTempEmail: (state, action) => {
            state.tempEmail = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = authSlice;
export const {setTempEmail} = actions;
export const userState = (state: RootState) => state;
export default reducer;