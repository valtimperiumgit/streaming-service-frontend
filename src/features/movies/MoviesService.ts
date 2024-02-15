import authorizedAxiosInstance from "../../api/AuthorizedAxiosInstance";
import {API_URL} from "../../enviroment";
import {Pagination} from "../shared/Pagination";
import axios, {AxiosError} from "axios";
import {ErrorResponse} from "../shared/ErrorResponse";
import {PaginationResponse} from "../shared/PaginationResponse";
import {Movie} from "./MoviesModels";

export const getMovies = async () => {
    try {
        let response = await authorizedAxiosInstance.get<Movie[]>(`${API_URL}/api/movies`);
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                throw Error(axiosError.response.data.detail);
            }
        }
    }
}

export const getMovie = async (movieId: string) => {
    try {
        const params = {
            movieId: movieId
        }

        let response = await authorizedAxiosInstance.get<Movie>(`${API_URL}/api/movies/accurate`, {params});
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                throw Error(axiosError.response.data.detail);
            }
        }
    }
}

export const likeMovie = async (movieId: string) => {
    try {
        const params = {
            movieId: movieId
        }

        return await authorizedAxiosInstance.post<PaginationResponse<Movie>>(`${API_URL}/api/movies/like`, {},{params});
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                throw Error(axiosError.response.data.detail);
            }
        }
    }
}

export const dislikeMovie = async (movieId: string) => {
    try {
        const params = {
            movieId: movieId
        }

        return await authorizedAxiosInstance.post<PaginationResponse<Movie>>(`${API_URL}/api/movies/dislike`, {},{params});
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                throw Error(axiosError.response.data.detail);
            }
        }
    }
}

export const getLikePercentage = async (movieId: string) => {
    try {
        const params = {
            movieId: movieId
        };

        return await authorizedAxiosInstance.get<number>(`${API_URL}/api/movies/match`, {params});
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                console.log(axiosError)
            }
        }
    }
}