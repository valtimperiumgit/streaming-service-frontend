import "./Movies.css"
import BrowseHeader from "../../components/browse/browse-header/BrowseHeader";
import {AppDispatch} from "../../store/Store";
import {useDispatch, useSelector} from "react-redux";
import {getUserAsyncThunk, userState} from "../../features/user/store/UserSlice";
import React, {useEffect, useState} from "react";
import TopPagePlayer from "../../components/default/players/top-page-player/TopPagePlayer";
import MovieInfoModal from "../../components/default/modals/movie-info-modal/MovieInfoModal";
import {getMoviesAsyncThunk, moviesState, setMovieForInfo} from "../../features/movies/store/MoviesSlice";
import {Movie} from "../../features/movies/MoviesModels";
import MovieCard from "../../components/default/cards/movie-card/MovieCard";

const Movies = () => {
    const dispatch: AppDispatch = useDispatch();
    let user = useSelector(userState).user;
    let movies = useSelector(moviesState).movies;

    const [isMovieInfoModalOpen, setIsMovieInfoModalOpen] = useState(false);

    const closeMovieInfoModal = () => {
        setIsMovieInfoModalOpen(false);
    }

    const openMovieInfoModal = (movie: Movie) => {
        dispatch(setMovieForInfo(movie));
        setIsMovieInfoModalOpen(true);
    }

    useEffect(() => {
        dispatch(getMoviesAsyncThunk({pageNumber: 1, pageSize: 2}))
        if(user === undefined){
            dispatch(getUserAsyncThunk());
        }
    },[])

    return (
        <div className="movies">
            <BrowseHeader/>
            <TopPagePlayer
                maturityRating={movies[0]?.maturityRating | 0}
                logoUrl={movies[0]?.logoUrl || ""}
                isInfoModalOpen={isMovieInfoModalOpen}
                videoUrl={movies[0]?.trailerUrl || ""}
                autoPlay={true}
                controls={false}
                info={() => openMovieInfoModal(movies[0])}
                posterUrl={movies[0]?.imageUrl || ""}
            />

            <div>
                <MovieCard movie={movies[2]} />
            </div>

            {isMovieInfoModalOpen && <MovieInfoModal close={closeMovieInfoModal} />}

        </div>
    );
};

export default Movies;