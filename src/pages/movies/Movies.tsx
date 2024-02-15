import "./Movies.css"
import BrowseHeader from "../../components/browse/browse-header/BrowseHeader";
import {AppDispatch} from "../../store/Store";
import {useDispatch, useSelector} from "react-redux";
import {getUserAsyncThunk, userState} from "../../features/user/store/UserSlice";
import React, {useEffect, useState} from "react";
import TopPagePlayer from "../../components/default/players/top-page-player/TopPagePlayer";
import MovieInfoModal from "../../components/default/modals/movie-info-modal/MovieInfoModal";
import {
    filterMoviesByGenre,
    getMoviesAsyncThunk,
    moviesState,
    setMovieForInfo
} from "../../features/movies/store/MoviesSlice";
import {Movie} from "../../features/movies/MoviesModels";
import MovieCard from "../../components/default/cards/movie-card/MovieCard";
import MoviePlayer from "../movie-player/MoviePlayer";
import movieInfoModal from "../../components/default/modals/movie-info-modal/MovieInfoModal";
import Loading from "../../components/default/Loading";
import genresSlice, {genresState, getGenresAsyncThunk} from "../../features/genres/store/GenresSlice";

const Movies = () => {
    const dispatch: AppDispatch = useDispatch();
    let user = useSelector(userState).user;
    let movies = useSelector(moviesState).movies;
    let genres = useSelector(genresState).genres;
    let filteredMovies = useSelector(moviesState).filteredMovies;

    const [genreFilter, setGenreFilter] = useState<string>("");

    let isMoviesLoading = useSelector(moviesState).isMoviesLoading;

    const [isMovieInfoModalOpen, setIsMovieInfoModalOpen] = useState(false);
    const [isMoviePreview, setIsMoviePreview] = useState(false);

    const closeMovieInfoModal = () => {
        setIsMovieInfoModalOpen(false);
    }

    const openMovieInfoModal = (movie: Movie) => {
        dispatch(setMovieForInfo(movie));
        setIsMovieInfoModalOpen(true);
    }

    useEffect(() => {
        dispatch(getMoviesAsyncThunk())
        if(user === undefined){
            dispatch(getUserAsyncThunk());
        }
        dispatch(getGenresAsyncThunk());
    },[])

    const renderMovies = () => {
        return movies.map(movie =>  <MovieCard movie={movie} onHoverAction={setIsMoviePreview} openInfo={() => {setIsMovieInfoModalOpen(true)}} />)
    }

    const renderFilteredMovies = () => {
        return filteredMovies.map(movie =>  <MovieCard movie={movie} onHoverAction={setIsMoviePreview} openInfo={() => {setIsMovieInfoModalOpen(true)}} />)
    }

    const renderGenres = () => {
        return genres.map(genre =>
            <option value={genre.id}>{genre.name}</option>
        )
    }

    return (
        <div className="movies-container">
        {isMoviesLoading && (<Loading/>)}

            {!isMoviesLoading && <div className="movies">
                <BrowseHeader/>
                <TopPagePlayer
                    maturityRating={movies[0]?.maturityRating | 0}
                    logoUrl={movies[0]?.logoUrl || ""}
                    isInfoModalOpen={isMovieInfoModalOpen || isMoviePreview}
                    videoUrl={movies[0]?.trailerUrl || ""}
                    autoPlay={true}
                    controls={false}
                    info={() => openMovieInfoModal(movies[0])}
                    posterUrl={movies[0]?.imageUrl || ""}
                    movieId={movies[0]?.id || ""}
                />

                <div className="movies-genres">
                    <div className="movies-genres-title"> Movies </div>
                    <select onChange={(e) => {
                        setGenreFilter(e?.currentTarget?.value);
                        dispatch(filterMoviesByGenre(e?.currentTarget?.value))
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

                {isMovieInfoModalOpen && <MovieInfoModal close={closeMovieInfoModal}/>}

            </div>}
        </div>
    );
};

export default Movies;