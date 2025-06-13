import React, { useState } from "react";
import loader from "../../assets/loading.svg";
import MovieModal from "../ui/MovieModal";
import { useAppwriteTrending } from "../../hooks/useAppwriteTrending";
import type { ITrendingMovie } from "../../types/appwrite";

const Trending: React.FC = () => {
  const { data: trending = [], isLoading, error } = useAppwriteTrending();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId);
  };

  const handleModalClose = () => {
    setSelectedMovieId(null);
  };

  if (isLoading) {
    return (
      <section className="py-16" id="trending">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">Trending Now</h2>
        <div className="h-10 flex justify-center items-center mt-8">
          <img src={loader} alt="Loading trending movies..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16" id="trending">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">Trending Now</h2>
        <div className="text-red-500">Failed to load trending movies</div>
      </section>
    );
  }

  if (!trending.length) {
    return (
      <section className="py-16" id="trending">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">Trending Now</h2>
        <div className="text-gray-400">No trending movies available</div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16" id="trending">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">Trending Now</h2>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {trending.map((movie: ITrendingMovie, index: number) => (
              <div
                key={movie.$id}
                className="relative flex-shrink-0 w-64 h-96 group cursor-pointer"
                onClick={() => handleMovieClick(movie.movie_id)}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/40 hover:-translate-y-2 transition-all duration-300">
                  <img
                    src={movie.poster_url}
                    alt={movie.search_term}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute top-4 left-4">
                    <span
                      className="text-8xl font-black text-white drop-shadow-2xl"
                      style={{
                        WebkitTextStroke: "3px rgba(0,0,0,0.8)",
                        textShadow: "4px 4px 8px rgba(0,0,0,0.9)",
                      }}
                    >
                      {index + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 rounded-full px-3 py-1">
                    <span className="text-sm text-white">
                      {movie.count} search{movie.count !== 1 ? "es" : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MovieModal movieId={selectedMovieId} onClose={handleModalClose} />
    </>
  );
};

export default Trending;
