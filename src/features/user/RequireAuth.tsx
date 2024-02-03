import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {logout, userState} from "./store/UserSlice";
import authorizedAxiosInstance from "../../api/AuthorizedAxiosInstance";
import {HttpStatusCode} from "axios";
import React from "react";

const RequireAuth = ({children} : any)=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(userState).token;

    if(token === null){
        return <Navigate to='/signin' replace/>
    }

    authorizedAxiosInstance.interceptors.response.use(
        response => { return response;},
        error => {
            if (error.response.status === HttpStatusCode.Unauthorized) {

                dispatch(logout());
                navigate('/signin')
            }
            else {
                throw error;
            }
        }
    );

    return children;
}

export default RequireAuth