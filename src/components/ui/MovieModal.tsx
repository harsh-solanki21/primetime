import React from "react";
import { API_CONFIG } from "../../lib/api-config";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import loader from "../../assets/loading.svg";
import type { Genre, ProductionCompany } from "../../types/movie";

interface MovieModalProps {
  movieId: number | null;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movieId, onClose }) => {
  const { data: movie, isLoading, error } = useMovieDetails(movieId);

  if (!movieId) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all cursor-pointer"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {isLoading && (
          <div className="flex justify-center items-center h-96">
            <img src={loader} alt="Loading..." />
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-96">
            <div className="text-red-500 text-center">
              <p className="text-xl mb-2">Error loading movie details</p>
              <p className="text-sm">{error.message}</p>
            </div>
          </div>
        )}

        {movie && (
          <div className="relative">
            {/* Backdrop Image */}
            {movie.backdrop_path && (
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              </div>
            )}

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Poster */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <img
                    src={
                      movie.poster_path
                        ? `${API_CONFIG.TMDB.IMAGE_BASE_URL}${movie.poster_path}`
                        : "/placeholder-movie.jpg"
                    }
                    alt={movie.title}
                    className="w-48 h-72 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Movie Details */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {movie.title}
                  </h1>
                  {movie.tagline && (
                    <p className="text-gray-400 italic mb-4">
                      "{movie.tagline}"
                    </p>
                  )}

                  {/* Rating and Info */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold">
                        {movie.vote_average.toFixed(1)}
                      </span>
                      <span className="text-gray-400">
                        ({movie.vote_count} votes)
                      </span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span>{movie.release_date?.split("-")[0]}</span>
                    {movie.runtime && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span>{formatRuntime(movie.runtime)}</span>
                      </>
                    )}
                    {movie.adult && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="bg-red-600 px-2 py-1 rounded text-xs">
                          18+
                        </span>
                      </>
                    )}
                  </div>

                  {/* Genres */}
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {movie.genres.map((genre: Genre) => (
                        <span
                          key={genre.id}
                          className="bg-purple-600 bg-opacity-20 text-purple-300 px-3 py-1 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Overview */}
                  {movie.overview && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Overview</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {movie.overview}
                      </p>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {movie.original_language && (
                      <div>
                        <span className="text-gray-400">
                          Original Language:{" "}
                        </span>
                        <span className="font-medium">
                          {movie.original_language.toUpperCase()}
                        </span>
                      </div>
                    )}
                    {movie.budget && movie.budget > 0 && (
                      <div>
                        <span className="text-gray-400">Budget: </span>
                        <span className="font-medium">
                          {formatCurrency(movie.budget)}
                        </span>
                      </div>
                    )}
                    {movie.revenue && movie.revenue > 0 && (
                      <div>
                        <span className="text-gray-400">Revenue: </span>
                        <span className="font-medium">
                          {formatCurrency(movie.revenue)}
                        </span>
                      </div>
                    )}
                    {movie.production_companies &&
                      movie.production_companies.length > 0 && (
                        <div>
                          <span className="text-gray-400">Production: </span>
                          <span className="font-medium">
                            {movie.production_companies
                              .map((company: ProductionCompany) => company.name)
                              .join(", ")}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
