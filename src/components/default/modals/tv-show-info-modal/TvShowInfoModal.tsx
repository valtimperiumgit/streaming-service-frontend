import {AppDispatch} from "../../../../store/Store";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Select, {StylesConfig, ActionMeta, SingleValue, MultiValue, Options } from 'react-select';
import {useEffect, useState} from "react";
import {Actor} from "../../../../features/actors/ActorsModels";
import {Genre} from "../../../../features/genres/GenresModels";
import {Creator} from "../../../../features/creators/CreatorsModels";
import {
    addTvShowToMyListAsyncThunk, dislikeTvShowAsyncThunk,
    likeTvShowAsyncThunk,
    removeTvShowFromMyListAsyncThunk,
    tvShowsState
} from "../../../../features/tv-shows/store/TvShowsSlice";
import {getTvShowLikePercentage} from "../../../../features/tv-shows/TvShowsService";
import "./TvShowInfoModal.css"
import {Episode, Season} from "../../../../features/tv-shows/TvShowsModels";
import EpisodeField from "../../../tv-shows/EpisodeField";

interface TvShowInfoModalProps{
    close: () => void;
}

export interface Option {
    label: string,
    value: Season
}

const TvShowInfoModal = (props: TvShowInfoModalProps) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    let tvShow = useSelector(tvShowsState).tvShowsForInfo;
    const [videoSource, setVideoSource] = useState<string>(tvShow?.trailerUrl || "");
    const [likePercentage, setLikePercentage] = useState<number>(100);
    const year = tvShow !== undefined ? new Date(tvShow.releaseDate).getFullYear() : new Date().getFullYear();
    const [selectedSeason, setSelectedSeason] = useState(tvShow !== undefined ? tvShow.seasons[0] : null);

    useEffect(() => {
        document.body.classList.add('no-scroll');

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    useEffect(() => {
        if(tvShow){
            getTvShowLikePercentage(tvShow?.id).then(res => { setLikePercentage(res?.data !== undefined ? res.data : 55) })
        }
    }, [tvShow]);

    const handleVideoEnd = () => {
        setVideoSource(tvShow?.imageUrl || "");
    };

    const renderMovieProperties = (data: Actor[] | Genre[] | Creator[] ) => {
        if(tvShow !== undefined) {
            const dataLength = data.length;
            return data.map((item, index) => {
                const separator = index === dataLength - 1 ? '.' : ', ';
                return <span key={item.id + " " + index}>{item.name}{separator}</span>;
            })
        }
    }

    const handleMyListClick = () => {
        if(tvShow !== undefined)
        {
            tvShow.isExistInUserList ?
                dispatch(removeTvShowFromMyListAsyncThunk(tvShow.id)) :
                dispatch(addTvShowToMyListAsyncThunk(tvShow.id));
        }
    }

    const customStyles: StylesConfig = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'rgb(36, 36, 36)',
            borderColor: 'rgb(77, 77, 77)',
            color: 'white',
            boxShadow: 'none',
            cursor: 'pointer',
            width: '200px',
            '&:hover': {
                borderColor: 'rgb(77, 77, 77)',
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'rgb(36, 36, 36)',
            color: 'white',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgb(36, 36, 36)',
            color: 'white',
            '&:hover': {
                backgroundColor: '#424242',
                color: 'white',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white',
        }),
    };

    const options = tvShow?.seasons
        .slice() // Создаем копию массива
        .sort((a, b) => a.number - b.number)
        .map((season) => {
            return {value: season, label: "Season " + season.number};
        });

    const renderEpisodes = () => {
        if(selectedSeason !== undefined && selectedSeason !== null){
            return selectedSeason.episodes.map((episode) => { return <EpisodeField onClick={() => {navigate("/browse/tv-shows/watch", {state: {tvShowId: tvShow?.id, episodeId: episode.id, watchedTime: localStorage.getItem(episode?.id || "")}})}} episode={episode} /> })
        }
    }

    const defaultOption = options && options.length > 0 ? options[0] : undefined;

    return (
        <div className="movie-info-modal-overlay">
            <div className="movie-info-modal">
                <div onClick={props.close} className="movie-info-modal-close-button">
                    <img width="18px" height="18px" src="/images/close.png" alt=""/>
                </div>

                <video
                    src={videoSource}
                    poster={tvShow?.imageUrl}
                    autoPlay={true}
                    controls={false}
                    muted={true}
                    onEnded={handleVideoEnd}
                    style={{
                        objectFit: "cover",
                        width: '930px',
                        height: '500px'
                    }}/>

                <div className="movie-info-modal-second-part">
                    <img width="300px" height="150px" className="movie-info-modal-logo"
                         src={tvShow?.logoUrl}
                         alt=""/>

                    <div className="movie-info-modal-actions">

                        <div onClick={handleMyListClick}
                             className="movie-info-modal-actions-button">
                            <img className="movie-info-modal-actions-button-icon" width="26px" height="26px"
                                 src={tvShow?.isExistInUserList ? "/images/tick.png" : "/images/plus.png"} alt=""/>
                        </div>

                        <div onClick={() => {
                            dispatch(likeTvShowAsyncThunk(tvShow?.id || ""))
                        }}
                             className={tvShow?.isLiked ? "movie-info-modal-actions-button-liked" : "movie-info-modal-actions-button"}>
                            <img className="movie-info-modal-actions-button-icon" width="21px" height="21px"
                                 style={{paddingBottom: "5px"}}
                                 src={tvShow?.isLiked ? "/images/like-green.png" : "/images/like.png"} alt=""/>
                        </div>

                        <div onClick={() => {
                            dispatch(dislikeTvShowAsyncThunk(tvShow?.id || ""))
                        }}
                             className={tvShow?.isDisliked ? "movie-info-modal-actions-button-disliked" : "movie-info-modal-actions-button"}>
                            <img className="movie-info-modal-actions-button-icon-dislike" width="21px" height="21px"
                                 style={{paddingBottom: "5px"}}
                                 src={tvShow?.isDisliked ? "/images/dislike-red.png" : "/images/dislike.png"} alt=""/>
                        </div>
                    </div>

                    <div className="movie-info-modal-main-info">
                        <div className="movie-info-modal-main-info-left">
                            <div className="movie-info-modal-main-info-left-number-info">
                                <div className="movie-info-modal-main-info-left-number-info-match"> {likePercentage}%
                                    Liked
                                </div>
                                <div className="movie-info-modal-main-info-left-number-info-numbers"> {year} </div>
                                <div
                                    className="movie-info-modal-main-info-left-number-info-m-rating"> {tvShow?.maturityRating || 0}+
                                </div>
                            </div>
                            <div className="movie-info-modal-main-info-left-description">
                                {tvShow?.description}
                            </div>
                        </div>

                        <div className="movie-info-modal-main-info-right">
                            <div className="movie-info-modal-main-right-section"><span
                                className="movie-info-modal-main-right-title"> Cast: </span> {renderMovieProperties(tvShow?.tvShowActors || [])}
                            </div>
                            <div className="movie-info-modal-main-right-section"><span
                                className="movie-info-modal-main-right-title"> Genres: </span> {renderMovieProperties(tvShow?.tvShowGenres || [])}
                            </div>
                            <div className="movie-info-modal-main-right-section"><span
                                className="movie-info-modal-main-right-title"> Creators: </span> {renderMovieProperties(tvShow?.tvShowCreators || [])}
                            </div>
                        </div>
                    </div>

                    <div className="tv-show-info-modal-episodes">
                        <div className="tv-show-info-modal-episodes-header">

                            <div className="tv-show-info-modal-episodes-header-title">
                                Episodes
                            </div>

                            <div className="tv-show-info-modal-episodes-header-seasons-select-container">
                                <Select
                                    styles={customStyles}
                                    options={options}
                                    onChange={(e: any) => {setSelectedSeason(e.value)}}
                                    defaultValue={defaultOption} // Assuming defaultOption is correctly defined as SingleValue<Option>
                                    isSearchable={false}
                                />
                            </div>
                        </div>

                        <div className="tv-show-info-modal-episodes-episodes">
                            {renderEpisodes()}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TvShowInfoModal;