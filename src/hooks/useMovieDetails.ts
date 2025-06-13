import { useQuery } from "@tanstack/react-query";
import { tmdbApi } from "../services/tmdb";
import { DEFAULT_QUERY_OPTIONS } from "../lib/api-config";
import { QUERY_KEYS } from "../lib/constants";

export const useMovieDetails = (movieId: number | null) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVIE_BY_ID, movieId],
    queryFn: () => tmdbApi.getMovieById(movieId!),
    enabled: !!movieId,
    ...DEFAULT_QUERY_OPTIONS,
  });
};
