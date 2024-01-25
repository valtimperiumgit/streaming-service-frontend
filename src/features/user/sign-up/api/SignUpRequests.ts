import {Sex} from "../../UserModels";

export interface RegistrationRequest {
    email: string;
    password: string;
    age: number;
    sex: Sex;
    countryId: number;
}