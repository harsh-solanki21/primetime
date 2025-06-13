export interface ITrendingMovie {
  $id: string;
  movie_id: number;
  poster_url: string;
  search_term: string;
  count: number;
}

export interface CreateTrendingMovieData {
  search_term: string;
  count: number;
  movie_id: number;
  poster_url: string;
}

export interface UpdateTrendingMovieData {
  count: number;
}
