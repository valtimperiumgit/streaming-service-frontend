import {Sex} from "../UserModels";

export interface SignUpRequest {
    email: string;
    password: string;
    age: number;
    sex: Sex;
    countryId: number;
    name: string;
}

export interface SignInRequest {
    email: string;
    password: string;
}