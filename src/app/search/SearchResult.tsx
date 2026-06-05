"use client";
import { movieType } from "@/app/page";
import MovieCard from "@/components/ui/MovieCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const BEARER =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg";

const GENRES_LIST = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("movie");

  const [movies, setMovies] = useState<movieType[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setNotFound(false);

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
        {
          headers: { Authorization: BEARER },
        },
      )
      .then((response) => {
        const results = response.data.results;
        setMovies(results);
        setNotFound(results.length === 0);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query]);

  const handleGenreChange = (id: string, name: string) => {
    router.push(`/genre?id=${id}&name=${name}`);
  };

  if (!query) {
    return (
      <div className="text-center py-20 text-gray-500">
        Please enter a movie name to search...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-6 dark:text-white">
          Search results
        </h2>

        {loading ? (
          <div className="text-gray-500 py-10">Loading results...</div>
        ) : notFound ? (
          <div className="py-10">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Here is no results
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We couldn't find anything matching "{query}".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
      <div className="w-full md:w-[280px] shrink-0">
        <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100 uppercase tracking-wider">
          Search log genres
        </h3>

        <div className="flex flex-wrap gap-2">
          {GENRES_LIST.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreChange(String(genre.id), genre.name)}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 transition-all cursor-pointer"
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
