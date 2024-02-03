import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {userState} from "./store/UserSlice";
import React from "react";

const ReplacedForAuth = ({children} : any)=>{

    const token = useSelector(userState).token;

    if(token === null){
        return children;
    }

    return <Navigate to='/browse' replace/>
}

export default ReplacedForAuth