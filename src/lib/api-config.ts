export const API_CONFIG = {
  TMDB: {
    BASE_URL: "https://api.themoviedb.org/3",
    IMAGE_BASE_URL: "https://image.tmdb.org/t/p/w500",
    ACCESS_TOKEN: import.meta.env.VITE_TMDB_ACCESS_TOKEN,
  },
  APPWRITE: {
    ENDPOINT: import.meta.env.VITE_APPWRITE_ENDPOINT,
    PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    DATABASE_ID: import.meta.env.VITE_APPWRITE_DB_ID,
    COLLECTION_ID: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  },
} as const;

export const AUTH_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${API_CONFIG.TMDB.ACCESS_TOKEN}`,
};

export const DEFAULT_QUERY_OPTIONS = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  retry: 3,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
};
