import React from "react";
import { API_CONFIG } from "../../lib/api-config";
import type { IMovie } from "../../types/movie";

interface MovieCardProps {
  movie: IMovie;
  onMovieClick: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie: {
    id,
    title,
    poster_path,
    vote_average,
    original_language,
    release_date,
    adult,
  },
  onMovieClick,
}) => {
  const posterUrl = poster_path
    ? `${API_CONFIG.TMDB.IMAGE_BASE_URL}${poster_path}`
    : "/no-poster.jpg";

  const handleClick = () => {
    onMovieClick(id);
  };

  return (
    <div
      className="group bg-gray-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/40 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={posterUrl}
        alt={title}
        className="w-full object-cover aspect-[2/3]"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{title}</h3>
        <div className="flex items-center gap-1 mt-1 text-sm text-gray-400">
          <svg
            className="h-4 w-4 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>

          <span>•</span>
          <p>{original_language}</p>

          <span>•</span>
          <p>{release_date ? release_date.split("-")[0] : "N/A"}</p>

          {adult && (
            <>
              <span>•</span>
              <p>18+</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
