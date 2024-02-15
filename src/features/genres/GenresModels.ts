export interface Genre{
    id: string;
    name: string;
}

export const getGenresQuery = `
{
  genres {
    id,
    name
  }
}`;