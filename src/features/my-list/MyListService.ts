import authorizedAxiosInstance from "../../api/AuthorizedAxiosInstance";
import {API_URL} from "../../enviroment";
import axios, {AxiosError} from "axios";
import {ErrorResponse} from "../shared/ErrorResponse";

export const addMovieToMyList = async (movieId: string) => {
    try {
        const params = {
            movieId: movieId
        }

        return await authorizedAxiosInstance.post(`${API_URL}/api/user/my-list/movies`, {},{params});
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

export const removeMovieFromMyList = async (movieId: string) => {
    try {
        const params = {
            movieId: movieId
        }

        return await authorizedAxiosInstance.delete(`${API_URL}/api/user/my-list/movies`, {params});
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