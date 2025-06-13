import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { tmdbApi } from "../services/tmdb";
import { appwriteApi } from "../services/appwrite";
import { DEFAULT_QUERY_OPTIONS } from "../lib/api-config";
import { QUERY_KEYS } from "../lib/constants";
import type { IMovie } from "../types/movie";

export const useMovies = (searchQuery: string) => {
  const queryClient = useQueryClient();
  const updateTrendingRef = useRef<Set<string>>(new Set());

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
    enabled: true,
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
    onError: (error) => {
      console.error("Failed to update trending:", error);
    },
  });

  const updateTrending = useCallback(
    (searchTerm: string, movie: IMovie) => {
      const searchKey = `${searchTerm.trim()}-${movie.id}`;

      if (
        searchTerm.trim() &&
        movie &&
        !updateTrendingRef.current.has(searchKey) &&
        !updateTrendingMutation.isPending
      ) {
        updateTrendingRef.current.add(searchKey);
        updateTrendingMutation.mutate({ searchTerm: searchTerm.trim(), movie });

        setTimeout(() => {
          updateTrendingRef.current.delete(searchKey);
        }, 60000); // 1 minute
      }
    },
    [updateTrendingMutation]
  );

  return {
    ...moviesQuery,
    updateTrending,
    isUpdatingTrending: updateTrendingMutation.isPending,
  };
};
