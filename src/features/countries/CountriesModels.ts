export interface Country {
    id: string;
    name: string;
}

export const getCountriesQuery = `
{
  countries {
    id,
    name
  }
}`;