import {User} from "../UserModels";

export interface AuthResponse{
    user: User;
    token: string;
}

export interface QueryResponse<T>{
    value: T;
}