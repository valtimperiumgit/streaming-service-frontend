import "./TvShows.css"
import BrowseHeader from "../../components/browse/browse-header/BrowseHeader";
import TopPagePlayer from "../../components/default/players/top-page-player/TopPagePlayer";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    filterTvShowsByGenre,
    getTvShowsAsyncThunk,
    setTvShowForInfo,
    tvShowsState
} from "../../features/tv-shows/store/TvShowsSlice";
import {AppDispatch} from "../../store/Store";
import {getTvShows} from "../../features/tv-shows/TvShowsService";
import {
    filterMoviesByGenre,
    getMoviesAsyncThunk,
    moviesState,
    setMovieForInfo
} from "../../features/movies/store/MoviesSlice";
import {getUserAsyncThunk, userState} from "../../features/user/store/UserSlice";
import {genresState, getGenresAsyncThunk} from "../../features/genres/store/GenresSlice";
import {Movie} from "../../features/movies/MoviesModels";
import {TvShow} from "../../features/tv-shows/TvShowsModels";
import MovieInfoModal from "../../components/default/modals/movie-info-modal/MovieInfoModal";
import TvShowInfoModal from "../../components/default/modals/tv-show-info-modal/TvShowInfoModal";
import MovieCard from "../../components/default/cards/movie-card/MovieCard";
import TvShowCard from "../../components/default/cards/tv-show-card/TvShowCard";
import Loading from "../../components/default/Loading";

const TvShows = () => {
    const dispatch: AppDispatch = useDispatch();
    let tvShows = useSelector(tvShowsState).tvShows;
    let user = useSelector(userState).user;
    let genres = useSelector(genresState).genres;
    let filteredTvShows = useSelector(tvShowsState).filteredTvShows;

    let isTvShowsLoading = useSelector(tvShowsState).isTvShowsLoading;

    const [genreFilter, setGenreFilter] = useState<string>("");

    const [isTvShowInfoModalOpen, setIsMovieInfoModalOpen] = useState(false);
    const [isTvShowPreview, setIsMoviePreview] = useState(false);

    useEffect(() => {
        dispatch(getTvShowsAsyncThunk())
        if(user === undefined){
            dispatch(getUserAsyncThunk());
        }
        dispatch(getGenresAsyncThunk());
    }, []);

    const closeTvShowInfoModal = () => {
        setIsMovieInfoModalOpen(false);
    }

    const renderGenres = () => {
        return genres.map(genre =>
            <option value={genre.id}>{genre.name}</option>
        )
    }

    const openTvShowInfoModal = (tvShow: TvShow) => {
        dispatch(setTvShowForInfo(tvShow));
        setIsMovieInfoModalOpen(true);
    }

    const renderMovies = () => {
        return tvShows.map(tvShow =>  <TvShowCard tvShow={tvShow} onHoverAction={setIsMoviePreview} openInfo={() => {setIsMovieInfoModalOpen(true)}} />)
    }

    const renderFilteredMovies = () => {
        return filteredTvShows.map(tvShow =>  <TvShowCard tvShow={tvShow} onHoverAction={setIsMoviePreview} openInfo={() => {setIsMovieInfoModalOpen(true)}} />)
    }

    return (
        <div>
            {isTvShowsLoading && (<Loading/>)}

            {!isTvShowsLoading && <div className="tv-shows">
                <BrowseHeader/>
                <TopPagePlayer
                    maturityRating={tvShows[0]?.maturityRating | 0}
                    logoUrl={tvShows[0]?.logoUrl || ""}
                    isInfoModalOpen={isTvShowInfoModalOpen || isTvShowPreview}
                    videoUrl={tvShows[0]?.trailerUrl || ""}
                    autoPlay={true}
                    controls={false}
                    info={() => openTvShowInfoModal(tvShows[0])}
                    posterUrl={tvShows[0]?.imageUrl || ""}
                    movieId={tvShows[0]?.id || ""}
                />

                <div className="movies-genres">
                    <div className="movies-genres-title"> TV Shows</div>
                    <select onChange={(e) => {
                        setGenreFilter(e?.currentTarget?.value);
                        dispatch(filterTvShowsByGenre(e?.currentTarget?.value))
                    }} className="movies-genres-select" name="" id="">
                        <option value={""}>All genres</option>
                        {renderGenres()}
                    </select>
                </div>

                {genreFilter === "" &&
                    <div className="movies-list">
                        {renderMovies()}
                    </div>
                }

                {genreFilter != null &&
                    <div className="movies-list">
                        {renderFilteredMovies()}
                    </div>
                }

                {isTvShowInfoModalOpen && <TvShowInfoModal close={closeTvShowInfoModal}/>}
            </div>}
        </div>
    );
};

export default TvShows;