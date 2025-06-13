export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  imdb_id?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MoviesResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
