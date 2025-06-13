import { API_CONFIG, AUTH_HEADERS } from "../lib/api-config";
import type { IMovie, MoviesResponse, MovieSearchParams } from "../types/movie";

const API_OPTIONS = {
  method: "GET",
  headers: AUTH_HEADERS,
};

export const tmdbApi = {
  getMovies: async ({
    pageParam = 1,
    query = "",
  }: MovieSearchParams): Promise<MoviesResponse> => {
    let url: string;

    if (query.trim()) {
      url = `${
        API_CONFIG.TMDB.BASE_URL
      }/search/movie?query=${encodeURIComponent(query)}&page=${pageParam}`;
    } else {
      url = `${API_CONFIG.TMDB.BASE_URL}/discover/movie?page=${pageParam}&sort_by=popularity.desc`;
    }

    const response = await fetch(url, API_OPTIONS);
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    return response.json();
  },

  getMovieById: async (movieId: number): Promise<IMovie> => {
    const url = `${API_CONFIG.TMDB.BASE_URL}/movie/${movieId}`;
    const response = await fetch(url, API_OPTIONS);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie: ${response.statusText}`);
    }
    return response.json();
  },
};
