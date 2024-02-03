import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserAsyncThunk, userState} from "../../features/user/store/UserSlice";
import BrowseHeader from "../../components/browse/browse-header/BrowseHeader";
import {AppDispatch} from "../../store/Store";
import TopPagePlayer from "../../components/default/players/top-page-player/TopPagePlayer";
import './Browse.css'
import MovieInfoModal from "../../components/default/modals/movie-info-modal/MovieInfoModal";

const Browse = () => {
    const dispatch: AppDispatch = useDispatch();
    let user = useSelector(userState).user;

    const [isMovieInfoModalOpen, setIsMovieInfoModalOpen] = useState(false);

    const closeMovieInfoModal = () => {
        setIsMovieInfoModalOpen(false);
    }

    const openMovieInfoModal = () => {
        setIsMovieInfoModalOpen(true);
    }

    useEffect(() => {
        if(user === undefined){
            dispatch(getUserAsyncThunk());
        }
    },[])

    return (
        <div className="browse">
            <BrowseHeader/>
            <TopPagePlayer
                maturityRating={14}
                logoUrl="https://diplom-streaming.s3.eu-north-1.amazonaws.com/movies/d0775361-c930-4a75-82ac-3d60f35744f2/logo-6d632713-d4cd-4f56-b908-77604246546f"
                isInfoModalOpen={isMovieInfoModalOpen}
                videoUrl="https://diplom-streaming.s3.eu-north-1.amazonaws.com/movies/d0775361-c930-4a75-82ac-3d60f35744f2/trailer-ff2b059b-f09e-4a32-a05c-a765a53c9ab6"
                autoPlay={true}
                controls={false}
                info={openMovieInfoModal}
                posterUrl="https://diplom-streaming.s3.eu-north-1.amazonaws.com/movies/d0775361-c930-4a75-82ac-3d60f35744f2/image-770bac18-5182-4475-a08d-5910b170dcdb"
            />

            <div>
                ffffffffffff
                fffffffff
                fffffffff
                ffffff
                f
                ffff
                f
                f
                dadf
            </div>
            <div>
                ffffffffffff
                fffffffff
                fffffffff
                ffffff
                f
                ffff
                f
                f
                dadf
            </div>
            <div>
                ffffffffffff
                fffffffff
                fffffffff
                ffffff
                f
                ffff
                f
                f
                dadf
            </div>
            <div>
                ffffffffffff
                fffffffff
                fffffffff
                ffffff
                f
                ffff
                f
                f
                dadf
            </div>
            <div>
                ffffffffffff
                fffffffff
                fffffffff
                ffffff
                f
                ffff
                f
                f
                dadf
            </div>
            <div>
                ffffffffffff
                fffffffff
                fffffffff
                ffffff
                f
                ffff
                f
                f
                dadf
            </div>
            <div>
                ffffffffffff
                fffffffff
                fffffffff
                ffffff
                f
                ffff
                f
                f
                dadf
            </div>
            <div>
                ffffffffffff
                fffffffff
                fffffffff
                ffffff
                f
                ffff
                f
                f
                dadf
            </div>
        </div>
    );
};

export default Browse;