import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { tmdbApi } from "../services/tmdb";
import { appwriteApi } from "../services/appwrite";
import { DEFAULT_QUERY_OPTIONS } from "../lib/api-config";
import { QUERY_KEYS } from "../lib/constants";
import type { IMovie } from "../types/movie";

export const useMovies = (searchQuery: string) => {
  const queryClient = useQueryClient();

  const moviesQuery = useInfiniteQuery({
    queryKey: [QUERY_KEYS.MOVIES, searchQuery],
    queryFn: ({ pageParam }) =>
      tmdbApi.getMovies({ pageParam, query: searchQuery }),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    ...DEFAULT_QUERY_OPTIONS,
  });

  const updateTrendingMutation = useMutation({
    mutationFn: ({
      searchTerm,
      movie,
    }: {
      searchTerm: string;
      movie: IMovie;
    }) => appwriteApi.updateTrendingMovies(searchTerm, movie),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.APPWRITE_TRENDING],
      });
    },
  });

  const updateTrending = (searchTerm: string, movie: IMovie) => {
    if (searchTerm.trim() && movie) {
      updateTrendingMutation.mutate({ searchTerm, movie });
    }
  };

  return {
    ...moviesQuery,
    updateTrending,
    isUpdatingTrending: updateTrendingMutation.isPending,
  };
};
