import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../store/Store";
import {User} from "../UserModels";
import {getUser, login, registration} from "../api/UserService";
import {SignInRequest, SignUpRequest} from "../api/UserRequests";

interface IState
{
    user?: User;
    tempEmail: string;
    token: string | null;
    loginError: string | null;
}

const initialState : IState = {
    user: undefined,
    tempEmail: "",
    token: localStorage.getItem("token"),
    loginError: null
};

export const registrationAsyncThunk = createAsyncThunk("userSlice/registration", async (requestBody: SignUpRequest) => registration(requestBody) );
export const loginAsyncThunk = createAsyncThunk("userSlice/login", async (requestBody: SignInRequest) => login(requestBody) );
export const getUserAsyncThunk = createAsyncThunk("userSlice/getUser", async () => getUser() );

const userSlice = createSlice({name: 'UserSlice', initialState,
    reducers: {
        setTempEmail: (state, action) => {
            state.tempEmail = action.payload;
        },
        logout: (state) =>{
            state.token = null;
            state.user = undefined;
            localStorage.removeItem("token");
        },
        refreshLoginError(state){
            state.loginError = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registrationAsyncThunk.fulfilled, (state, action) => {
                state.user = action?.payload?.data.user || undefined;
                state.token = action.payload?.data.token || null;

                if(action.payload?.data.token)
                    localStorage.setItem("token", action.payload?.data.token)
            })
            .addCase(loginAsyncThunk.fulfilled, (state, action) => {
                state.user = action?.payload?.data.user || undefined;
                state.token = action.payload?.data.token || null;

                if(action.payload?.data.token)
                    localStorage.setItem("token", action.payload?.data.token)
            })
            .addCase(getUserAsyncThunk.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(loginAsyncThunk.rejected, (state, action) => {
                state.loginError = action.error.message || null;
            })
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = userSlice;
export const {
    setTempEmail,
    logout,
    refreshLoginError} = actions;
export const userState = (state: RootState) => state.userSlice;
export default reducer;