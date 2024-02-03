export interface User{
    id: string;
    name: string;
    age: number;
    sex: Sex;
    email: string;
    profileImageUrl: string;
}

export enum Sex {
    Male = 1,
    Female,
    NotDefined
}