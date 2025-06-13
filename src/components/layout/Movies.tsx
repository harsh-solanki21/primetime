import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
} from "react";
import loader from "../../assets/loading.svg";
import MovieCard from "../ui/MovieCard";
import MovieModal from "../ui/MovieModal";
import { useDebounce } from "../../hooks/useDebounce";
import { useMovies } from "../../hooks/useMovies";
import { DEBOUNCE_DELAY } from "../../lib/constants";
import type { IMovie } from "../../types/movie";

interface MoviesProps {
  searchQuery: string;
}

const Movies: React.FC<MoviesProps> = ({ searchQuery }) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const prevSearchQueryRef = useRef<string>("");
  const trendingUpdatedRef = useRef<Set<string>>(new Set());

  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error,
    updateTrending,
  } = useMovies(debouncedSearchQuery);

  const firstMovie = useMemo(() => {
    return data?.pages?.[0]?.results?.[0] || null;
  }, [data?.pages]);

  useEffect(() => {
    const trimmedQuery = debouncedSearchQuery.trim();
    const searchKey = `${trimmedQuery}-${firstMovie?.id}`;

    if (
      trimmedQuery &&
      firstMovie &&
      prevSearchQueryRef.current !== trimmedQuery &&
      !trendingUpdatedRef.current.has(searchKey)
    ) {
      trendingUpdatedRef.current.add(searchKey);
      updateTrending(trimmedQuery, firstMovie);
      prevSearchQueryRef.current = trimmedQuery;

      setTimeout(() => {
        trendingUpdatedRef.current.delete(searchKey);
      }, 300000); // 5 minutes
    }
  }, [debouncedSearchQuery, firstMovie, updateTrending]);

  useEffect(() => {
    if (debouncedSearchQuery.trim() !== prevSearchQueryRef.current) {
      const currentQuery = debouncedSearchQuery.trim();
      if (currentQuery === "") {
        trendingUpdatedRef.current.clear();
        prevSearchQueryRef.current = "";
      }
    }
  }, [debouncedSearchQuery]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerRef.current;
    const option = { threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleObserver]);

  const handleMovieClick = useCallback((movieId: number) => {
    setSelectedMovieId(movieId);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedMovieId(null);
  }, []);

  const allMovies = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data?.pages]);

  const getSectionTitle = () => {
    if (debouncedSearchQuery.trim()) {
      return `Search Results for "${debouncedSearchQuery}"`;
    }
    return "Popular Movies";
  };

  if (isPending) {
    return (
      <section className="py-4" id="movies">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">
          {getSectionTitle()}
        </h2>
        <img src={loader} alt="Loading..." className="mx-auto" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-4" id="movies">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">
          {getSectionTitle()}
        </h2>
        <div className="text-red-500 text-center mt-4">
          Error fetching movies: {error.message}
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-4" id="movies">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">
          {getSectionTitle()}
        </h2>

        {allMovies.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-xl text-gray-400">
              {debouncedSearchQuery.trim()
                ? `No movies found for "${debouncedSearchQuery}"`
                : "No movies available"}
            </p>
            {debouncedSearchQuery.trim() && (
              <p className="text-gray-500 mt-2">
                Try searching with different keywords
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {allMovies.map((movie: IMovie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={handleMovieClick}
                />
              ))}
            </div>

            <div
              ref={observerRef}
              className="h-10 flex justify-center items-center mt-8"
            >
              {isFetchingNextPage && <img src={loader} alt="Loading more..." />}
            </div>

            {!hasNextPage && allMovies.length > 0 && (
              <p className="text-center text-gray-400 mt-8">
                {debouncedSearchQuery.trim()
                  ? "No more search results to load"
                  : "No more movies to load"}
              </p>
            )}
          </>
        )}
      </section>

      <MovieModal movieId={selectedMovieId} onClose={handleModalClose} />
    </>
  );
};

export default Movies;
