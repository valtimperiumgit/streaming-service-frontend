import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserAsyncThunk, userState} from "../../features/user/store/UserSlice";
import BrowseHeader from "../../components/browse/browse-header/BrowseHeader";
import {AppDispatch} from "../../store/Store";
import TopPagePlayer from "../../components/default/players/top-page-player/TopPagePlayer";
import './Browse.css'
import MovieInfoModal from "../../components/default/modals/movie-info-modal/MovieInfoModal";
import Loading from "../../components/default/Loading";

const Browse = () => {
    return (
        <Loading />
    );
};

export default Browse;