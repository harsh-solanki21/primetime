import { Client, Databases, ID, Query } from "appwrite";
import { API_CONFIG } from "../lib/api-config";
import type { IMovie } from "../types/movie";
import type {
  ITrendingMovie,
  CreateTrendingMovieData,
  UpdateTrendingMovieData,
} from "../types/appwrite";

const client = new Client()
  .setEndpoint(API_CONFIG.APPWRITE.ENDPOINT)
  .setProject(API_CONFIG.APPWRITE.PROJECT_ID);

const databases = new Databases(client);

export const appwriteApi = {
  updateTrendingMovies: async (
    searchTerm: string,
    movie: IMovie
  ): Promise<void> => {
    try {
      const result = await databases.listDocuments(
        API_CONFIG.APPWRITE.DATABASE_ID,
        API_CONFIG.APPWRITE.COLLECTION_ID,
        [Query.equal("search_term", searchTerm)]
      );

      if (result.documents.length > 0) {
        const doc = result.documents[0];
        const updateData: UpdateTrendingMovieData = {
          count: doc.count + 1,
        };

        await databases.updateDocument(
          API_CONFIG.APPWRITE.DATABASE_ID,
          API_CONFIG.APPWRITE.COLLECTION_ID,
          doc.$id,
          updateData
        );
      } else {
        const createData: CreateTrendingMovieData = {
          search_term: searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `${API_CONFIG.TMDB.IMAGE_BASE_URL}${movie.poster_path}`,
        };

        await databases.createDocument(
          API_CONFIG.APPWRITE.DATABASE_ID,
          API_CONFIG.APPWRITE.COLLECTION_ID,
          ID.unique(),
          createData
        );
      }
    } catch (error) {
      console.error("Error updating search count: ", error);
      throw error;
    }
  },

  getTrendingMovies: async (): Promise<ITrendingMovie[]> => {
    try {
      const result = await databases.listDocuments(
        API_CONFIG.APPWRITE.DATABASE_ID,
        API_CONFIG.APPWRITE.COLLECTION_ID,
        [Query.orderDesc("count"), Query.limit(10)]
      );
      return result.documents as unknown as ITrendingMovie[];
    } catch (error) {
      console.error("Error fetching trending movies: ", error);
      throw error;
    }
  },
};
