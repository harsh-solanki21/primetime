import { useQuery } from "@tanstack/react-query";
import { appwriteApi } from "../services/appwrite";
import { DEFAULT_QUERY_OPTIONS } from "../lib/api-config";
import { QUERY_KEYS } from "../lib/constants";

export const useAppwriteTrending = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.APPWRITE_TRENDING],
    queryFn: () => appwriteApi.getTrendingMovies(),
    ...DEFAULT_QUERY_OPTIONS,
  });
};
