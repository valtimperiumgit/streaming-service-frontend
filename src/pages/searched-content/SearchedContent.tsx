import "./SearchedContent.css"
import BrowseHeader from "../../components/browse/browse-header/BrowseHeader";
import React, {useEffect, useState} from "react";
import {AppDispatch} from "../../store/Store";
import {useDispatch, useSelector} from "react-redux";
import {searchContent} from "../../features/search/SearchService";
import {useLocation} from "react-router-dom";
import {searchContentAsyncThunk, searchState} from "../../features/search/store/SearchSlice";
import Loading from "../../components/default/Loading";
import MovieCard from "../../components/default/cards/movie-card/MovieCard";
import {Movie} from "../../features/movies/MoviesModels";
import {setMovieForInfo} from "../../features/movies/store/MoviesSlice";
import MovieInfoModal from "../../components/default/modals/movie-info-modal/MovieInfoModal";
import TopPagePlayer from "../../components/default/players/top-page-player/TopPagePlayer";
import TvShowCard from "../../components/default/cards/tv-show-card/TvShowCard";
import TvShowInfoModal from "../../components/default/modals/tv-show-info-modal/TvShowInfoModal";

enum ViewMods{
    Movies,
    TvShows
}

const SearchedContent = () => {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const [isMovieInfoModalOpen, setIsMovieInfoModalOpen] = useState(false);
    const [isMoviePreview, setIsMoviePreview] = useState(false);

    const [isTvShowInfoModalOpen, setIsTvShowInfoModalOpen] = useState(false);
    const [isTvShowPreview, setIsTvShowPreview] = useState(false);

    const [mode, setMode] = useState<ViewMods>(ViewMods.Movies);

    const searchQuery = location?.state.query;

    const closeMovieInfoModal = () => {
        setIsMovieInfoModalOpen(false);
    }

    const openMovieInfoModal = (movie: Movie) => {
        dispatch(setMovieForInfo(movie));
        setIsMovieInfoModalOpen(true);
    }

    const closeTvShowInfoModal = () => {
        setIsTvShowInfoModalOpen(false);
    }

    let isContentLoading = useSelector(searchState).isContentLoading;
    let movies = useSelector(searchState).movies;
    let tvShows = useSelector(searchState).tvShows;

    useEffect(() => {
        dispatch(searchContentAsyncThunk(searchQuery));
    }, [searchQuery]);

    const renderMovies = () => {
        return movies.map(movie =>  <MovieCard movie={movie} onHoverAction={setIsMoviePreview} openInfo={() => {setIsMovieInfoModalOpen(true)}} />)
    }

    const renderTvShows = () => {
        return tvShows.map(tvShow =>  <TvShowCard tvShow={tvShow} onHoverAction={setIsTvShowPreview} openInfo={() => {setIsTvShowInfoModalOpen(true)}} />)
    }

    return (
        <div className="searched-content-container">
            {isContentLoading && <Loading/> }

            {!isContentLoading &&
                <div className="searched-content">
                    <BrowseHeader/>

                    <div className="searched-content-view-modes">
                        <div
                            onClick={() => {setMode(ViewMods.Movies)}}
                            className={mode === ViewMods.Movies ? "searched-content-view-mode-active"
                                : "searched-content-view-mode"}> Movies </div>

                        <div
                            onClick={() => {setMode(ViewMods.TvShows)}}
                            className={mode === ViewMods.TvShows ? "searched-content-view-mode-active"
                                : "searched-content-view-mode"}> TV Shows
                        </div>
                    </div>

                    <div className="searched-content-title">
                        Results for query: {searchQuery}
                    </div>

                    {mode === ViewMods.Movies &&
                    <div className="movies-list">
                        {renderMovies()}
                    </div>
                    }

                    {mode === ViewMods.TvShows &&
                        <div className="movies-list">
                            {renderTvShows()}
                        </div>
                    }

                    {isMovieInfoModalOpen && <MovieInfoModal close={closeMovieInfoModal}/>}
                    {isTvShowInfoModalOpen && <TvShowInfoModal close={closeTvShowInfoModal}/>}
                </div>}

        </div>
    );
};

export default SearchedContent;