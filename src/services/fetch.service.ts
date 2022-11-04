import { Movie, SearchMoviesResult } from "../models/movie.model";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "5f3c2656cae61dc6112ed10d2ad87cfb";

export async function fetchMovies(search: string): Promise<SearchMoviesResult> {
  return fetch(
    `${baseUrl}/search/movie?api_key=${apiKey}&language=fr-FR&query=${search}&page=1&include_adult=false`
  ).then(async (res) => await res.json()) as Promise<SearchMoviesResult>;
}

export async function fetchMovie(id: string): Promise<Movie> {
  return fetch(`${baseUrl}/find/movie/${id}?api_key=${apiKey}&language=fr-FR`).then(
    async (res) => await res.json()
  ) as Promise<Movie>;
}
