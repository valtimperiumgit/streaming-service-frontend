import {Creator} from "../creators/CreatorsModels";
import {Genre} from "../genres/GenresModels";
import {Actor} from "../actors/ActorsModels";

export interface Movie{
    id: string;
    title: string;
    videoUrl: string;
    trailerUrl: string;
    imageUrl: string;
    logoUrl: string;
    isLiked: boolean;
    isDisliked: boolean;
    maturityRating: number;
    description: string;
    duration: number;
    releaseDate: string;
    movieGenres: Genre[],
    movieActors: Actor[],
    movieCreators: Creator[],
    isExistInUserList: boolean
}