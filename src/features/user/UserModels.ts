export interface User{
    id: string;
    name: string;
    age: number;
    sex: Sex;
    email: string;
}

export enum Sex {
    Male = 1,
    Female,
    NotDefined
}