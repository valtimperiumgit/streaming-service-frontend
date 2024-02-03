import unauthorizedAxiosInstance from "../../../api/UnauthorizedAxiosInstance";
import {API_URL} from "../../../enviroment";
import {SignInRequest, SignUpRequest} from "./UserRequests";
import {AuthResponse, QueryResponse} from "./UserResponses";
import axios, {AxiosError} from "axios";
import authorizedAxiosInstance from "../../../api/AuthorizedAxiosInstance";
import {User} from "../UserModels";
import {ErrorResponse} from "../../shared/ErrorResponse";

export const registration = async (requestBody: SignUpRequest) => {
    try {
        return await unauthorizedAxiosInstance.post<AuthResponse>(`${API_URL}/authentication/registration`, requestBody);
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

export const login = async (requestBody: SignInRequest) => {

    try {
        return await unauthorizedAxiosInstance.post<AuthResponse>(`${API_URL}/authentication/login`, requestBody);
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

export const checkUserExistingByEmail = async (email: string) => {
    try {
        const params = {
            email: email
        };

        return await unauthorizedAxiosInstance.get<QueryResponse<boolean>>(`${API_URL}/api/user/existing`, {params});
    }
    catch (error) {
        console.error('Registration Error:', error);
    }
}

export const getUser = async () => {
    try {
        return await authorizedAxiosInstance.get<User>(`${API_URL}/api/user`);
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

export const getHomeContentForUser = async () => {
    try {
        return await authorizedAxiosInstance.get(`${API_URL}/api/user/home-content`);
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