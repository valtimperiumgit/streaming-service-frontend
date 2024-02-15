import "./MyList.css"
import React, {useEffect, useState} from "react";
import BrowseHeader from "../../components/browse/browse-header/BrowseHeader";
import {getMoviesAsyncThunk, moviesState, setMovieForInfo} from "../../features/movies/store/MoviesSlice";
import {getUserAsyncThunk, userState} from "../../features/user/store/UserSlice";
import {getGenresAsyncThunk} from "../../features/genres/store/GenresSlice";
import {AppDispatch} from "../../store/Store";
import {useDispatch, useSelector} from "react-redux";
import MovieCard from "../../components/default/cards/movie-card/MovieCard";
import {Movie} from "../../features/movies/MoviesModels";
import MovieInfoModal from "../../components/default/modals/movie-info-modal/MovieInfoModal";
import {getTvShowsAsyncThunk, tvShowsState} from "../../features/tv-shows/store/TvShowsSlice";
import TvShowCard from "../../components/default/cards/tv-show-card/TvShowCard";

enum ViewMods{
    Movies,
    TvShows
}

const MyList = () => {
    const dispatch: AppDispatch = useDispatch();
    let user = useSelector(userState).user;
    let movies = useSelector(moviesState).movies;
    let tvShows = useSelector(tvShowsState).tvShows;

    const [isMovieInfoModalOpen, setIsMovieInfoModalOpen] = useState(false);
    const [isMoviePreview, setIsMoviePreview] = useState(false);

    const [isTvShowInfoModalOpen, setIsTvShowInfoModalOpen] = useState(false);
    const [isTvShowPreview, setIsTvShowPreview] = useState(false);

    const [mode, setMode] = useState<ViewMods>(ViewMods.Movies);

    const closeMovieInfoModal = () => {
        setIsMovieInfoModalOpen(false);
    }

    const openMovieInfoModal = (movie: Movie) => {
        dispatch(setMovieForInfo(movie));
        setIsMovieInfoModalOpen(true);
    }

    useEffect(() => {
        dispatch(getMoviesAsyncThunk())
        dispatch(getTvShowsAsyncThunk())
        if(user === undefined){
            dispatch(getUserAsyncThunk());
        }
    },[])

    const renderMyListMovies = () => {
        return movies
            .filter(movie => movie.isExistInUserList)
            .map(movie =>  <MovieCard movie={movie} onHoverAction={setIsMoviePreview} openInfo={() => {setIsMovieInfoModalOpen(true)}} />)
    }

    const renderMyListTvShows = () => {
        return tvShows
            .filter(tvShow => tvShow.isExistInUserList)
            .map(tvShow =>  <TvShowCard tvShow={tvShow} onHoverAction={setIsTvShowPreview} openInfo={() => {setIsTvShowInfoModalOpen(true)}} />)
    }


    return (
        <div className="my-list">
            <BrowseHeader/>

            <div className="my-list-title">
                My List
            </div>

            <div className="searched-content-view-modes">
                <div
                    onClick={() => {
                        setMode(ViewMods.Movies)
                    }}
                    className={mode === ViewMods.Movies ? "searched-content-view-mode-active"
                        : "searched-content-view-mode"}> Movies
                </div>

                <div
                    onClick={() => {
                        setMode(ViewMods.TvShows)
                    }}
                    className={mode === ViewMods.TvShows ? "searched-content-view-mode-active"
                        : "searched-content-view-mode"}> TV Shows
                </div>
            </div>

            {mode === ViewMods.Movies && <div className="my-list-movies-list">
                {renderMyListMovies()}
            </div> }

            {mode === ViewMods.TvShows && <div className="my-list-movies-list">
                {renderMyListTvShows()}
            </div>}

            {isMovieInfoModalOpen && <MovieInfoModal close={closeMovieInfoModal}/>}
        </div>
    );
};

export default MyList;